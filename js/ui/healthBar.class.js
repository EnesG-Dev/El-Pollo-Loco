class HealthBar extends DrawableObject {
    constructor(statusBar, path, isBossEnemy = false) {
        super().loadImage(path.amount[10]);
        this.loadImageSprites(path);
        this.statusBar = statusBar;
        this.x = statusBar.x + 79;
        this.y = statusBar.y + 33;
        this.width = 250;
        this.height = 40;
        this.isBossEnemy = isBossEnemy;

        this.healthCounter = 10;
        this.death = false;

        this.healthEdge_1 = new AnimatedEffect(path, 130, 9, 20, 22, this);
        this.healthEdge_2 = new AnimatedEffect(path, 130, 9, 20, 22, this);

        this.healthEdge_1.playSprite(this.healthEdge_1.IMAGES_EDGE_1, 150);
        this.healthEdge_2.playSprite(this.healthEdge_1.IMAGES_EDGE_2, 150);
    }

    mirrorCerrectionBoss() {
        if (this.isBossEnemy) {
            this.x = 0;
        }
    }

    playTestOfBlood() {
        // FIXME: death variable einheitlich an einem Ort verwalten!!! UND GameOver einleiten...

        if (!this.death) {
            this.death = true;

            this.loadImage(imgPaths.null[0]);

            this.width = 50;
            this.height = 50;
            if (this.isBossEnemy) {
                this.x += 195;
            } else {
                this.x += 5;
            }
            this.y += 10;
            this.playSprite(this.IMAGES_DRIP, 150);
        }
    }

    render(ctx) {
        this.draw(ctx);

        if (this.healthCounter >= 1 && this.healthCounter <= 9) {
            this.healthEdge_1.draw(ctx);
            this.healthEdge_2.draw(ctx);
        } else if (this.healthCounter < 1) {
            setTimeout(() => {
                this.playTestOfBlood();
            }, 300);
        }
    }

    hitEffects() {
        this.hitVibration();
        this.healthEdge_1.hitVibration();
        this.healthEdge_2.hitVibration();
    }

    setHealth(healthPosition) {
        this.healthCounter = healthPosition;
        this.setImage(this.IMAGES_AMOUNT[healthPosition]);
    }

    positionHealthEdge(healthPosition) {
        if (this.isBossEnemy) {
            this.healthEdge_1.x = this.x + 223.5 - (healthPosition * 18.5)
            this.healthEdge_2.x = this.x + 223.5 - (healthPosition * 18.5)
        } else {   
            this.healthEdge_1.x = this.x + 7 + (healthPosition * 18.5)
            this.healthEdge_2.x = this.x + 7 + (healthPosition * 18.5)
        }
    }
}
