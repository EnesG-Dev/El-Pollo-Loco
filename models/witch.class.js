class Witch extends MovableObject {

    height = 220;
    width = 220;

    energy = 100;
    speed = 0.4;

    attackReady = true;

    constructor(x, y) {
        super().loadImage(imgPaths.witch.idle[0]);
        this.loadImageSprites(imgPaths.witch);

        this.x = x;
        this.y = y;

        // Charakter-HitBox
        this.hitBox = new WitchHitBox(100, 90, 50, 100, this);

        this.checkStatus();
    }

    checkStatus() {
        this.mainInterval = setInterval(() => {

            // DEAD
            if (this.isDead() && !this.isHurt()) {
                if (this.status !== 'die') {
                    this.statusDead();
                }

                // HURT
            } else if (this.isHurt()) {
                if (this.status !== 'hurt') {
                    this.status = 'hurt';
                    this.playSpriteOnce(this.IMAGES_HURT, 150);
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

    isCharacterNearby() {
        if (world) {
            return world.character.x >= (this.x - 450) && world.character.x < (this.x + 100);
        }
    }

    attack() {
        this.status = 'attack'; // repitation und vorzeitige beendigung verhindern
        this.attackReady = false; // Angriff deaktivieren

        this.playSpriteOnce(this.IMAGES_ATTACK, 150, () => {
            this.spawnProjectile();
        }, 2);

        setTimeout(() => {
            this.attackReady = true;
        }, 3000);
    }

    spawnProjectile() {
        world.thowableObjects.push(new Projectile(this.x + 70, this.y + 95));
    }

    statusDead() {      // doppel
        this.status = 'die';

        this.hitBox.removeFromCollisionList();
        this.playSpriteOnce(this.IMAGES_DEATH, 150, () => {
            this.status = 'die';
            this.deleteThis();
        });
    }

    // TODO: spawn Coin
    deleteThis() {
        world.level.enemies = world.level.enemies.filter(enemy => enemy !== this);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}
