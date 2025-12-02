class StatusBar {
    orangeSizes = [1, 50, 100, 150, 200, 260, 310, 370, 420, 470];

    // TODO: add mirro function for bossenemy
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 20;

        this.lastPosition = 10
        this.owner = owner;
        this.currentHealth = owner.energy;

        this.portrait = new Portrait(this, imgPaths.status_bar.portrait);
        this.healthBarBorder = new HealthBarBorder(this, imgPaths.status_bar.healthbar_border);
        this.healthBar = new HealthBar(this, imgPaths.status_bar.healthbar_blood);

        this.bloodFx = new AnimatedEffect(imgPaths.status_bar.fx, 78, 15, 80, 80, this);
        this.breakeShatterFx = new AnimatedEffect(imgPaths.status_bar.fx, 90, 15, 80, 80, this);

        this.orangeLife = new AnimatedEffect(imgPaths.status_bar.healthbar_orange, 89, 33, 520, 40, this);
        this.orangeLife.setImage(this.orangeLife.IMAGES_HALF[0]);

        this.manaBar = new ManaBar(imgPaths.status_bar.mana_bar, 80, 42, 250, 60, this);
    }

    update() {
        if (!this.owner.isDead()) {
            this.setHealthConfig();
            this.hitEffects();
        } else {

            this.setHealthConfig();

            this.bloodFx.x = this.x + 70;
            this.bloodFx.playSpriteOnce(this.bloodFx.IMAGES_BREAK_SPLASH, 150);
            this.breakeShatterFx.playSpriteOnce(this.bloodFx.IMAGES_BREAK_SHATTER, 150);

            this.hitEffects();
            this.healthBarBorder.brokeTheBar();
            this.portrait.update();
        }
    }

    render(ctx) {
        this.portrait.draw(ctx);
        this.healthBarBorder.render(ctx);
        this.manaBar.render(ctx);
        this.orangeLife.draw(ctx);
        this.healthBar.render(ctx);
        this.bloodFx.draw(ctx);
        this.breakeShatterFx.draw(ctx);
    }

    hitEffects() {
        this.healthBarBorder.hitEffects();
        this.healthBar.hitEffects();
        this.orangeLife.hitVibration();
        this.bloodFx.hitVibration();
        this.bloodFx.hitVibration();
    }

    setHealthConfig() {
        let targetHealth = this.owner.energy;
        let healthPosition = targetHealth / 10;
        if (healthPosition < 0) {
            healthPosition = 0;
        }

        this.bloodFx.x = this.x + 60 + (18.5 * this.lastPosition);

        this.bloodFx.playSpriteOnce(this.bloodFx.IMAGES_HIT_SPLASH, 100);

        this.lastPosition = healthPosition;

        this.orangeFunktion(this.orangeSizes[healthPosition])

        this.healthBar.setHealth(healthPosition);
        this.healthBar.positionHealthEdge(healthPosition);

    }

    orangeFunktion(target) {
        let orangeInterval = setInterval(() => {
            if (this.orangeLife.width >= target) {
                this.orangeLife.width -= 4;
            } else clearInterval(orangeInterval);
        }, 20);
    }

    clear() {
        this.healthBar.clearIntervals();
    }
}
