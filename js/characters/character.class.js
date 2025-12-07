class Character extends MovableObject {
    height = 150;
    width = 150;
    y = 200;
    speed = 4;
    mana = 1;
    mana = 5;   // löschen
    score = 0;
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

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
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

    walkSound() {
        if (!this.isAboveGround()) {
            AUDIO_MANAGER.playSound('character_walk');
        }
    }

    lightCast() {
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

    update() {
        // DEAD
        if (this.isDead() && !this.isAboveGround() && !this.isHurt()) {
            if (this.status !== 'die') {
                this.statusDead();
            }

            // HURT
        } else if (this.isHurt() || !this.readyToHurt) {        // readyToHurt pass !!!
            if (this.status !== 'hurt' && this.readyToHurt) {   // readyToHurt stopp !!!
                this.status = 'hurt';
                this.readyToHurt = false;
                // oder mit timeout machen auf readyToHurt true setzen
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
        this.score += points;
        console.log(this.score);
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
