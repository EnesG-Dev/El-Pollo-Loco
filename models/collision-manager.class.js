class CollisionManager {

    objects = [];

    /**
     * Fügt ein Objekt zur Kollisionsüberprüfung hinzu.
     * @param {GameObject} object - Das Objekt, das überprüft werden soll.
     */
    addObject(object) {
        this.objects.push(object);
    }

    /**
     * Entfernt ein Objekt aus der Kollisionsüberprüfung.
     * @param {GameObject} object - Das Objekt, das entfernt werden soll.
     */
    removeObject(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    /**
     * Führt Kollisionsprüfungen zwischen allen registrierten Objekten durch.
     */
    checkCollisions() {
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                const objA = this.objects[i];
                const objB = this.objects[j];
                
                if (this.isColliding(objA, objB)) {
                    objA.onCollision(objB);
                    objB.onCollision(objA);
                    // console.log('we have a collision whit ', objA, 'and', objB);
                }
            }
        }
    }

    isColliding(a, b) {
        return (
            a.x + a.width >= b.x &&
            a.x <= b.x + b.width &&
            a.y + a.height >= b.y &&
            a.y <= b.y + b.height
        );
    }
}


//####################################################################
//####################################################################


class OldCode {
    
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(10);
                this.healthBar.setPrecentage(this.character.energy);
            }
        });
        world.thowableObjects.forEach((projectile) => {
            if (this.character.isColliding(projectile) && !projectile.isCollided) {                
                projectile.playSpriteOnce();                // play animation
                this.character.hit(20);                     // character hit
                this.healthBar.setPrecentage(this.character.energy); // lifePoints
                projectile.deleteThis();
            }
        });
    }


    checkThowableObjects() {
        if (this.keyboard.B && this.radyToShot()) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100);
            this.thowableObjects.push(bottle);

            this.lastShot = new Date().getTime();
        }
    }

    radyToShot() {
        let timePassed = new Date().getTime() - this.lastShot;
        timePassed = timePassed / 1000; // time in sec
        return timePassed > 0.5;
    }




    // wenn eine hitbox erstellt wird: CollisionManager.addObject(this);
    
    // class Character {
    //     constructor {
    
    //         this.hitBoxCharacter = new HitBox(this.x + 30, this.y - 30, w = 50, h = 50);
    //         // shword wird nur beim angriff erstellt!
    //         this.hitBoxSword = new HitBoxSword(this.x + 30, this.y - 30, w = 50, h = 50);
    //     }
    // }
        
    // class HitBox {
    // constructor(x, y, w, h) {
    
    //     collisionManager.addObject(this);
    //     }
    // }

    isColliding(obj) {
        const thisAdjustedX = this.x + this.offsetX / 2 + this.positionOffsetX;
        const thisAdjustedY = this.y + this.offsetY / 2 + this.positionOffsetY;
        const thisAdjustedWidth = this.width - this.offsetX;
        const thisAdjustedHeight = this.height - this.offsetY;
        
        const objAdjustedX = obj.x + obj.offsetX / 2 + obj.positionOffsetX || 0;
        const objAdjustedY = obj.y + obj.offsetY / 2 + obj.positionOffsetY || 0;
        const objAdjustedWidth = obj.width - obj.offsetX;
        const objAdjustedHeight = obj.height - obj.offsetY;
        
        return (
            thisAdjustedX + thisAdjustedWidth >= objAdjustedX &&
            thisAdjustedX <= objAdjustedX + objAdjustedWidth &&
            thisAdjustedY + thisAdjustedHeight >= objAdjustedY &&
            thisAdjustedY <= objAdjustedY + objAdjustedHeight
        );
    }


    isColliding(obj) {
        return (
            this.x + this.offsetX + this.width >= obj.x + obj.offsetX &&
            this.x + this.offsetX <= obj.x + obj.offsetX + obj.width &&
            this.y + this.offsetY + this.height >= obj.y + obj.offsetY &&
            this.y + this.offsetY <= obj.y + obj.offsetY + obj.height
        );
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    // altisColliding(obj) {
    //     return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
    //             (this.y + this.offsetY + this.height) >= obj.y &&
    //             (this.y + this.offsetY) <= (obj.y + obj.height);
    //             // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    // alt2isColliding(obj) {
    //     return (
    //         this.x + this.offsetX + this.width >= obj.x + obj.offsetX &&
    //         this.x + this.offsetX <= obj.x + obj.offsetX + obj.width &&
    //         this.y + this.offsetY + this.height >= obj.y + obj.offsetY &&
    //         this.y + this.offsetY <= obj.y + obj.offsetY + obj.height
    //     );
    // }

    // TTisColliding(obj) {
    //     const thisAdjustedX = this.x + this.offsetX / 2;
    //     const thisAdjustedY = this.y + this.offsetY / 2;
    //     const thisAdjustedWidth = this.width - this.offsetX;
    //     const thisAdjustedHeight = this.height - this.offsetY;

    //     const objAdjustedX = obj.x + obj.offsetX / 2;
    //     const objAdjustedY = obj.y + obj.offsetY / 2;
    //     const objAdjustedWidth = obj.width - obj.offsetX;
    //     const objAdjustedHeight = obj.height - obj.offsetY;

    //     return (
    //         thisAdjustedX + thisAdjustedWidth >= objAdjustedX &&
    //         thisAdjustedX <= objAdjustedX + objAdjustedWidth &&
    //         thisAdjustedY + thisAdjustedHeight >= objAdjustedY &&
    //         thisAdjustedY <= objAdjustedY + objAdjustedHeight
    //     );
    // }


    TTdrawOffset(ctx) {
        if (this instanceof Character || this instanceof Witch || this instanceof Endboss) {   
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offsetX / 2,
                this.y + this.offsetY / 2,
                this.width - this.offsetX,
                this.height - this.offsetY
            );
            ctx.stroke();
        }
    }
}

//####################################################################

class TestWorld {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Character();
    level = LEVEL_1;
    healthBar = new StatusBar();
    thowableObjects = [];

    lastShot = 0;


    gameMap = new BackgroundObject("img/05_background/TileSet Wasteland/gameMap.png", -150, 2155, 480);
    gameMap2 = new BackgroundObject("img/05_background/TileSet Wasteland/gameMap2.png", 2005, 2155, 480)


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThowableObjects();
        }, 1000 / 60);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(10);
                this.healthBar.setPrecentage(this.character.energy);
            }
        });
        world.thowableObjects.forEach((projectile) => {
            if (this.character.isColliding(projectile) && !projectile.isCollided) {                
                projectile.playSpriteOnce();                // play animation
                this.character.hit(20);                     // character hit
                this.healthBar.setPrecentage(this.character.energy); // lifePoints
                projectile.deleteThis();
            }
        });
    }

    checkThowableObjects() {
        if (this.keyboard.B && this.radyToShot()) {
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100);
            this.thowableObjects.push(bottle);

            this.lastShot = new Date().getTime();
        }
    }

    radyToShot() {
        let timePassed = new Date().getTime() - this.lastShot;
        timePassed = timePassed / 1000; // time in sec
        return timePassed > 0.5;
    }
}
