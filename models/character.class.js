class Character extends MovableObject {
    height = 150;
    width = 150;
    offsetY = (this.height - 50) / 2;
    offsetX = (this.width - 5) / 2;
    world;
    speed = 2;
    walking_sound = new Audio('/audio/walk.mp3');

    IMAGES_IDLE = [
        "img/00_JoannaD'ArcIII_v1/Sprites/Idle/Idle1.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Idle/Idle2.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Idle/Idle3.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Idle/Idle4.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Idle/Idle5.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Idle/Idle6.png",
    ];
    IMAGES_WALK = [
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking1.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking2.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking3.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking4.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking5.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking6.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking7.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking8.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking9.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking10.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking11.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking12.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking13.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking14.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking15.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking16.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking17.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Walk/Walking/Walking18.png",
    ];
    IMAGES_JUMP = [
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)1.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)2.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)3.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)4.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)5.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)6.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)7.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)8.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)9.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)10.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)11.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)12.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)13.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)14.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)15.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/JumpAndFall/Full/FX/JumpAndFall(FX)16.png",
    ];
    IMAGES_HURT = [
        "img/00_JoannaD'ArcIII_v1/Sprites/Hurt/FX/Hurt1.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Hurt/FX/Hurt2.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Hurt/FX/Hurt3.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Hurt/FX/Hurt4.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Hurt/FX/Hurt5.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Hurt/FX/Hurt6.png",
    ];
    IMAGES_DEAD = [
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death1.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death2.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death3.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death4.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death5.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death6.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death7.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death8.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death9.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death10.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death11.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death12.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death13.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death14.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death15.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death16.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death17.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death18.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death19.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death20.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death21.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death22.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death23.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death24.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death25.png",
        "img/00_JoannaD'ArcIII_v1/Sprites/Death/Death26.png"
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /**
     * 
     * @param {[string]} imgStack - Stack of image paths that are animated
     */
    animate() {

        // IDLE
        setInterval(() => {
            let i = this.curentImage % this.IMAGES_IDLE.length; // test
            let path = this.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            // this.curentImage == this.IMAGES_IDLE.length -1 ? this.curentImage = 0 : this.curentImage++;
            this.curentImage++; // test
        }, 500);

        // WALK
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
            }
            
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft(true);
                this.walking_sound.play();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 100 / 60);

// mehrmaliges auslösen fixen
        setInterval(() => {
            if (this.isDead()) {
                this.playSpriteOnce(this.IMAGES_DEAD, 200);
            } else if (this.isHurt()) {
                this.playSpriteOnce(this.IMAGES_HURT, 200);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk Animation
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 50);
    }

    jump() {
        this.speedY = 35;
    }

    playSpriteOnce(images, animationS, onComplete) {
        let index = 0;
        let path;

        clearInterval(this.animationInterval); // Vorherige Animation stoppen
        this.animationInterval = setInterval(() => {
            path = images[index];
            this.img = this.imageCache[path]; // Animation immer von vorne beginnen
            index++;
            if (index == images.length) {
                clearInterval(this.animationInterval); // Animation beenden
                onComplete && onComplete(); // Callback aufrufen
            }
        }, animationS);
    }
}