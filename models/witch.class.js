class Witch extends MovableObject {

    x = 1250;
    y = 40;
    height = 220;
    width = 220;
    offsetY = (this.height - 5) / 2;
    offsetX = (this.width + 90) / 2;
    // Zusätzliche Positionsoffsets für Verschiebung
    positionOffsetX = 10; // Beispiel: verschiebt den Bereich 30px nach rechts
    positionOffsetY = 30; // Beispiel: verschiebt den Bereich 20px nach unten
    
    world;
    speed = 0.4;
    action = '';
    animationInterval;    // currunt temporare intervalID for clearInterval
    attackReady = true; // Kontrolliert, ob der Gegner angreifen darf

    IMAGES_IDLE = [
        "img/03_enemies/witch/IDLE/frame_000.png",
        "img/03_enemies/witch/IDLE/frame_001.png",
        "img/03_enemies/witch/IDLE/frame_002.png",
        "img/03_enemies/witch/IDLE/frame_003.png",
        "img/03_enemies/witch/IDLE/frame_004.png",
        "img/03_enemies/witch/IDLE/frame_005.png"
    ];
    IMAGES_ATTACK = [
        "img/03_enemies/witch/ATTACK/frame_000.png",
        "img/03_enemies/witch/ATTACK/frame_001.png",
        "img/03_enemies/witch/ATTACK/frame_002.png",
        "img/03_enemies/witch/ATTACK/frame_003.png",
        "img/03_enemies/witch/ATTACK/frame_004.png",
        "img/03_enemies/witch/ATTACK/frame_005.png"
    ];
    IMAGES_HURT = [
        "img/03_enemies/witch/HURT/frame_000.png",
        "img/03_enemies/witch/HURT/frame_001.png",
        "img/03_enemies/witch/HURT/frame_002.png"
    ];
    IMAGES_PROJECTILE = [
        "img/03_enemies/witch/PROJECTILE/frame_000.png",
        "img/03_enemies/witch/PROJECTILE/frame_001.png",
        "img/03_enemies/witch/PROJECTILE/frame_002.png",
        "img/03_enemies/witch/PROJECTILE/frame_003.png",
        "img/03_enemies/witch/PROJECTILE/frame_004.png",
        "img/03_enemies/witch/PROJECTILE/frame_005.png"
    ];
    IMAGES_DEATH = [
        "img/03_enemies/witch/DEATH/frame_000.png",
        "img/03_enemies/witch/DEATH/frame_001.png",
        "img/03_enemies/witch/DEATH/frame_002.png",
        "img/03_enemies/witch/DEATH/frame_003.png",
        "img/03_enemies/witch/DEATH/frame_004.png",
        "img/03_enemies/witch/DEATH/frame_005.png",
        "img/03_enemies/witch/DEATH/frame_006.png"
    ];

    constructor() {
        super().loadImage("img/03_enemies/witch/IDLE/frame_000.png")
        // super().loadImage("img/03_enemies/witch/ATTACK/frame_002.png")
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_PROJECTILE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);

        this.checkAction();
    }
    
    preview = false;    // actions comming soon!
    checkAction() {
        setInterval(() => {

            if (this.preview) {
                console.log('dead');

            } else if (this.preview) {
                console.log('hurt');

            // ATTACK
            } else if ((this.isCharacterNearby(1100) && this.attackReady) || this.action == 'attack') {
                if (this.action !== 'attack') {
                    this.attack();
                }

            // IDLE
            } else {
                if (this.action == '') {
                    this.action = 'idle';
                    this.playSprite(this.IMAGES_IDLE, 150)
                }
            }

        }, 1000 / 30);
    }

    isCharacterNearby(positionX) {
        return this.world.character.x >= positionX;
    }

    attack() {
        this.action = 'attack'; // repitation und vorzeitige beendigung verhindern
        this.attackReady = false; // Angriff deaktivieren

        this.playSpriteOnce(this.IMAGES_ATTACK, 150, () => {
            this.action = '';
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
            if (index == 2) {
                this.spawnProjectile();
            }
            index++;
            if (index == images.length) {
                clearInterval(this.animationInterval); // Animation beenden
                onComplete && onComplete(); // Callback aufrufen
            }
        }, animationS);
    }

    playSprite(images, animationS) {
        clearInterval(this.animationInterval);    // Vorheriges Intervall entfernen
        this.animationInterval = setInterval(() => {
            this.playAnimation(images);
        }, animationS);
    }

    spawnProjectile() {
        this.world.thowableObjects.push(new Projectile(this.x + 70, this.y + 95));
    }
}