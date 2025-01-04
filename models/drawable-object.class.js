class DrawableObject {
    x = 120;
    y = 60;
    height = 150;
    width = 100;
    img;
    curentImage = 0;
    imageCache = {};

    offsetY = this.offsetY || 0;
    offsetX = this.offsetX || 0;
    // Zusätzliche Positionsoffsets für Verschiebung
    positionOffsetX = 0; // Beispiel: verschiebt den Bereich 30px nach rechts
    positionOffsetY = 0; // Beispiel: verschiebt den Bereich 20px nach unten

    /**
     * 
     * @param {string} path - is the localpath of img to load
     */
    loadImage(path) {
        this.img = new Image(); // this.image = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    /**
     * 
     * @description  saves arr.path's in imageCache{path:img}
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Witch || this instanceof Endboss || this instanceof Projectile) {   
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    
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
    drawOffset(ctx) {
        if (this instanceof Character || this instanceof Witch || this instanceof Endboss || this instanceof Projectile) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offsetX / 2 + this.positionOffsetX,
                this.y + this.offsetY / 2 + this.positionOffsetY,
                this.width - this.offsetX,
                this.height - this.offsetY
            );
            ctx.stroke();
        }
    }

}
