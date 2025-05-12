class Endboss extends MovableObject {
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
        // this.world.shadows = new BossShadow(this);
        this.applyGravity()
        this.checkStatus();
    }

    initShadow() {
        this.world.level.enemies.push(this.shadow);

    }

    checkStatus() {
        this.mainInterval = setInterval(() => {

            // DEAD
            if (this.isDead() && !this.isHurt()) {
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

        }, 1000 / 30);
    }

    statusDead() {      // doppel
        this.status = 'die';

        this.hitBox.removeFromCollisionList();
        this.playSpriteOnce(this.IMAGES_DEATH, 150, () => {
            this.status = 'die';
            // this.deleteThis();
        });
    }

    // TODO: spawn Coin
    deleteThis() {
        this.world.level.enemies = this.world.level.enemies.filter(enemy => enemy !== this);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }

}