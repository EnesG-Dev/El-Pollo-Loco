class StatusBarBoss {
    // TODO: add mirro function for bossenemy
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 20;

        this.lastPosition = 10
        this.owner = owner;
        this.currentHealth = owner.energy;

        this.isGameOver = false;

        this.statusBarElements = [
            this.portrait = new Portrait(this, imgPaths.status_bar.boss, 307),
            this.healthBarBorder = new HealthBarBorder(this, imgPaths.status_bar.healthbar_border),
            this.healthBar = new HealthBar(this, imgPaths.status_bar.healthbar_blood, true),

            this.bloodFx = new AnimatedEffect(imgPaths.status_bar.fx, 78, 15, 80, 80, this),
            this.breakeShatterFx = new AnimatedEffect(imgPaths.status_bar.fx, 240, 15, 80, 80, this),

            // this.manaBar = new ManaBar(imgPaths.status_bar.mana_bar, 80, 42, 250, 60, this, 182)
        ];
    }

    init(world) {
        this.statusBarElements.forEach(obj => {
            obj.world = world;
            obj.otherDirection = true;
        })
        this.healthBarBorder.whiteBorder.world = world;
        this.healthBarBorder.whiteBorder.otherDirection = true;
        this.healthBar.healthEdge_1.world = world;
        this.healthBar.healthEdge_2.world = world;
        this.healthBar.healthEdge_1.otherDirection = true;
        this.healthBar.healthEdge_2.otherDirection = true;
    }

    update() {
        if (!this.owner.isDead()) {
            this.setHealthConfig();
            this.hitEffects();
        } else {
            this.isGameOver = true;

            this.setHealthConfig();

            this.bloodFx.x = this.x + 220;
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
        this.healthBar.render(ctx);
        this.bloodFx.draw(ctx);
        this.breakeShatterFx.draw(ctx);
    }

    hitEffects() {
        this.healthBarBorder.hitEffects();
        this.healthBar.hitEffects();
        this.bloodFx.hitVibration();
    }

    // TODO: health effect: whitout vibration, whitout boolFx!

    setHealthConfig() {
        let targetHealth = this.owner.energy;
        let healthPosition = targetHealth / 10;
        if (healthPosition < 0) {
            healthPosition = 0;
        }

        this.bloodFx.x = this.x + 283.5 - (18.5 * this.lastPosition);

        this.bloodFx.playSpriteOnce(this.bloodFx.IMAGES_HIT_SPLASH, 100);

        this.lastPosition = healthPosition;

        this.healthBar.setHealth(healthPosition);
        this.healthBar.positionHealthEdge(healthPosition);

        if (targetHealth === 0) {
            this.isGameOver = false;
        }
    }
}
