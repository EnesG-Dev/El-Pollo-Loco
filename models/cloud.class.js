class Cloud extends MovableObject {
    y = 40;
    height = 80;
    width = 200;
    speed = 0.5;

    constructor(layer, x, y = 40, speed = 0.5) {
        super().loadImageSprites(imgPaths.clouds);
        this.loadImage(this.IMAGES_LAYERS_1[layer]);

        this.layer = layer;
        this.x = x;
        this.y = y;
        this.speed = speed;

        this.setImgSize();
        this.animate();
    }

    sizes = [[272, 62], [103, 27], [65, 16], [99, 60], [104, 68], [82, 41]]
    setImgSize() {
        this.width = this.sizes[this.layer][0];
        this.height = this.sizes[this.layer][1];
    }
    
    animate() {
        this.moveInterval = setInterval(() => { 
            this.moveLeft();
            if (this.x < -400) {
                this.x = 4400;
            }
        }, 100);
    }
}