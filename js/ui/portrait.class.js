class Portrait extends DrawableObject {
    constructor(statusBar, path) {
        super().loadImage(path.normal[0]);
        this.loadImageSprites(path);
        this.statusBar = statusBar;
        this.x = statusBar.x;
        this.y = statusBar.y;
        this.width = 100;
        this.height = 120;
    }

    update() {
        this.brokeTheProfil();
        this.hitVibration();
    }

    brokeTheProfil() {
        this.playSpriteOnce(this.IMAGES_BROKEN, 200)
    }
}
