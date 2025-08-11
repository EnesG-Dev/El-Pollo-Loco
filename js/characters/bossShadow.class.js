class BossShadow extends MovableObject {
    height = 100;
    width = 100;
    widthDe = 100;
    objectGround = 75;
    speed = 0;

    constructor(owner) {
        super().loadImage(imgPaths.boss.shadow[0])
        this.loadImageSprites(imgPaths.boss);
        this.owner = owner;

        this.applyGravity();

        this.playSprite(this.IMAGES_SHADOW, 150);
    }

    update() {
        this.x = this.owner.x + 30;
    }
}
