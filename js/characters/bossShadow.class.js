class BossShadow extends MovableObject {
    height = 100;
    width = 100;
    objectGround = 75;
    speed = 5;

    constructor(owner) {
        super().loadImage(imgPaths.boss.shadow[0])
        this.loadImageSprites(imgPaths.boss);
        this.owner = owner;

        this.applyGravity();

        this.playSprite(this.IMAGES_SHADOW, 150);
        this.moveAction();
    }

    moveAction() {
        clearInterval(this.moveInterval);
        this.moveInterval = setInterval(() => {
            this.x = this.owner.x + 30;
        }, 1000 / 60);
    }
}
