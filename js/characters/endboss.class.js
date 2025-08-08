class Endboss extends MovableObject {
    // BUG: weil der Boss stirb stopt die animation zu früh > fehler in der gameScene
    height = 150;
    width = 150;
    widthDe = 150;
    x = 3600;
    y = 150;
    objectGround = 10;

    otherDirection = true;

    bossFightAreaX = 2900;
    wakeUpBossAreaX = 3200;

    speed = 0.5;

    constructor() {
        super().loadImage(imgPaths.boss.idle[0])
        this.loadImageSprites(imgPaths.boss);
        this.hitBox = new HitBox(50, 25, 50, 110, this, 0, 'enemy')
        this.shadow = new BossShadow(this);

        this.applyGravity();
    }

    init(world) {
        this.world = world;
        this.world.tempObjects.push(this.shadow);
        this.player = this.world.character;
        this.status = 'rest';
    }

    isPlayerNearby() {
        if (this.otherDirection) {
            return this.player.x >= (this.x - 60) && this.player.x < (this.x + 140);
        } else return this.player.x >= (this.x - 80) && this.player.x < (this.x + 130);
    }

    inFightArea() {
        return this.player.x > this.bossFightAreaX && this.x > this.bossFightAreaX;
    }

    isReady() {
        return this.status == 'idle' || this.status == 'moving';
    }

    checkAction() {
        if (this.status == 'resting' && this.world.character.x > this.wakeUpBossAreaX) {
            this.status = 'spin';
            // stop player movment
        } else if (this.isReady() && this.isPlayerNearby()) {
            this.status = 'attack_0';
        } else if (this.isReady() && this.inFightArea() && !this.isPlayerNearby()) {
            this.moveAnimation();
            if (this.player.x < this.x) {
                this.moveLeft(true);
            } else {
                this.moveRight();
            }
        } else if (this.status == 'moving') {
            this.status = '';
        }
    }

    moveAnimation() {
        console.log(this.status);
        
        if (this.status == 'idle' && this.status !== 'moving') {
            this.status = 'moving';
            console.log(this.status);
            
            this.playSprite(this.IMAGES_MOVING, 150)
        }
    }

    update() {
        this.shadow.update();
        this.checkAction();

        // one image
        if (this.status == 'test' || this.status == 'testing') {
            if (this.status !== 'testing') {
                this.status = 'testing';
                this.width = 200;
                this.playSpriteOnce(this.IMAGES_TEST, 200, () => {
                    this.status = 'testing';
                });
            }

            // ATTACK 0 - combo_atk
        } else if (this.status == 'attack_0' || this.status == 'attack') {
            if (this.status !== 'attack') {
                this.status = 'attack';

                // this.playSprite(this.IMAGES_COMBO_ATK_SLASH1, 100);
                this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH1, 120, () => {
                    console.log('1 is done');

                    this.status = 'attack';
                    this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH2, 120, () => {
                        console.log('2 is done');

                        this.status = 'attack';
                        // this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH3, 100, () => {
                        //     console.log('3 is done');


                        // }, -1, 300);
                        this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH3, 120, null, -1, 300);
                    }, -1, 200);
                }, -1, 200);
            }

            // ATTACK 3 - combo_atk_slash3
        } else if (this.status == 'attack_3' || this.status == 'attack') {
            if (this.status !== 'attack') {
                this.status = 'attack';

                // this.playSprite(this.IMAGES_COMBO_ATK_SLASH1, 100);
                this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH3, 100, () => {

                    console.log('3 is done');


                }, -1, 300);
            }

            // ATTACK 2 - combo_atk_slash2
        } else if (this.status == 'attack_2' || this.status == 'attack') {
            if (this.status !== 'attack') {
                this.status = 'attack';

                // this.playSprite(this.IMAGES_COMBO_ATK_SLASH1, 100);
                this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH2, 100, () => {

                    console.log('2 is done');


                }, -1, 200);
            }

            // ATTACK 1 - combo_atk_slash1
        } else if (this.status == 'attack_1' || this.status == 'attack') {
            if (this.status !== 'attack') {
                this.status = 'attack';

                // this.playSprite(this.IMAGES_COMBO_ATK_SLASH1, 100);
                this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH1, 100, () => {

                    console.log('1 is done');

                }, -1, 200);
            }

            // SLEEP
        } else if (this.status == 'rest' || this.status == 'resting') {
            if (this.status !== 'resting') {
                this.status = 'resting';
                this.playSpriteOnce(this.IMAGES_REST, 200, () => {
                    this.status = 'resting';
                    this.playSprite(this.IMAGES_SLEEPING, 200);
                });
            }

            // SPIN
        } else if (this.status == 'spin' || this.status == 'spining') {
            if (this.status !== 'spining') {
                this.status = 'spining';

                this.playSpriteOnce(this.IMAGES_STANDUP, 100, () => {
                    this.status = 'spining';
                    this.playSpriteOnce(this.IMAGES_SPIN, 100);
                });
            }

            // DEAD
        } else if (this.isDead() && !this.isHurt()) {
            if (this.status !== 'die') {
                this.statusDead();
            }

            // HURT
        } else if (this.isHurt()) {
            if (this.status !== 'hurt') {
                this.status = 'hurt';
                this.playSpriteOnce(this.IMAGES_HURT, 150);
            }

            // ATTACK


            // IDLE
        } else {
            if (this.status == '') {
                this.status = 'idle';
                this.playSprite(this.IMAGES_IDLE, 150)
            }
        }
    }
}