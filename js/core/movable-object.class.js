class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;

    speedY = 0;         // Sprung
    acceleration = 0.5; // Beschleunigung
    objectGround = 0;

    energy = 100;
    lastHit = 0;
    lastAttack = 0;
    lastJump = 0;

    hit(demage) {
        if (!this.isHurt() || this.lastHit == 0) {
            this.energy -= demage;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000; // time in sec
        return timePassed < 0.4;
    }

    /**
    * Checks if the energy level is zero.
    *
    * @returns {boolean} - Returns `true` if the energy is zero, otherwise `false`.
    */
    isDead() {
        return this.energy === 0;
    }

    applyGravity() {
        setInterval(() => {
            const groundLevel = this.getGroundLevel(this.x, this.y); // Bodenhöhe an aktueller X-Position

            // Aktualisiere die Position und Geschwindigkeit nur, wenn über dem Boden
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY; // Bewege das Objekt basierend auf der Geschwindigkeit
                this.speedY -= this.acceleration; // Verändere die Geschwindigkeit
            }

            // Prüfe, ob das Objekt unter den Boden gefallen ist
            if (this.y + this.objectGround > groundLevel) {
                this.y = groundLevel + this.objectGround; // Korrigiere die Position
                this.speedY = 0; // Setze die vertikale Geschwindigkeit auf 0
            }
            
        }, 1000 / 60);
    }

    isAboveGround(minHeight = 0) {
        const groundLevel = this.getGroundLevel(this.x, this.y);
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y + this.objectGround < groundLevel - minHeight;
    }

    getGroundLevel(x, y) {
        const config = world.level.configs.find(cfg => 
            x >= cfg.minX && x < cfg.maxX &&
            (cfg.minY === undefined || cfg.maxY === undefined || (y >= cfg.minY && y < cfg.maxY))
        );
        
        if (!config) {
            console.error('no lvl entries', x, y);
        }
        
        if (config.type === "ramp") {
            return this.getRampLevel(x, config.minX, config.maxX, config.startLevel, config.endLevel);
        } else {
            return config.groundLevel;
        }
    }
    
    getRampLevel(x, startX, endX, startY, endY) {
        // Berechne Steigung (m)
        const m = (endY - startY) / (endX - startX);
        // Berechne y-Wert für x
        return m * (x - startX) + startY;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(mirror = false) {
        this.x -= this.speed;
        this.otherDirection = mirror;
    }
}
