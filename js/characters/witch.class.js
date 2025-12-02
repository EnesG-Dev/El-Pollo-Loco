class Witch extends MovableObject {
    height = 220;
    width = 220;
    energy = 40;
    speed = 0.4;
    attackReady = true;

    constructor(x, y) {
        super().loadImage(imgPaths.witch.idle[0]);
        this.loadImageSprites(imgPaths.witch);

        this.x = x;
        this.y = y;
        this.hitBox = new HitBox(100, 90, 50, 100, this, 0, 'enemy');
    }

    update() {
        if (this.isDead() && !this.isHurt()) {
            if (this.status !== 'die') {
                this.statusDead();
            }
        } else if (this.isHurt()) {
            if (this.status !== 'hurt') {
                this.status = 'hurt';
                this.playSpriteOnce(this.IMAGES_HURT, 150);
            }
        } else if ((this.isCharacterNearby() && this.attackReady) || this.status == 'attack') {
            if (this.status !== 'attack') {
                this.attack();
            }
        } else {
            if (this.status == '') {
                this.status = 'idle';
                this.playSprite(this.IMAGES_IDLE, 150)
            }
        }
    }

    isCharacterNearby() {
        if (!this.world.isGameOver()) {
            return this.world.character.x >= (this.x - 450) && this.world.character.x < (this.x + 100);
        } return false;
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
        this.world.tempObjects.push(new Projectile(this.world, this.x + 70, this.y + 95));
    }
}
