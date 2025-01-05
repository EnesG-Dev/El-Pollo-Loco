class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Character();
    level = LEVEL_1;
    gameMap = new BackgroundObject("img/05_background/TileSet Wasteland/gameMap.png", -150, 2155, 480);
    gameMap2 = new BackgroundObject("img/05_background/TileSet Wasteland/gameMap2.png", 2005, 2155, 480)
    healthBar = new StatusBar();
    thowableObjects = [];
    lastShot = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
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

    setWorld() {
        this.character.world = this;
// nix gut!!! =>    Enemies.world
        this.level.enemies[0].world = this;
        this.level.enemies[1].world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Verschieben für die Kamera
        this.ctx.translate(this.camera_x, 0);
    
        
        // Hintergrund und Objekte hinzufügen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.gameMap);
        this.addToMap(this.gameMap2);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thowableObjects);
        this.addToMap(this.character);

        // Kamera zurücksetzen
        this.ctx.translate(-this.camera_x, 0);
    
        // UI-Elemente oder feste Objekte hinzufügen
        this.addToMap(this.healthBar);
    
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    
        // draw wird immer wieder aufgerufen!
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.mirrorOn(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawOffset(this.ctx);        

        if (mo.otherDirection) {
            this.mirrorOff(mo);
        }
    }

    mirrorOn(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    mirrorOff(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}