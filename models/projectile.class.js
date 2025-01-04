class Projectile extends MovableObject {

    height = 80;
    width = 80;
    offsetY = (this.height + 50) / 2;
    offsetX = (this.width - 20) / 2;

    world;
    speed = 5;
    moveInterval;
    animationInterval;

    IMAGES_BOTTLE = [
        "img/03_enemies/witch/PROJECTILE/frame_000.png",
        "img/03_enemies/witch/PROJECTILE/frame_001.png",
        "img/03_enemies/witch/PROJECTILE/frame_002.png",
        "img/03_enemies/witch/PROJECTILE/frame_003.png",
        "img/03_enemies/witch/PROJECTILE/frame_004.png",
        "img/03_enemies/witch/PROJECTILE/frame_005.png",
    ];
    IMAGES_HIT = [
        "img/03_enemies/witch/Hit/Hit1.png",
        "img/03_enemies/witch/Hit/Hit2.png",
        "img/03_enemies/witch/Hit/Hit3.png",
        "img/03_enemies/witch/Hit/Hit4.png",
    ];

    constructor(x = 100, y = 100) {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_HIT);
        this.x = x;
        this.y = y;

        this.action();
    }

    action() {
        this.playSprite(this.IMAGES_BOTTLE, 150);
        this.moveAction();
    }

    moveAction() {
        clearInterval(this.moveInterval);    // Vorheriges Intervall entfernen
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    playSprite(images, animationS) {
        clearInterval(this.animationInterval);    // Vorheriges Intervall entfernen
        this.animationInterval = setInterval(() => {
            this.playAnimation(images);
        }, animationS);
    }

    playSpriteOnce(onComplete, images = this.IMAGES_HIT, animationS = 100) {
        let index = 0;
        let path;

        clearInterval(this.moveInterval); // Vorherige Animation stoppen
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