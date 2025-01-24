class Character extends MovableObject {
    height = 150;
    width = 150;
    offsetY = (this.height - 50) / 2;
    offsetX = (this.width + 50) / 2;
    speed = 5;
    walking_sound = new Audio('/audio/walk.mp3')

    constructor() {
        super().loadImage(imgPaths.character.idle[0]);
        this.loadImageSprites(imgPaths.character);

        // Charakter-HitBox
        this.hitBoxCharacter = new CharacterHitBox(50, 25, 50, 100, this);

        this.applyGravity();
        this.setMoveInterval();
        this.setAnimationInterval();
    }

    setMoveInterval() {
        // moveInterval
        this.moveInterval = setInterval(() => {
            if (!this.isDead()) {

                if (world.keyboard.C && this.status !== 'attack') {
                    this.status = 'attack';
                    this.attack1();
                }

                if (world.keyboard.RIGHT && this.x < world.level.level_end_x) {
                    this.moveRight();
                    this.walking_sound.play();
                }

                if (world.keyboard.LEFT && this.x > -100) {
                    this.moveLeft(true);
                    this.walking_sound.play();
                }

                if (world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                }

            }

            world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    setAnimationInterval() {
        setInterval(() => {

            // DEAD
            if (this.isDead() && !this.isAboveGround()) {
                if (this.status !== 'die') {
                    this.status = 'die';
                    this.playSpriteOnce(this.IMAGES_DEAD, 100, () => this.status = 'die');
                }

                // HURT
            } else if (this.isHurt()) {
                if (this.status !== 'hurt') {
                    this.status = 'hurt';
                    this.playSpriteOnce(this.IMAGES_HURT, 80);
                }

                // JUMP    
            } else if (this.isAboveGround() && this.status !== 'attack') {
                if (this.status !== 'jump') {
                    this.status = 'jump';
                    this.playSpriteOnce(this.IMAGES_JUMP, 70);

                    // this.playAnimation(this.IMAGES_JUMP);
                }

                // WALK
            } else if ((world.keyboard.RIGHT || world.keyboard.LEFT) && this.isAboveGround) {
                if (this.status !== 'walk') {
                    this.status = 'walk';
                    this.playSprite(this.IMAGES_WALK, 50);
                }

                // IDLE
            } else if (this.status === '' || this.status === 'walk') {
                this.status = 'idle';
                console.log('Status:', this.status);

                this.playSprite(this.IMAGES_IDLE, 250);
            }

        }, 1000 / 60);
    }

    attack1() {
        this.playSpriteOnce(this.IMAGES_ATTACK1, 60, () => this.spawnAttackArea(), 5);
    }

    clearAll() {
        clearInterval(this.mainInterval);
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        console.log('clear');
        console.log('Status:', this.status);
    }

    jump() {
        this.speedY = 15;
    }

    spawnAttackArea() {
        this.sword = new SwordHitBox(105, 25, 35, 90, this);
    }
}
