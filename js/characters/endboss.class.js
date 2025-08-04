class Endboss extends MovableObject {
    // BUG: weil der Boss stirb stopt die animation zu früh > fehler in der gameScene
    height = 150;
    width = 150;
    widthDe = 150;
    x = 3500;
    y = 150;
    objectGround = 10;

    speed = 0.4;

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
    }

    update() {
        this.shadow.update();

        // one image
        if (this.status == 'test' || this.status == 'testing') {
            if (this.status !== 'testing') {
                this.status = 'testing';
                this.width = 200;
                this.playSpriteOnce(this.IMAGES_TEST, 200, () => {
                    this.status = 'testing';
                });
            }

            // ATTACK 1 - combo_atk_slash1
        } else if (this.status == 'attack_1' || this.status == 'attack') {
            if (this.status !== 'attack') {
                this.status = 'attack';
                
                // this.playSprite(this.IMAGES_COMBO_ATK_SLASH1, 100);
                this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH1, 100, () => {

                    console.log('done');
                    
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