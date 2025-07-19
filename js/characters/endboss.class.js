class Endboss extends MovableObject {
    // BUG: weil der Boss stirb stopt die animation zu früh > fehler in der gameScene
    height = 150;
    width = 150;
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

        // SLEEP
        if (this.status == 'rest' || this.status == 'resting') {
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