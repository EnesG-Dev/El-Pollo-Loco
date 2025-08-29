class Item extends DrawableObject {
    width = 50;
    height = 50;

    constructor(x, y) {
        super().loadImage(imgPaths.null[0]);
        this.loadImageSprites(imgPaths.items);
        this.x = x;
        this.y = y;
        this.hitBox = new HitBox(0, 0, 50, 50, this, 0, 'item')
        this.playSprite(this.IMAGES_COIN, 100);
    }

    takeItem() {
        this.hitBox.removeFromCollisionList();
        this.moveUp();
        this.playSpriteOnce(this.IMAGES_STAR, 100, () => {
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
            this.world.tempObjects = this.world.tempObjects.filter(ob => ob !== this);
        });
    }

    moveUp() {
        this.moveInterval = setInterval(() => {
            this.y -= 5;
        }, 20);
    }
}