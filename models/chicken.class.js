class Chicken extends MovableObject {
    height = 180; //240;
    width = 220; //280;
    y = 200;
    speed = 0.4;


    IMAGES_WALK = [
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L1.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L2.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L3.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L4.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L5.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L6.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L7.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L8.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L9.png",
        "img/03_Phantom_v1/Sprites/Idle/Idle_L/Idle_L10.png"
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALK);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * 
     * @param {[string]} imgStack - Stack of image paths that are animated
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK)
        }, 200);
    }
}