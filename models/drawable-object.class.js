class DrawableObject {
    x = 120;
    y = 60;
    height = 150;
    width = 100;
    img;
    imgSprites = [];
    imageCache = {};
    curentImage = 0;
    imageIndex = -1;

    status = '';
    mainInterval;
    moveInterval;
    animationInterval;    // currunt temporare intervalID for clearInterval

    offsetY = this.offsetY || 0;
    offsetX = this.offsetX || 0;
    // Zusätzliche Positionsoffsets für Verschiebung
    positionOffsetX = 0; // Beispiel: verschiebt den Bereich 30px nach rechts
    positionOffsetY = 0; // Beispiel: verschiebt den Bereich 20px nach unten


    playSpriteOnce(images, animationSpeed, onComplete, actionI = -1) {
        clearInterval(this.animationInterval);
        this.imageIndex = -1;

        this.animationInterval = setInterval(() => {
            this.playIndexAnimation(images);

            if (this.imageIndex == actionI) {
                onComplete && onComplete();
            }

        }, animationSpeed);
    }

    playIndexAnimation(images) {
        this.imageIndex++
        let path = images[this.imageIndex];
        this.img = this.imageCache[path];

        if (this.imageIndex == images.length - 1) {
            clearInterval(this.animationInterval);
            this.imageIndex = -1;
            this.status = '';
        }
    }

    playAnimation(images) {
        let i = this.curentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.curentImage++;
    }

    playSprite(images, animationS) {
        clearInterval(this.animationInterval);    // Vorheriges Intervall entfernen
        this.animationInterval = setInterval(() => {
            this.playAnimation(images);
        }, animationS);
    }


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

    /**
     * Dynamisch Bildpfade zuweisen und Sprites in den imageCache laden
     * @param {Object} objectPath - Objekt mit Bildpfaden (z. B. imgPaths.character)
     */
    loadImageSprites(objectPath) {
        // Dynamisch Eigenschaften wie IMAGES_IDLE, IMAGES_WALK etc. erstellen
        Object.entries(objectPath).forEach(([key, paths]) => {
            this[`IMAGES_${key.toUpperCase()}`] = paths; // Dynamische Zuweisung
            this.imgSprites.push(paths); // Zur Liste der Sprites hinzufügen
        });

        // Bilder aus allen Sprites vorladen
        this.imgSprites.forEach(sprite => this.loadImages(sprite));
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.error("Fehler beim Zeichnen des Objekts:", {
                img: this.img,
                imgSprites: this.imgSprites,
                imageCache: this.imageCache,
                curentImage: this.curentImage,
                imageIndex: this.imageIndex,
                status: this.status,
                error: error.message
            });
            debugger;
        }
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
