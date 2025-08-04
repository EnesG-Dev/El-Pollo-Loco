class Projectile extends MovableObject {

    height = 80;
    width = 80;
    widthDe = this.width;
    offsetY = (this.height + 50) / 2;
    offsetX = (this.width - 20) / 2;

    speed = 5;
    isCollided = false;

    constructor(world, x = 100, y = 100) {
        super().loadImage(imgPaths.bullet.bullet[0]);
        this.loadImageSprites(imgPaths.bullet);
        this.world = world;
        this.x = x;
        this.y = y;
        this.hitBox = new HitBox(12, 25, 50, 25, this, 0, 'projectile');

        this.playSprite(this.IMAGES_BULLET, 150);
        this.moveAction();
    }

    moveAction() {
        clearInterval(this.moveInterval);
        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.outOfMap();
        }, 1000 / 60);
    }

    outOfMap() {
        if (this.x < -300) {
            this.detonate();
        }
    }

    detonate() {
        clearInterval(this.moveInterval);
        this.hitBox.removeFromCollisionList();
        this.playSpriteOnce(this.IMAGES_HIT, 100, () => {
            this.deleteThis()
        })
    }

    deleteThis() {
        this.world.tempObjects = this.world.tempObjects.filter(projectile => projectile !== this);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}
