class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    
    speedY = 0;
    // acceleration = 2.5;
    acceleration = 0.5;
    
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            const groundLevel = this.getGroundLevel(this.x); // Bodenhöhe an aktueller X-Position
    
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
    
    isAboveGround() {
        const groundLevel = this.getGroundLevel(this.x);
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < groundLevel;
    }
    
    getGroundLevel(x) {
        // Prüfe, ob die X-Position innerhalb des Bereichs der Rampe liegt
        const rampStartX = 105; // Start der Rampe
        const rampEndX = 260;   // Ende der Rampe
    
        if (x >= rampStartX && x <= rampEndX) {
            return this.getRampLevel(x); // Berechne die Höhe der Rampe
        }
    
        // Beispiel für andere Ebenen
        if (x > 4000) {
            return 300; // end

        } else if (x > 2845) {
            return 255; // Ebene 4 final

        } else if (x > 2750) {
            return 183; // Rampe 3 end

        // Rampe
        } else if (x > 2400) {
            return 300; // Graben 2 #####

        } else if (x > 1080) {
            return 245; // Ebene 3

        // Rampe
        } else if (x > 780) {
            return 230; // nach Graben 1
        } else if (x > 630) {
            return 280; // Graben 1
        } else if (x > 260) {
            return 170; // Ebene 1
        } else {
            return 225; // Ebene 0
        }
    }
    
    getRampLevel(x) {
        const startX = 105; // Start der Rampe
        const endX = 260;   // Ende der Rampe
        const startY = 225; // Höhe am Startpunkt
        const endY = 170;   // Höhe am Endpunkt
    
        // Prüfen, ob x innerhalb der Rampe liegt
        if (x >= startX && x <= endX) {
            // Berechne Steigung (m)
            const m = (endY - startY) / (endX - startX);
            // Berechne y-Wert für x
            return m * (x - startX) + startY;
        }
    
        // Rückgabe der Bodenhöhe außerhalb der Rampe
        return x < startX ? startY : endY;
    }

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


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(mirror = false) {
        this.x -= this.speed;
        this.otherDirection = mirror;
    }

    
    isColliding(obj) {
        const thisAdjustedX = this.x + this.offsetX / 2 + this.positionOffsetX;
        const thisAdjustedY = this.y + this.offsetY / 2 + this.positionOffsetY;
        const thisAdjustedWidth = this.width - this.offsetX;
        const thisAdjustedHeight = this.height - this.offsetY;
        
        const objAdjustedX = obj.x + obj.offsetX / 2 + obj.positionOffsetX || 0;
        const objAdjustedY = obj.y + obj.offsetY / 2 + obj.positionOffsetY || 0;
        const objAdjustedWidth = obj.width - obj.offsetX;
        const objAdjustedHeight = obj.height - obj.offsetY;
        
        return (
            thisAdjustedX + thisAdjustedWidth >= objAdjustedX &&
            thisAdjustedX <= objAdjustedX + objAdjustedWidth &&
            thisAdjustedY + thisAdjustedHeight >= objAdjustedY &&
            thisAdjustedY <= objAdjustedY + objAdjustedHeight
        );
    }
}

// Bessere Formel zur Kollisionsberechnung (Genauer)
// altisColliding(obj) {
//     return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
//             (this.y + this.offsetY + this.height) >= obj.y &&
//             (this.y + this.offsetY) <= (obj.y + obj.height);
//             // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
// }

// alt2isColliding(obj) {
//     return (
//         this.x + this.offsetX + this.width >= obj.x + obj.offsetX &&
//         this.x + this.offsetX <= obj.x + obj.offsetX + obj.width &&
//         this.y + this.offsetY + this.height >= obj.y + obj.offsetY &&
//         this.y + this.offsetY <= obj.y + obj.offsetY + obj.height
//     );
// }

// TTisColliding(obj) {
//     const thisAdjustedX = this.x + this.offsetX / 2;
//     const thisAdjustedY = this.y + this.offsetY / 2;
//     const thisAdjustedWidth = this.width - this.offsetX;
//     const thisAdjustedHeight = this.height - this.offsetY;

//     const objAdjustedX = obj.x + obj.offsetX / 2;
//     const objAdjustedY = obj.y + obj.offsetY / 2;
//     const objAdjustedWidth = obj.width - obj.offsetX;
//     const objAdjustedHeight = obj.height - obj.offsetY;

//     return (
//         thisAdjustedX + thisAdjustedWidth >= objAdjustedX &&
//         thisAdjustedX <= objAdjustedX + objAdjustedWidth &&
//         thisAdjustedY + thisAdjustedHeight >= objAdjustedY &&
//         thisAdjustedY <= objAdjustedY + objAdjustedHeight
//     );
// }