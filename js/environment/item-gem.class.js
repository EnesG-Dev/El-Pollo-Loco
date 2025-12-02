class Gem extends DrawableObject {
    width = 25;
    height = 50;

    constructor(x, y, world) {
        super().loadImage(imgPaths.null[0]);
        this.loadImageSprites(imgPaths.items);
        this.x = x;
        this.y = y;
        this.world = world;
        this.hitBox = new HitBox(0, 0, 25, 50, this, 0, 'gem')
        this.playSprite(this.IMAGES_GEM, 100);
    }

    takeItem() {
        this.hitBox.removeFromCollisionList();
        this.moveUp();
        this.playSpriteOnce(this.IMAGES_STARS, 100, () => {
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
            this.world.tempObjects = this.world.tempObjects.filter(ob => ob !== this);
        }, -1, 100, 100);
    }

    moveUp() {
        this.moveInterval = setInterval(() => {
            this.y -= 10;
        }, 30);
    }

    update() {}
}
