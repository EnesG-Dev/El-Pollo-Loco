class BossAttackArea extends DrawableObject {

    x = 10;
    y = 10;
    width = 50;
    height = 150;


    /*
        - add hitBox
    */
    constructor(owner, attackID) {
        super().loadImage(imgPaths.null[0])
        this.loadImageSprites(imgPaths.bossAttacks);
        this.owner = owner;
        this.world = owner.world;
        this.attackID = attackID;
        this.attackSets = [
            this.IMAGES_COMBO_ATK_SLASH1_RIGHT,
            this.IMAGES_COMBO_ATK_SLASH2_RIGHT,
            this.IMAGES_COMBO_ATK_SLASH3_RIGHT
        ];

        this.setPropertys();
        this.addToRenderOb();
        this.play();
    }

    setPropertys() {
        this.y = this.owner.y;
        if (this.attackID === 2) {
            this.width = 150
        }
        if (this.owner.otherDirection) {
            this.otherDirection = true;
            this.x = this.owner.x - this.width;
        } else {
            this.x = this.owner.x + this.owner.width;
        }
    }

    play() {
        this.playSpriteOnce(this.attackSets[this.attackID], 100, () => this.deleteThis());
    }

    addToRenderOb() {
        this.world.tempObjects.push(this);
    }

    deleteThis() {        
        this.world.tempObjects = this.world.tempObjects.filter(projectile => projectile !== this);
        clearInterval(this.animationInterval);
    }

    update() { }
}
