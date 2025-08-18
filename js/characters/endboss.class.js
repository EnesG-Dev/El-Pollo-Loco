class Endboss extends MovableObject {
    height = 150;
    width = 150;
    widthDe = 150;
    x = 3600;
    y = 150;
    objectGround = 10;

    otherDirection = true;

    bossFightAreaX = 2900;
    wakeUpBossAreaX = 3200;

    speed = 0.5;

    constructor() {
        super().loadImage(imgPaths.boss.idle[0])
        this.loadImageSprites(imgPaths.boss);
        this.hitBox = new HitBox(50, 25, 50, 110, this, 0, 'enemy')
        this.hitBoxAttack1 = new HitBox(120, 10, 60, 90, this, 150, 'attackArea');
        this.hitBoxAttack2 = new HitBox(110, 40, 60, 90, this, 130, 'attackArea');
        this.hitBoxAttack3 = new HitBox(130, 50, 140, 90, this, 240, 'attackArea');
        this.shadow = new BossShadow(this);


        this.applyGravity();
    }

    init(world) {
        this.world = world;
        this.world.tempObjects.push(this.shadow);
        this.player = this.world.character;
        this.status = 'rest';
    }

    isPlayerNearby() {
        if (this.otherDirection) {
            return this.player.x >= (this.x - 60) && this.player.x < (this.x + 140);
        } else return this.player.x >= (this.x - 80) && this.player.x < (this.x + 130);
    }

    inFightArea() {
        return this.player.x > this.bossFightAreaX && this.x > this.bossFightAreaX;
    }

    isReady() {
        return this.status == 'idle' || this.status == 'moving';
    }

    checkAction() {
        if (this.status == 'resting' && this.world.character.x > this.wakeUpBossAreaX) {
            this.status = 'spin';
            // stop player movment
        } else if (this.isReady() && this.isPlayerNearby()) {
            this.status = 'attack';
        } else if (this.isReady() && this.inFightArea() && !this.isPlayerNearby()) {
            this.moveAnimation();
            if (this.player.x < this.x) {
                this.moveLeft(true);
            } else {
                this.moveRight();
            }
        } else if (this.status == 'moving') {
            this.status = '';
        }
    }

    moveAnimation() {
        if (this.status == 'idle' && this.status !== 'moving') {
            this.status = 'moving';

            this.playSprite(this.IMAGES_MOVING, 150)
        }
    }

    attack() {
        if (this.status !== 'attacking') {
            this.status = 'attacking';

            this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH1_LEFT, 100, () => this.nextAttack());
            new BossAttackArea(this, 0);
            this.addHitboxArea1();
        }
    }

    nextAttack() {
        if (this.world.character.isHurt()) {
            this.status = 'attacking'

            this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH2_LEFT, 100, () => this.finalAttack());
            new BossAttackArea(this, 1);
            this.addHitboxArea2();
        }
    }

    finalAttack() {
        if (this.world.character.isHurt()) {
            this.status = 'attacking'

            this.playSpriteOnce(this.IMAGES_COMBO_ATK_SLASH3_LEFT, 100);
            new BossAttackArea(this, 2);
            this.addHitboxArea3();
        }
    }

    addHitboxArea1() {
        setTimeout(() => {
            this.hitBoxAttack1.addToCollisionList();
            this.hitBoxAttack1.removeFromCollisionList(200);
        }, 500);
    }

    addHitboxArea2() {
        setTimeout(() => {
            this.hitBoxAttack2.addToCollisionList();
            this.hitBoxAttack2.removeFromCollisionList(200);
        }, 400);
    }
    
    addHitboxArea3() {
        setTimeout(() => {
            this.hitBoxAttack3.addToCollisionList();
            this.hitBoxAttack3.removeFromCollisionList(200);
        }, 600);
    }

    update() {
        this.shadow.update();
        this.checkAction();

        // ATTACK Combo
        if (this.status !== 'hurt' && this.status === 'attack') {
            this.attack();

            // SLEEP
        } else if (this.status == 'rest' || this.status == 'resting') {
            if (this.status !== 'resting') {
                this.status = 'resting';
                this.playSpriteOnce(this.IMAGES_REST, 200, () => {
                    this.status = 'resting';
                    this.playSprite(this.IMAGES_SLEEPING, 200);
                });
            }

            // SPIN
        } else if (this.status == 'spin' || this.status == 'spining') {
            if (this.status !== 'spining') {
                this.status = 'spining';

                this.playSpriteOnce(this.IMAGES_STANDUP, 100, () => {
                    this.status = 'spining';
                    this.playSpriteOnce(this.IMAGES_SPIN, 100);
                });
            }

            // DEAD
        } else if (this.isDead() && !this.isHurt()) {
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


            // IDLE
        } else {
            if (this.status == '') {
                this.status = 'idle';
                this.playSprite(this.IMAGES_IDLE, 150)
            }
        }
    }
}