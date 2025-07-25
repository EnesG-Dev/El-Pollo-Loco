class Portrait extends DrawableObject {
    constructor(statusBar, path, mirro = 0) {
        super().loadImage(path.normal[0]);
        this.loadImageSprites(path);
        this.statusBar = statusBar;
        this.x = statusBar.x + mirro;
        this.y = statusBar.y;
        this.width = 100;
        this.height = 120;
        
        this.otherDirection = true;
    }

    update() {
        this.brokeTheProfil();
        this.hitVibration();
    }

    brokeTheProfil() {
        this.playSpriteOnce(this.IMAGES_BROKEN, 200)
    }
}
