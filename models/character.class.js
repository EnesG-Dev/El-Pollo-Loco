class Character extends MovableObject {
    height = 280;
    width = 100;
    y = 155
    world;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_IDLE);
        this.animate(this.IMAGES_IDLE);
    }

    /**
     * 
     * @param {[string]} imgStack - Stack of image paths that are animated
     */
    animate(imgStack) {
        setInterval(() => {

            if (this.world.keyboard.RIGHT) {
                   
                let i = this.curentImage % imgStack.length; // test
                let path = imgStack[i];
                this.img = this.imageCache[path];
                // this.curentImage == imgStack.length -1 ? this.curentImage = 0 : this.curentImage++;
                this.curentImage++; // test
            }
        }, 500);
    }


    jump() {

    }
}