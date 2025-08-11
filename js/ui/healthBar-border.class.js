class HealthBarBorder extends DrawableObject {
    constructor(statusBar, path) {
        super().loadImage(path.normal[0]);
        this.loadImageSprites(path);
        this.statusBar = statusBar;
        this.x = statusBar.x + 79;
        this.y = statusBar.y + 33;
        this.width = 250;
        this.widthDe = 250;

        this.height = 40;

        this.whiteBorder = new AnimatedEffect(path, 0, 0, 250, 40, this);
    }

    render(ctx) {
        this.draw(ctx);

        this.whiteBorder.draw(ctx);
    }

    brokeTheBar() {
        this.playSpriteOnce(this.IMAGES_BROKEN, 100)
    }

    hitEffects() {
        this.whiteBorder.playSpriteOnce(this.IMAGES_WHITE, 100);

        this.hitVibration();
        this.whiteBorder.hitVibration();
    }
}
