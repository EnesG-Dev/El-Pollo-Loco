class AreaOfEffect extends MovableObject {

    height = 80;
    width = 80;
    offsetY = (this.height - 0) / 2;
    offsetX = (this.width - 0) / 2;

    speed = 5;
    isCollided = false;

    constructor(x = 100, y = 100) {
        super().loadImage(imgPaths.bullet.bullet[0]);
        this.loadImageSprites(imgPaths.bullet);
        this.x = x;
        this.y = y;
        
        this.playSprite(this.IMAGES_BULLET, 150);
        this.moveAction();
    }

    moveAction() {
        clearInterval(this.moveInterval);    // Vorheriges Intervall entfernen
        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.outOfMap();
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

    outOfMap() {
        if (this.x < -200) {
            this.deleteThis()
        }
    }

    deleteThis() {
        let index = world.thowableObjects.indexOf(this);
        if (index > -1 && this.isCollided == false) {
            this.isCollided = true;
            setTimeout(() => {
                index = world.thowableObjects.indexOf(this);

                world.thowableObjects.splice(index, 1); // Entferne das Projektil aus der Liste
                clearInterval(this.moveInterval); // Bewegung stoppen
                clearInterval(this.animationInterval); // Animation stoppen
            }, 500);
        }
    }
}
