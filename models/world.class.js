class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    character = new Character();
    level = LEVEL_1;
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
                this.character.hit();
                this.healthBar.setPrecentage(this.character.energy);
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
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thowableObjects);
        // this.addToMap(new ThrowableObject);
        this.addToMap(this.character);
        
        this.ctx.translate(-this.camera_x, 0);
        // ----- space for fixed objects ----
        this.addToMap(this.healthBar);
        this.ctx.translate(this.camera_x, 0);



        this.ctx.translate(-this.camera_x, 0);
        
        // draw wird immer wierder aufgerufen!
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
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