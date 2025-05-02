class ThrowableObject extends MovableObject {

    world;
    x = 100;
    y = 100;
    width = 100;
    height = 100;
    speed = 5;
    speedx = 100;
    speedY = 30;


    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x = 100, y = 100) {
        super()
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.x = x;
        this.y = y;

        // this.animate();
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
        }, 25)
    }

    /**
     * 
     * @param {[string]} imgStack - Stack of image paths that are animated
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 200);

        setInterval(() => {
            this.moveRight();
        }, 1000 / 60);

    }
}