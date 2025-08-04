class LightCut extends MovableObject {

    height = 70;
    width = 100;
    widthDe = this.width;
    energy = 10;
    speed = 8;
    isCollided = false;

    constructor(world, owner) {
        super().loadImage(imgPaths.casts.holy_slash[0]);
        this.loadImageSprites(imgPaths.casts);
        this.world = world;
        this.owner = owner;
        this.x = owner.x + 70;
        this.y = owner.y + 45;

        this.otherDirection = owner.otherDirection;


        this.hitBox = new HitBox(40, 20, 50, 30, this, 30, 'cast');

        this.playSpriteOnce(this.IMAGES_HOLY_SLASH, 120, () => {
        this.hitBox.removeFromCollisionList();
        this.deleteThis();
        });
        this.moveAction();
    }

    moveAction() {
        clearInterval(this.moveInterval);
        this.moveInterval = setInterval(() => {
            if (this.otherDirection) {
                this.moveLeft(true);
            } else this.moveRight();
        }, 1000 / 60);
    }
    
    detonate() {
        this.hitBox.removeFromCollisionList();
        clearInterval(this.moveInterval);
        this.playSpriteOnce(this.IMAGES_LIGHT_HIT, 50, () => {
            this.deleteThis();
        })
    }
    
    deleteThis() {
        this.world.tempObjects = this.world.tempObjects.filter(o => o !== this);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }

    /*
    timeOut() {
        setTimeout(() => {
            if (!this.isDetonate) {
                this.detonate();
            }
        }, 500);
    }
    */
}
