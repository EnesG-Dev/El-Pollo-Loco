class Character extends MovableObject {
    height = 150;
    width = 150;
    speed = 4;
    walking_sound = new Audio('/audio/walk.mp3')

    constructor(world) {
        super().loadImage(imgPaths.character.idle[0]);
        this.loadImageSprites(imgPaths.character);

        this.world = world;
        this.hitBox = new HitBox(50, 25, 50, 100, this, 0, 'character');
        this.hitBoxSword = new HitBox(105, 25, 35, 90, this, 95, 'sword');

        this.applyGravity();
        this.setMoveInterval();
        this.setAnimationInterval();
        this.x = 0;
        // this.x = 3300;

        this.readyToHurt = true;
    }

    setMoveInterval() {
        // moveInterval
        this.moveInterval = setInterval(() => {
            if (!this.isDead()) {

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
                    if (this.x >= 630 && this.x <= 640 && this.y > 170) {}
                    else if (this.x >= 1100 && this.x <= 1110 && this.y > 120) {}
                    else if (this.x >= 2840 && this.x <= 2850 && this.y > 183) {}

                    else this.moveLeft(true);
                }

                if (this.world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                }

            }

            this.world.camera.update(this.x, this.world.bossEnemy.x);
        }, 1000 / 60);
    }

    setAnimationInterval() {
        setInterval(() => {

            // DEAD
            if (this.isDead() && !this.isAboveGround()) {
                if (this.status !== 'die') {
                    this.status = 'die';
                    this.playSpriteOnce(this.IMAGES_DEAD, 100, () => this.status = 'die');
                }

                // HURT
            } else if (this.isHurt() && this.readyToHurt) {
                if (this.status !== 'hurt') {
                    this.status = 'hurt';
                    this.readyToHurt = false;
                    this.playSpriteOnce(this.IMAGES_HURT, 80);

                    setTimeout(() => {
                        this.readyToHurt = true;
                    }, 1000);
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

    clearAll() {
        clearInterval(this.mainInterval);
        clearInterval(this.moveInterval);
        // clearInterval(this.animationInterval);
        console.log('clear');
        console.log('Status:', this.status);
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
}
