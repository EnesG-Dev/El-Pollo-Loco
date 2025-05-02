class Endboss extends MovableObject {
    height = 300;
    width = 250;
    offsetY = (this.height - 50) / 2;
    // offsetY = 47;
    offsetX = (this.width - 5) / 2;
    // offsetX = 80;
    x = 3500;
    y = 150;
    speed = 0.4;

    constructor() {
        super().loadImage(imgPaths.boss.alert[0])
        this.loadImageSprites(imgPaths.boss);

        this.animate();
    }

    // animate alert
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 500);
    }
}