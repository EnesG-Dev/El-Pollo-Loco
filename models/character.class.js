class Character extends MovableObject {
    height = 150;
    width = 150;
    offsetY = (this.height - 50) / 2;
    offsetX = (this.width - 5) / 2;
    speed = 2;
    walking_sound = new Audio('/audio/walk.mp3')

    constructor() {
        super().loadImage(imgPaths.character.idle[0]);
        this.loadImageSprites(imgPaths.character);

        this.applyGravity();
        this.animate();
    }



    /**
     * 
     * @param {[string]} imgStack - Stack of image paths that are animated
     */
    animate() {

        // IDLE
        setInterval(() => {
            let i = this.curentImage % this.IMAGES_IDLE.length; // test
            let path = this.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            // this.curentImage == this.IMAGES_IDLE.length -1 ? this.curentImage = 0 : this.curentImage++;
            this.curentImage++; // test
        }, 500);

        // WALK
        setInterval(() => {
            this.walking_sound.pause();
            if (world.keyboard.RIGHT && this.x < world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
            }
            
            if (world.keyboard.LEFT && this.x > -100) {
                this.moveLeft(true);
                this.walking_sound.play();
            }

            if (world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            world.camera_x = -this.x + 100;
        }, 100 / 60);

// mehrmaliges auslösen fixen
        setInterval(() => {
            if (this.isDead()) {
                this.playSpriteOnce(this.IMAGES_DEAD, 200);
            } else if (this.isHurt()) {
                this.playSpriteOnce(this.IMAGES_HURT, 200);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else if (world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Walk Animation
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 50);
    }

    jump() {
        this.speedY = 35;
    }

    playSpriteOnce(images, animationS, onComplete) {
        let index = 0;
        let path;

        clearInterval(this.animationInterval); // Vorherige Animation stoppen
        this.animationInterval = setInterval(() => {
            path = images[index];
            this.img = this.imageCache[path]; // Animation immer von vorne beginnen
            index++;
            if (index == images.length) {
                clearInterval(this.animationInterval); // Animation beenden
                onComplete && onComplete(); // Callback aufrufen
            }
        }, animationS);
    }
}
