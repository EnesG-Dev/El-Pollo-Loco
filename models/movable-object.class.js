class MovableObject {
    x = 120;
    y = 60;
    // y = 155
    height = 150;
    width = 100;
    img;
    curentImage = 0;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;

    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround())
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.y < 150;
    }

    /**
     * 
     * @param {string} path - is the localpath of img to load
     */
    loadImage(path) {
        this.img = new Image(); // this.image = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    /**
     * 
     * @description  saves arr.path's in imageCache{path:img}
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.curentImage % images.length; // test
        let path = images[i];
        this.img = this.imageCache[path];
        // this.curentImage == imgStack.length -1 ? this.curentImage = 0 : this.curentImage++;
        this.curentImage++; // test
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}