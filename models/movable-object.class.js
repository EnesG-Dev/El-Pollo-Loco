class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;

    speedY = 0;         // Sprung
    acceleration = 0.5; // Beschleunigung

    energy = 100;
    lastHit = 0;
    lastAttack = 0;


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
            if (this.y > groundLevel) {
                this.y = groundLevel; // Korrigiere die Position
                this.speedY = 0; // Setze die vertikale Geschwindigkeit auf 0
            }
        }, 1000 / 60);
    }

    isAboveGround(j = 0) {
        const groundLevel = this.getGroundLevel(this.x, this.y);
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < groundLevel - j;
    }

    getGroundLevel(x, y) {
        // Suche nach der passenden Konfiguration basierend auf x
        const config = world.level.configs.find(cfg => x >= cfg.minX && x < cfg.maxX);
        
        if (!config) {
            // Fallback, falls kein Eintrag gefunden wird
            console.log('kein eintrag', x, y);
            return 225;
        }
        
        if (config.type === "ramp") {
            // Für Rampen: lineare Interpolation zwischen startLevel und endLevel
            return this.getRampLevel(x, config.minX, config.maxX, config.startLevel, config.endLevel);
        } else {
            // Für statische Ebenen:
            return config.groundLevel;
        }
    }
    

    getGroundLevelTestStop(x, y) {

        // Beispiel für andere Ebenen
        if (x > 4000) {
            return 300; // end

        } else if (x > 2845) {
            return 255; // Ebene 4 final

        } else if (x > 2750) {
            return 183; // Rampe 3 end

            // Rampe
        }else if (x >= 2560 && x <= 2750) {
            return this.getRampLevel(x, 2560, 2750, 290, 183);

        } else if (x > 2400) {
            return 300; // Graben 2 #####

            // higtground - 4
        } else if (x > 1690 && x < 2040 && y >= -5 && y <= 5) {
            return 0;

            // higtground - 3
        } else if (x > 1760 && x < 1995 && y >= 115 && y <= 125) {
            return 120;

            // higtground - 2
        } else if (x > 1230 && x < 1420 && y >= 115 && y <= 125) {
            return 120;

        } else if (x > 1105) {
            return 245; // Ebene 3
        
        } else if (x > 1010) {
            return 120; // 

            // Rampe2
        }else if (x >= 780 && x <= 1010) {
            return this.getRampLevel(x, 800, 1010, 230, 120);

        } else if (x > 630) {
            return 280; // Graben 1

            // higtground
        } else if (x > 300 && x < 480 && y >= 50 && y <= 60) {
            return 55;

        } else if (x > 260) {
            return 170; // Ebene 1
            
            // Rampe
        }else if (x >= 105 && x <= 260) {
            return this.getRampLevel(x, 105, 260, 225, 170);

        } else {
            return 225; // Ebene 0
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

