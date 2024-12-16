class World {
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    clouds = [
        new Cloud(),
    ];
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    testLoop = [-1, 0, 1, 2, 3]
    testtt = 0
    testt = 719 * this.testLoop[0]
    backgroundPaths1 = [
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/1.png',
        'img/5_background/layers/2_second_layer/1.png',
        'img/5_background/layers/1_first_layer/1.png',
    ];
    backgroundPaths2 = [
        'img/5_background/layers/air.png',
        'img/5_background/layers/3_third_layer/2.png',
        'img/5_background/layers/2_second_layer/2.png',
        'img/5_background/layers/1_first_layer/2.png'
    ];
    backgroundObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.backgroundLoop();
        this.draw();
        this.setWorld();
    }
    
    backgroundLoop() {
        for (let loopIndex = -1; loopIndex < 8; loopIndex++) {
            this.backgroundPaths1.forEach(path => {
                this.backgroundObjects.push(new BackgroundObject(path, 719*loopIndex));
            });
            loopIndex++;
            this.backgroundPaths2.forEach(path => {
                this.backgroundObjects.push(new BackgroundObject(path, 719*loopIndex));
            });
        }
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
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