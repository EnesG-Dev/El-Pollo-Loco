class Chicken extends MovableObject {
    height = 80;
    width = 100;
    y = 350;
    speed = 0.4;


    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate(this.IMAGES_WALK);
    }

    /**
     * 
     * @param {[string]} imgStack - Stack of image paths that are animated
     */
    animate(imgStack) {
        this.moveLeft();

        setInterval(() => {
            let i = this.curentImage % imgStack.length; // test
            let path = imgStack[i];
            this.img = this.imageCache[path];
            // this.curentImage == imgStack.length -1 ? this.curentImage = 0 : this.curentImage++;
            this.curentImage++; // test
        }, 200);
    }
}