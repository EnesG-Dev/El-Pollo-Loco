class Character extends MovableObject {
    height = 150;
    width = 150;
    speed = 4;
    mana = 3;
    walking_sound = new Audio('/assets/audio/character/walk.mp3')

    constructor(world) {
        super().loadImage(imgPaths.character.idle[0]);
        this.loadImageSprites(imgPaths.character);

        this.widthDe = this.width;
        this.world = world;
        this.hitBox = new HitBox(50, 25, 50, 100, this, 0, 'character');
        this.hitBoxSword = new HitBox(105, 25, 35, 90, this, 95, 'sword');

        this.applyGravity();

        this.setMoveInterval();
        this.setAnimationInterval();
        this.x = 0;
        this.x = 3100;

        this.readyToHurt = true;
    }

    setMoveInterval() {
        // moveInterval
        this.moveInterval = setInterval(() => {
            if (!this.isDead()) {

                // TODO: organize prioritys
                if (this.world.keyboard.B && this.status !== 'casting') {
                    this.status = 'lightCast';
                }

                if (this.world.keyboard.C && this.status !== 'attack') {
                    this.status = 'attack';
                    this.attack1();
                }

                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.walking_sound.play();
                }

                if (this.world.keyboard.LEFT && this.x > -100) {
                    this.walking_sound.play();

                    // wall blocks move left
                    if (this.x >= 630 && this.x <= 640 && this.y > 170) { }
                    else if (this.x >= 1100 && this.x <= 1110 && this.y > 120) { }
                    else if (this.x >= 2840 && this.x <= 2850 && this.y > 183) { }

                    else this.moveLeft(true);
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }
            }

            this.world.camera.update(this.x, this.world.bossEnemy.x);
        }, 1000 / 60);
    }

    lightCast() {
        this.status = 'casting';
        
        if (this.mana > 0) {
            
            this.playSpriteOnce(this.IMAGES_LIGHT_CUT, 65, () => {
                this.mana -= 1;
                this.world.statusBar.manaBar.setMana(this.mana);
                this.spawnProjectile();
            }, 22);
        } else {console.log('you havent enoght mana!');}
    }

    spawnProjectile() {
        this.world.tempObjects.push(new LightCut(this.world, this, this.IMAGES_HOLY_SLASH));
    }

    setAnimationInterval() {
        setInterval(() => {

            // TEST
            if (this.status == 'lightCast' || this.status == 'casting') {
                if (this.status !== 'casting') {

                    this.lightCast();

                    // this.playSpriteOnce(this.IMAGES_LIGHT_CUT, 65);

                    // this.playSpriteOnce(this.IMAGES_LIGHT_CUT, 100, () => {
                    //     this.status = 'casting';
                    //     this.playSpriteOnce(this.IMAGES_HOLY_SLASH, 100);
                    // });
                }

                // DEAD
            } else if (this.isDead() && !this.isAboveGround() && !this.isHurt()) {
                if (this.status !== 'die') {
                    this.statusDead();
                }

                // HURT
            } else if (this.isHurt() || !this.readyToHurt) {
                if (this.status !== 'hurt' && this.readyToHurt) {
                    this.status = 'hurt';
                    this.readyToHurt = false;

                    this.playSpriteOnce(this.IMAGES_HURT, 100, () => this.readyToHurt = true);
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
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.isAboveGround && (!this.isHurt() || this.status !== 'hurt')) {
                if (this.status !== 'walk') {
                    this.status = 'walk';
                    this.playSprite(this.IMAGES_WALK, 50);
                }

                // IDLE
            } else if (this.status === '' || this.status === 'walk') {
                this.status = 'idle';

                this.playSprite(this.IMAGES_IDLE, 250);
            }

        }, 1000 / 60);
    }

    attack1() {
        this.playSpriteOnce(this.IMAGES_ATTACK1, 60, () => this.addAttackArea(), 5);
    }

    // TODO: test continue
    playContinue() {
        this.setMoveInterval();
        this.setAnimationInterval();
    }

    /**
     * set speedY = 15
     */
    jump() {
        let timePassed = new Date().getTime() - this.lastJump;
        timePassed = timePassed / 1000;
        if (timePassed > 1) {
            this.speedY = 15;
            this.lastJump = new Date().getTime();
        }
    }

    addAttackArea() {
        this.hitBoxSword.addToCollisionList();
        this.hitBoxSword.removeFromCollisionList(300);
    }

    statusDead() {
        this.status = 'die';
        this.hitBox.removeFromCollisionList();
        this.playSpriteOnce(this.IMAGES_DEATH, 100, () => this.status = 'die');
    }
}
