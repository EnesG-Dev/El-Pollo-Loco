class Phantom extends MovableObject {

    height = 220;
    width = 220;

    energy = 100;
    speed = 1;
    speed = 0.3;

    attackReady = true;
    moveToLeft = true;

    constructor(x, y) {
        super().loadImage(imgPaths.phantom.idle[0]);
        this.loadImageSprites(imgPaths.phantom);

        this.spawnPosition = x;
        this.x = x;
        this.y = y;

        this.energy = 10;

        // Charakter-HitBox
        this.hitBox = new HitBox(70, 80, 60, 80, this, -20, 'enemy');
        this.attackHitBox = new HitBox(130, 60, 50, 100, this, 90, 'attackArea');
    }

    update() {

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
                this.turnToCharecter();
                this.attack();
            }

            // IDLE
        } else {
            if (this.status == '') {
                this.status = 'idle';
                this.playSprite(this.IMAGES_IDLE, 150)
            }
            if (this.status == 'idle') {
                this.movePhantom();
            }
        }

    }

    turnToCharecter() {

        if (this.world.character.x < this.x) {
            this.moveToLeft = true;
            this.otherDirection = true;
            this.attackHitBox.updatePosition();
        } else {
            this.moveToLeft = false;
            this.otherDirection = false;
            this.attackHitBox.updatePosition();
        }
    }

    movePhantom() {
        if (this.moveToLeft) {
            this.moveLeft(true);
            if (this.x <= (this.spawnPosition - 250)) {
                this.moveToLeft = false;
            }
        } else if (!this.moveToLeft) {
            this.moveRight();
            if (this.x >= this.spawnPosition) {
                this.moveToLeft = true;
            }
        }
    }

    isCharacterNearby() {
        if (this.world && (this.world.character.y + 100) >= (this.y + 50) && (this.world.character.y + 100) <= (this.y + 200)) {
            if (this.otherDirection) {
                return this.world.character.x >= (this.x - 60) && this.world.character.x < (this.x + 140);
            } else return this.world.character.x >= (this.x - 80) && this.world.character.x < (this.x + 130);
        }
    }

    attack() {
        this.status = 'attack'; // repitation und vorzeitige beendigung verhindern
        this.attackReady = false; // Angriff deaktivieren

        this.playSpriteOnce(this.IMAGES_ATTACK, 150, () => {
            this.addAttackArea();
        }, 4);

        setTimeout(() => {
            this.attackReady = true;
        }, 1500);
    }

    addAttackArea() {
        this.attackHitBox.alignmentCorrection();
        this.attackHitBox.addToCollisionList();
        this.attackHitBox.removeFromCollisionList(300);
    }
}
