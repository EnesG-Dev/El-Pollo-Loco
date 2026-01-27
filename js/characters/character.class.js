/**
 * Represents the player character with movement, combat, and animation logic.
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 150;
    width = 150;
    x = 0;
    y = 200;
    speed = 4;
    mana = 1;
    readyToHurt = true;
    stopMoving = false;
    lastMovement = 0;

    constructor(world) {
        super().loadImage(imgPaths.character.idle[0]);
        this.world = world;
        this.widthDe = this.width;
        
        this.initCharacter();
    }
    
    /**
     * Initializes character sprites, hitboxes, and physics.
     * @private
     */
    initCharacter() {
        this.loadImageSprites(imgPaths.character);
        this.setupHitboxes();
        this.applyGravity();
        this.setMoveInterval();
    }

    /**
     * Defines the hitboxes for the character body and the sword.
     * @private
     */
    setupHitboxes() {
        this.hitBox = new HitBox(50, 25, 50, 100, this, 0, 'character');
        this.hitBoxSword = new HitBox(105, 25, 35, 90, this, 95, 'sword');
    }

    /**
     * Starts the movement and input update loop.
     * Executes at 60 FPS.
     */
    setMoveInterval() {
        this.moveInterval = setInterval(() => {
            if (this.world.isGameOver()) {
                this.handleGameOver();
                return;
            }

            this.handleAttacks();
            this.handleHorizontalMovement();
            this.handleJump();
            this.updateCamera();
        }, 1000 / 60);
    }

    /**
    * Stops character movement and clears the movement loop.
    */
    handleGameOver() {
        this.stopMoving = true;
        clearInterval(this.moveInterval);
    }

    /**
    * Handles attack and casting input.
    */
    handleAttacks() {
        if (!this.readyToHurt) return;

        if (this.world.keyboard.V && this.status !== 'casting') {
            this.status = 'lightCast';
        }

        if (this.world.keyboard.C && this.status !== 'attack') {
            this.status = 'attack';
            this.attack1();
        }
    }

    /**
     * Manages left and right movement based on keyboard input.
     */
    handleHorizontalMovement() {
        if (this.stopMoving) return;

        if (this.world.keyboard.RIGHT) {
            this.moveRightIfPossible();
        }

        if (this.world.keyboard.LEFT) {
            this.moveLeftIfPossible();
        }
    }

    /**
     * Moves the character right if the level boundary is not reached.
     */
    moveRightIfPossible() {
        if (this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walkSound();
        }
    }

    /**
     * Moves the character left if not blocked by boundaries or obstacles.
     */
    moveLeftIfPossible() {
        if (this.x <= -100) return;

        this.walkSound();

        if (this.isBlockedLeft()) return;

        this.moveLeft(true);
    }

    /**
     * Checks if specific level coordinates block movement to the left.
     * @returns {boolean} True if the path is blocked.
     */
    isBlockedLeft() {
        return (
            (this.x >= 630 && this.x <= 640 && this.y > 170) ||
            (this.x >= 1100 && this.x <= 1110 && this.y > 120) ||
            (this.x >= 2840 && this.x <= 2850 && this.y > 183)
        );
    }

    /**
     * Handles the jump logic when SPACE is pressed.
     */
    handleJump() {
        if (
            this.world.keyboard.SPACE &&
            (!this.isAboveGround() || this.isOnRamp())
        ) {
            this.jump();
            AUDIO_MANAGER.playEffectSound('character_jump');
        }
    }

    /**
     * Updates the camera position relative to the character and boss.
     */
    updateCamera() {
        this.world.camera.update(this.x, this.world.bossEnemy.x);
    }

    /**
     * Checks if the character is currently standing on a ramp.
     * @param {number} [tolerance=3] - Allowed vertical distance to the ground.
     * @returns {boolean}
     */
    isOnRamp(tolerance = 3) {
        const groundLevel = this.getGroundLevel(this.x, this.y);
        const config = this.world.level.configs.find(
            cfg => this.x >= cfg.minX && this.x <= cfg.maxX
        );
        if (!config || config.type !== 'ramp') return false;

        const feetY = this.y + this.objectGround;
        return Math.abs(feetY - groundLevel) <= tolerance;
    }

    /**
     * Plays the walking sound if the character is on the ground.
     */
    walkSound() {
        if (!this.isAboveGround()) {
            AUDIO_MANAGER.playSound('character_walk');
        }
    }

    /**
     * Starts the light casting process.
     * Determines whether mana is available and executes the appropriate behavior.
     */
    lightCast() {
        this.status = 'casting';
        AUDIO_MANAGER.playCastingSound();

        this.hasMana() ? this.castWithMana() : this.castWithoutMana();
    }

    /**
     * Checks whether the character has enough mana to cast.
     * @returns {boolean} True if mana is greater than 0
     */
    hasMana() {
        return this.mana > 0;
    }

    /**
     * Executes the light cast when mana is available.
     * Plays animation, consumes mana, spawns projectile and updates UI.
     */
    castWithMana() {
        this.playLightCastAnimation(() => {
            this.consumeMana(1);
            this.spawnProjectile();
        }, 22);
    }

    /**
     * Executes the light cast when no mana is available.
     * Triggers empty mana feedback without spawning a projectile.
     */
    castWithoutMana() {
        this.playLightCastAnimation(() => {
            this.world.statusBar.manaBar.emptyEffect();
            this.status = '';
        }, 10);
    }

    /**
     * Plays the light cast animation once and executes a callback afterwards.
     *
     * @param {Function} onComplete - Callback executed after animation finishes
     * @param {number} lastFrame - Frame index where the callback is triggered
     */
    playLightCastAnimation(onComplete, lastFrame) {
        this.playSpriteOnce(
            this.IMAGES_LIGHT_CUT,
            65,
            () => {
                AUDIO_MANAGER.stopCastingSound();
                onComplete();
            },
            lastFrame
        );
    }

    /**
     * Reduces mana by a given amount and updates the mana bar UI.
     *
     * @param {number} amount - Amount of mana to consume
     */
    consumeMana(amount) {
        this.mana -= amount;
        this.world.statusBar.manaBar.setMana(this.mana);
    }

    /**
     * Regens mana up to a maximum of 6.
     */
    updateMana() {
        if (this.mana < 6) {
            this.mana += 1;
        }
        this.world.statusBar.manaBar.setMana(this.mana);
    }

    /**
     * Spawns a LightCut projectile in the world.
     */
    spawnProjectile() {
        this.world.tempObjects.push(new LightCut(this.world, this, this.IMAGES_HOLY_SLASH));
        AUDIO_MANAGER.playManaAttackSound();
    }

    /**
     * Main animation update loop. Determines the current state and sprite.
     */
    update() {
        if (this.handleDeath()) return;
        if (this.handleHurt()) return;
        if (this.handleLightCast()) return;
        if (this.handleJumpAndFall()) return;
        if (this.handleLanding()) return;
        if (this.handleWalking()) return;
        if (this.handleResting()) return;

        this.handleIdle();
    }

    /**
     * Handles death state and animation.
     * @returns {boolean} True if death logic was executed
     */
    handleDeath() {
        if (this.isDead() && !this.isAboveGround() && !this.isHurt()) {
            if (this.status !== 'die') {
                this.statusDead();
            }
            return true;
        }
        return false;
    }

    /**
     * Handles hurt state and temporary invulnerability.
     * @returns {boolean} True if hurt logic was executed
     */
    handleHurt() {
        if (this.isHurt() || !this.readyToHurt) {
            if (this.status !== 'hurt' && this.readyToHurt) {
                this.enterHurtState();
            }
            return true;
        }
        return false;
    }

    /**
     * Enters the hurt state and plays the hurt animation.
     */
    enterHurtState() {
        this.status = 'hurt';
        this.readyToHurt = false;

        AUDIO_MANAGER.playEffectSound('character_hurt');

        this.playSpriteOnce(this.IMAGES_HURT, 100, () => {
            this.readyToHurt = true;
        });
    }

    /**
     * Handles light cast action and casting state.
     * @returns {boolean} True if casting logic was executed
     */
    handleLightCast() {
        if (this.status === 'lightCast' || this.status === 'casting') {
            if (this.status !== 'casting') {
                this.lightCast();
            }
            return true;
        }
        return false;
    }

    /**
     * Handles jumping and falling animations.
     * @returns {boolean} True if jump or fall logic was executed
     */
    handleJumpAndFall() {
        if (!this.isAboveGround(10) || this.status === 'attack') return false;

        if (this.speedY > 5 && this.status !== 'jumping') {
            this.enterJumpState();
            return true;
        }

        if (this.speedY < 5 && this.status !== 'fall') {
            this.enterFallState();
            return true;
        }

        return false;
    }

    /**
     * Enters the jumping state.
     */
    enterJumpState() {
        this.status = 'jumping';

        this.playSpriteOnce(this.IMAGES_JUMP, 80, () => {
            this.playSprite(this.IMAGES_JUMPING, 80);
        });
    }

    /**
     * Enters the falling state.
     */
    enterFallState() {
        this.status = 'fall';

        this.playSpriteOnce(this.IMAGES_FALL, 120, () => {
            this.playSprite(this.IMAGES_FALLING, 120);
        });
    }

    /**
     * Handles landing after a fall.
     * @returns {boolean} True if landing logic was executed
     */
    handleLanding() {
        if (!this.isAboveGround() && this.status === 'fall') {
            this.status = 'land';
            this.playSpriteOnce(this.IMAGES_LAND, 70);
            return true;
        }
        return false;
    }

    /**
     * Handles walking animation while moving on the ground.
     * @returns {boolean} True if walking logic was executed
     */
    handleWalking() {
        if (
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
            !this.isAboveGround() &&
            !this.isHurt() &&
            !this.stopMoving
        ) {
            if (this.status !== 'walk') {
                this.status = 'walk';
                this.playSprite(this.IMAGES_WALK, 50);
            }
            return true;
        }
        return false;
    }

    /**
     * Handles resting and sleeping states.
     * @returns {boolean} True if resting logic was executed
     */
    handleResting() {
        if (this.isTimeToRest() || this.status === 'resting') {
            if (this.status !== 'resting') {
                this.enterRestingState();
            }
            return true;
        }
        return false;
    }

    /**
     * Enters resting and sleeping animations.
     */
    enterRestingState() {
        this.status = 'resting';

        this.playSpriteOnce(this.IMAGES_REST, 200, () => {
            this.status = 'resting';
            this.playSprite(this.IMAGES_SLEEP, 200);
        });
    }

    /**
     * Handles idle state when no other action is active.
     */
    handleIdle() {
        if (this.status === '' || this.status === 'walk') {
            this.status = 'idle';
            this.setLastMovement();
            this.playSprite(this.IMAGES_IDLE, 250);
        }
    }

    /**
     * Updates the timestamp of the last movement.
     */
    setLastMovement() {
        this.lastMovement = Date.now();
    }

    /**
     * Checks if the character has been idle for more than 10 seconds.
     * @returns {boolean}
     */
    isTimeToRest() {
        let currentTime = Date.now();
        let timePassedInSeconds = (currentTime - this.lastMovement) / 1000;
        return this.status === 'idle' && timePassedInSeconds >= 10;
    }

    /**
     * Performs a sword attack.
     */
    attack1() {
        AUDIO_MANAGER.playEffectSound('character_swordSwing');
        this.playSpriteOnce(this.IMAGES_ATTACK1, 60, () => this.addAttackArea(), 5);
    }

    /**
     * Makes the character jump if the cooldown (1s) is over.
     */
    jump() {
        let timePassed = new Date().getTime() - this.lastJump;
        timePassed = timePassed / 1000;
        if (timePassed > 1) {
            this.speedY = 15;
            this.lastJump = new Date().getTime();
        }
    }

    /**
     * Updates the player score.
     * @param {number} points 
     */
    updateScore(points) {
        this.world.score += points;
    }

    /**
     * Briefly activates the sword hitbox for collision detection.
     */
    addAttackArea() {
        this.hitBoxSword.addToCollisionList();
        this.hitBoxSword.removeFromCollisionList(300);
    }

    /**
     * Handles the character's death sequence.
     */
    statusDead() {
        this.status = 'die';
        AUDIO_MANAGER.playSound('character_death');
        this.hitBox.removeFromCollisionList();
        this.playSpriteOnce(this.IMAGES_DEATH, 100, () => this.status = 'die');
    }
}
