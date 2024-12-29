class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;

    speedY = 0;
    acceleration = 2.5;

    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0){

                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;

            }
        }, 1000 / 50)
    }

    isAboveGround() {
        return this.y < 150;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; // time in sec
        return timePassed < 0.4;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.curentImage % images.length; // test
        let path = images[i];
        this.img = this.imageCache[path];
        // this.curentImage == imgStack.length -1 ? this.curentImage = 0 : this.curentImage++;
        this.curentImage++; // test
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(mirror = false) {
        this.x -= this.speed;
        this.otherDirection = mirror;
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    offsetY = this.offsetY || 0;
    isColliding(obj) {
        return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height);
                // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }
}
