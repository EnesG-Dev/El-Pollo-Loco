class World {

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.bossEnemy = this.level.enemies[this.level.enemies.length - 1];
        this.character = new Character(this);
        this.tempObjects = level.coins;

        this.statusBar = new StatusBar(0, -10, this.character);
        this.statusBarBoss = new StatusBarBoss(310, -10, this.bossEnemy);

        this.camera = new Camera();

        // this.tempObjects.push(new Gem(2300, 200));
        // this.tempObjects.push(new Gem(2350, 200));
        // this.tempObjects.push(new Gem(2400, 200));
        // this.tempObjects.push(new Gem(2450, 200));

        this.spike1 = new HitBox(700, 360, 150, 50);
        this.spike2 = new HitBox(2480, 410, 150, 50);
    }

    initObjects() {
        this.level.backgroundObjects.forEach(obj => obj.init(this));
        this.level.clouds.forEach(obj => obj.init(this));
        this.level.enemies.forEach(obj => obj.init(this));
        this.tempObjects.forEach(obj => obj.init(this));
        this.statusBarBoss.init(this);
    }

    clearObjects() {
        this.level.backgroundObjects.forEach(obj => obj.clearAll(this));
        this.level.clouds.forEach(obj => obj.clearAll(this));
        this.level.enemies.forEach(obj => obj.clearAll(this));
        this.tempObjects.forEach(obj => obj.clearAll(this));
    }

    update() {
        COLLISION_MANAGER.checkCollisions();
        this.level.enemies.forEach(obj => obj.update());
        if (!this.character.isDead()) {
            // console.log(this.character.energy);


        }
        this.updateGameObjects();

    }

    updateGameObjects() {
        COLLISION_MANAGER.objects.forEach(o => o.updatePosition())
    }

    render(ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Verschieben für die Kamera
        this.ctx.translate(this.camera.getX(), 0);

        // Hintergrund und Objekte hinzufügen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.map);

        // Kamera zurücksetzen
        this.ctx.translate(-this.camera.getX(), 0);
        // UI-Elemente oder feste Objekte hinzufügen

        // this.addToMap(this.healthBar);
        this.statusBar.render(ctx);
        this.statusBarBoss.render(ctx);

        // Verschieben für die Kamera
        this.ctx.translate(this.camera.getX(), 0);

        this.addObjectsToMap(this.tempObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.addObjectsToMap(COLLISION_MANAGER.objects);

        // Kamera zurücksetzen
        this.ctx.translate(-this.camera.getX(), 0);

        // UI-Elemente oder feste Objekte hinzufügen
        // this.addToMap(this.healthBar);

    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        // if (mo.otherDirection) {
        //     this.mirrorOn(mo);
        // }

        mo.draw(this.ctx);
        if (devMode) {
            mo.drawFrame(this.ctx);
        }

        // if (mo.otherDirection) {
        //     this.mirrorOff(mo);
        // }
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

    isGameOver() {
        return this.character.energy === 0 || this.bossEnemy.energy === 0;
    }
}
