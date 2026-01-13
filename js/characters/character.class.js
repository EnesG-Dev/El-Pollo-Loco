class Character extends MovableObject {
    height = 150;
    width = 150;
    y = 200;
    speed = 4;
    mana = 1;
    mana = 5;   // löschen
    stopMoving = false;
    lastMovement = 0;

    constructor(world) {
        super().loadImage(imgPaths.character.idle[0]);
        this.loadImageSprites(imgPaths.character);

        this.widthDe = this.width;
        this.world = world;
        this.hitBox = new HitBox(50, 25, 50, 100, this, 0, 'character');
        this.hitBoxSword = new HitBox(105, 25, 35, 90, this, 95, 'sword');

        this.applyGravity();

        this.setMoveInterval();
        this.x = 3100;
        this.x = 0;

        this.readyToHurt = true;
    }

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

    handleGameOver() {
        this.stopMoving = true;
        clearInterval(this.moveInterval);
    }

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

    handleHorizontalMovement() {
        if (this.stopMoving) return;

        if (this.world.keyboard.RIGHT) {
            this.moveRightIfPossible();
        }

        if (this.world.keyboard.LEFT) {
            this.moveLeftIfPossible();
        }
    }

    moveRightIfPossible() {
        if (this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walkSound();
        }
    }

    moveLeftIfPossible() {
        if (this.x <= -100) return;

        this.walkSound();

        if (this.isBlockedLeft()) return;

        this.moveLeft(true);
    }

    isBlockedLeft() {
        return (
            (this.x >= 630 && this.x <= 640 && this.y > 170) ||
            (this.x >= 1100 && this.x <= 1110 && this.y > 120) ||
            (this.x >= 2840 && this.x <= 2850 && this.y > 183)
        );
    }

    handleJump() {
        if (
            this.world.keyboard.SPACE &&
            (!this.isAboveGround() || this.isOnRamp())
        ) {
            this.jump();
            AUDIO_MANAGER.playEffectSound('character_jump');
        }
    }

    updateCamera() {
        this.world.camera.update(this.x, this.world.bossEnemy.x);
    }

    setMoveIntervaliiii() {
        this.moveInterval = setInterval(() => {
            if (!this.world.isGameOver()) {

                if (this.world.keyboard.V && this.status !== 'casting' && this.readyToHurt) {
                    this.status = 'lightCast';
                }

                if (this.world.keyboard.C && this.status !== 'attack' && this.readyToHurt) {
                    this.status = 'attack';
                    this.attack1();
                }

                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.stopMoving) {
                    this.moveRight();
                    this.walkSound();
                }

                if (this.world.keyboard.LEFT && this.x > -100 && !this.stopMoving) {
                    this.walkSound();

                    if (this.x >= 630 && this.x <= 640 && this.y > 170) { }
                    else if (this.x >= 1100 && this.x <= 1110 && this.y > 120) { }
                    else if (this.x >= 2840 && this.x <= 2850 && this.y > 183) { }

                    else this.moveLeft(true);
                }

                if (this.world.keyboard.SPACE && (!this.isAboveGround() || this.isOnRamp())) {
                    this.jump();
                    AUDIO_MANAGER.playEffectSound('character_jump');
                }
            } else {
                this.stopMoving = true;
                clearInterval(this.moveInterval);
            }

            this.world.camera.update(this.x, this.world.bossEnemy.x);
        }, 1000 / 60);
    }

    isOnRamp(tolerance = 3) {
        const groundLevel = this.getGroundLevel(this.x, this.y);
        const config = this.world.level.configs.find(
            cfg => this.x >= cfg.minX && this.x <= cfg.maxX
        );
        if (!config || config.type !== 'ramp') return false;

        const feetY = this.y + this.objectGround;
        return Math.abs(feetY - groundLevel) <= tolerance;
    }

    walkSound() {
        if (!this.isAboveGround()) {
            AUDIO_MANAGER.playSound('character_walk');
        }
    }

    lightCastiii() {
        this.status = 'casting';

        if (this.mana > 0) {
            AUDIO_MANAGER.playCastingSound();
            this.playSpriteOnce(this.IMAGES_LIGHT_CUT, 65, () => {
                this.mana -= 1;
                AUDIO_MANAGER.stopCastingSound();
                this.world.statusBar.manaBar.setMana(this.mana);
                this.spawnProjectile();
            }, 22);
        } else {
            AUDIO_MANAGER.playCastingSound();
            this.playSpriteOnce(this.IMAGES_LIGHT_CUT, 65, () => {
                AUDIO_MANAGER.stopCastingSound();
                this.world.statusBar.manaBar.emptyEffect();
                this.status = '';
            }, 10);
        }
    }

    /**
     * Starts the light cast action.
     * Handles mana check, animation, sound and projectile spawning.
     */
    lightCast() {
        this.status = 'casting';

        AUDIO_MANAGER.playCastingSound();

        if (this.hasMana()) {
            this.castWithMana();
        } else {
            this.castWithoutMana();
        }
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

    updateMana() {
        if (this.mana < 6) {
            this.mana += 1;
        }
        this.world.statusBar.manaBar.setMana(this.mana);
    }

    spawnProjectile() {
        this.world.tempObjects.push(new LightCut(this.world, this, this.IMAGES_HOLY_SLASH));
        AUDIO_MANAGER.playManaAttackSound();
    }

    updateiii() {
        // DEAD
        if (this.isDead() && !this.isAboveGround() && !this.isHurt()) {
            if (this.status !== 'die') {
                this.statusDead();
            }

            // HURT
        } else if (this.isHurt() || !this.readyToHurt) {
            if (this.status !== 'hurt' && this.readyToHurt) {
                this.status = 'hurt';
                this.readyToHurt = false;
                AUDIO_MANAGER.playEffectSound('character_hurt');
                this.playSpriteOnce(this.IMAGES_HURT, 100, () => this.readyToHurt = true);
            }

            // ATTACK lightCast
        } else if (this.status == 'lightCast' || this.status == 'casting') {
            if (this.status !== 'casting') {
                this.lightCast();
            }

            // JUMP    
        } else if (this.isAboveGround(10) && this.status !== 'attack') {

            if (this.speedY > 5 && this.status !== 'jumping') {
                this.status = 'jumping';

                this.playSpriteOnce(this.IMAGES_JUMP, 80, () => {
                    this.status = 'jumping';
                    this.playSprite(this.IMAGES_JUMPING, 80);
                });
            }

            if (this.speedY < 5 && this.status !== 'fall') {
                this.status = 'fall';

                this.playSpriteOnce(this.IMAGES_FALL, 120, () => {
                    this.status = 'fall';
                    this.playSprite(this.IMAGES_FALLING, 120);
                });
            }

        } else if (!this.isAboveGround() && this.status == 'fall') {
            this.status = 'land';
            this.playSpriteOnce(this.IMAGES_LAND, 70);

            // WALK
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.isAboveGround && (!this.isHurt() || this.status !== 'hurt') && !this.stopMoving) {
            if (this.status !== 'walk') {
                this.status = 'walk';
                this.playSprite(this.IMAGES_WALK, 50);
            }

            // REST
        } else if (this.isTimeToRest() || this.status === 'resting') {
            if (this.status !== 'resting') {
                this.status = 'resting';
                this.playSpriteOnce(this.IMAGES_REST, 200, () => {
                    this.status = 'resting';
                    this.playSprite(this.IMAGES_SLEEP, 200);
                });
            }

            // IDLE
        } else if (this.status === '' || this.status === 'walk') {
            this.status = 'idle';
            this.setLastMovement();
            this.playSprite(this.IMAGES_IDLE, 250);
        }
    }

    /**
     * Updates the character state every frame.
     * Handles death, damage, casting, jumping, movement and idle behavior.
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

    setLastMovement() {
        this.lastMovement = Date.now();
    }

    isTimeToRest() {
        let currentTime = Date.now();
        let timePassedInSeconds = (currentTime - this.lastMovement) / 1000;
        return this.status === 'idle' && timePassedInSeconds >= 10;
    }

    attack1() {
        AUDIO_MANAGER.playEffectSound('character_swordSwing');
        this.playSpriteOnce(this.IMAGES_ATTACK1, 60, () => this.addAttackArea(), 5);
    }

    playContinue() {
        this.setMoveInterval();
        this.setAnimationInterval();
    }

    jump() {
        let timePassed = new Date().getTime() - this.lastJump;
        timePassed = timePassed / 1000;
        if (timePassed > 1) {
            this.speedY = 15;
            this.lastJump = new Date().getTime();
        }
    }

    updateScore(points) {
        this.world.score += points;
    }

    addAttackArea() {
        this.hitBoxSword.addToCollisionList();
        this.hitBoxSword.removeFromCollisionList(300);
    }

    statusDead() {
        this.status = 'die';
        AUDIO_MANAGER.playSound('character_death');
        this.hitBox.removeFromCollisionList();
        this.playSpriteOnce(this.IMAGES_DEATH, 100, () => this.status = 'die');
    }
}
