class Witch extends MovableObject {

    height = 220;
    width = 220;
    offsetY = (this.height - 5) / 2;
    offsetX = (this.width + 90) / 2;
    // Zusätzliche Positionsoffsets für Verschiebung
    positionOffsetX = 10; // Beispiel: verschiebt den Bereich 30px nach rechts
    positionOffsetY = 30; // Beispiel: verschiebt den Bereich 20px nach unten
    
    energy = 100;
    speed = 0.4;
  
    attackReady = true; // Kontrolliert, ob der Gegner angreifen darf

    constructor(x, y) {
        super().loadImage(imgPaths.witch.idle[0]);
        this.loadImageSprites(imgPaths.witch);

        this.x = x;
        this.y = y;

        this.checkStatus();
    }
    
    checkStatus() {
        this.mainInterval = setInterval(() => {

            // DEAD
            if (this.isDead()) {
                if (this.status !== 'die') {
                    this.statusDead();
                }

            // HURT
            } else if (this.status == 'hurt' || this.status == 'hurting') {
                if (this.status == 'hurt') {
                    this.statusHurt();
                }

            // ATTACK
            } else if ((this.isCharacterNearby() && this.attackReady) || this.status == 'attack') {
                if (this.status !== 'attack') {
                    this.attack();
                }

            // IDLE
            } else {
                if (this.status == '') {
                    this.status = 'idle';
                    this.playSprite(this.IMAGES_IDLE, 150)
                }
            }

        }, 1000 / 30);
    }

    statusDead() {      // doppel
        this.status = 'die';
        this.playSpriteOnce(this.IMAGES_DEATH, 150);
    }

    statusHurt() {
        this.status = 'hurting'
        this.energy -=50;
        this.playSpriteOnce(this.IMAGES_HURT, 150, () => this.status = '');
    }

    isCharacterNearby() {
        if (world) {
            return world.character.x >= (this.x - 450) && this.world.character.x < (this.x + 100);
        }
    }

    attack() {
        this.status = 'attack'; // repitation und vorzeitige beendigung verhindern
        this.attackReady = false; // Angriff deaktivieren

        this.playSpriteOnce(this.IMAGES_ATTACK, 150, () => {
            this.status = '';
        });

        setTimeout(() => {
            this.attackReady = true;
        }, 3000);
    }

    playSpriteOnce(images, animationS, onComplete) {
        let index = 0;
        let path;

        clearInterval(this.animationInterval); // Vorherige Animation stoppen
        this.animationInterval = setInterval(() => {
            path = images[index];
            this.img = this.imageCache[path]; // Animation immer von vorne beginnen
            if (index == 2 && this.status == 'attack') {
                this.spawnProjectile();
            }
            index++;
            if (index == images.length) {
                clearInterval(this.animationInterval); // Animation beenden
                onComplete && onComplete(); // Callback aufrufen
            }
        }, animationS);
    }

    spawnProjectile() {
        world.thowableObjects.push(new Projectile(this.x + 70, this.y + 95));
    }
}