class DrawableObject {
    x = 120;
    y = 60;
    height = 150;
    width = 100;
    widthDe;
    heightDe;
    img;
    imgSprites = [];
    imageCache = {};
    curentImage = 0;
    imageIndex = -1;

    status = '';
    mainInterval;
    moveInterval;
    animationInterval;
    otherDirection = false;

    init(world) {
        this.world = world;
        this.widthDe = this.width;
    }

    hitVibration() {
        this.x -= 3;
        this.y += 3;

        setTimeout(() => {
            this.x += 3;
            this.y -= 3;
        }, 200);
    }

    playSpriteOnce(images, animationSpeed, onComplete, actionI = -1, width, height, xNow, xDiference) {
        clearInterval(this.animationInterval);
        this.imageIndex = -1;

        this.animationInterval = setInterval(() => {
            this.playIndexAnimation(images, width, height, xNow, xDiference);

            if (this.imageIndex == actionI) {
                onComplete && onComplete();
            }

        }, animationSpeed);
    }

    playIndexAnimation(images, width, height, xNow, xDiference) {
        if (width === undefined) {
            width = (this.widthDe !== undefined) ? this.widthDe : this.width;
        }
        if (height === undefined) {
            height = (this.heightDe !== undefined) ? this.heightDe : this.height;
        }
        if (this.otherDirection) {
            if (xNow !== undefined) {   
                console.log('before', this.x);
                
                let xCorection = xNow -= xDiference;
                this.x = xCorection;
                console.log('after', this.x);
            }
        }
        this.imageIndex++
        let path = images[this.imageIndex];
        this.img = this.imageCache[path];
        this.width = width;
        this.height = height;

        if (this.imageIndex == images.length - 1) {
            clearInterval(this.animationInterval);
            this.imageIndex = -1;
            this.status = '';
        }
    }

    playSprite(images, animationS, width, height) {
        // Falls kein width-Parameter angegeben wurde:
        if (width === undefined) {
            width = (this.widthDe !== undefined) ? this.widthDe : this.width;
        }
        if (height === undefined) {
            height = (this.heightDe !== undefined) ? this.heightDe : this.height;
        }

        clearInterval(this.animationInterval);
        this.animationInterval = setInterval(() => {
            this.width = width;
            this.height = height;
            this.playAnimation(images);
        }, animationS);
    }

    playAnimation(images) {
        let i = this.curentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.curentImage++;
    }

    setImage(src) {
        this.img = this.imageCache[src];
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
            if (this.otherDirection && this.world) {
                this.mirrorOn(ctx);
            }

            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

            if (this.otherDirection && this.world) {
                this.mirrorOff(ctx);
            }
        } catch (error) {
            console.error("Fehler beim Zeichnen des Objekts:", {
                img: this.img,
                imgSprites: this.imgSprites,
                imageCache: this.imageCache,
                curentImage: this.curentImage,
                imageIndex: this.imageIndex,
                status: this.status,
                objekt: this,
                error: error.message
            });
            // FIXME: remove debugger
            debugger;
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Witch || this instanceof Endboss || this instanceof Projectile || this instanceof Phantom || this instanceof Projectile || this instanceof BossShadow) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // #######################################################

    mirrorOn(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        // this.world.ctx.save();
        // this.world.ctx.translate(this.width, 0);
        // this.world.ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    mirrorOff(ctx) {
        this.x = this.x * -1;
        // this.world.ctx.restore();
        ctx.restore();
    }
}
