class BackgroundObject extends MovableObject {

    height = 220;
    width = 720;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y
    }


}