class World {

    camera_x = 0;
    thowableObjects = [];

    lastShot = 0;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;

        this.character = new Character();
        this.healthBar = new StatusBar();

        this.draw();
        this.run();
    }

    run() {
        setInterval(() => {
            COLLISION_MANAGER.checkCollisions(); // Kollisionsprüfung auslagern
            this.updateGameObjects();
        }, 1000 / 60);
    }

    updateGameObjects() {
        // Aktualisiere alle Spielobjekte (Bewegung, Zeichnen, etc.)
        COLLISION_MANAGER.objects.forEach(o => o.updatePosition())
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Verschieben für die Kamera
        this.ctx.translate(this.camera_x, 0);
    
        
        // Hintergrund und Objekte hinzufügen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.map);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thowableObjects);
        this.addToMap(this.character);

        this.addObjectsToMap(COLLISION_MANAGER.objects);

        // Kamera zurücksetzen
        this.ctx.translate(-this.camera_x, 0);
    
        // UI-Elemente oder feste Objekte hinzufügen
        this.addToMap(this.healthBar);
    
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
        // mo.drawOffset(this.ctx);        

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
