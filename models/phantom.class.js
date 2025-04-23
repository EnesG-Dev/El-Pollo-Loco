class Phantom extends MovableObject {

    height = 220;
    width = 220;

    energy = 100;
    speed = 1;

    attackReady = true;
    moveToLeft = true;

    constructor(x, y) {
        super().loadImage(imgPaths.phantom.idle[0]);
        this.loadImageSprites(imgPaths.phantom);

        this.spawnPosition = x;
        this.x = x;
        this.y = y;
        
        // Charakter-HitBox
        this.hitBox = new PhantomHitBox(70, 80, 60, 80, this);
        this.attackHitBox = new EnemyAttackArea(105, 25, 35, 90, this);


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
                if (this.status == 'idle') {
                    this.movePhantom();
                }
            }

        }, 1000 / 30);
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
        if (world) {
            return world.character.x >= (this.x - 100) && world.character.x < (this.x + 100);
        }
    }

    attack() {
        this.status = 'attack'; // repitation und vorzeitige beendigung verhindern
        this.attackReady = false; // Angriff deaktivieren

        this.playSpriteOnce(this.IMAGES_ATTACK, 150, () => {
            //this.spawnProjectile();
            this.addAttackArea();
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

    addAttackArea() {
        this.attackHitBox.addToCollisionList();
        this.attackHitBox.removeFromCollisionList(300);
    }

    // TODO: spawn Coin
    deleteThis() {
        world.level.enemies = world.level.enemies.filter(enemy => enemy !== this);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}
