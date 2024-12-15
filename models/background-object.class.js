class BackgroundObject extends MovableObject {
    x = 0;
    width = 720;
    height = 480;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
    }


}