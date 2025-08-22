class StatusBarBoss {
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.widthDe = 200;
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
        ];

        this.hideStatusBar();
    }

    testViewLoopalt() {
        let statusBarElements = [this.portrait, this.healthBar, this.healthBarBorder];
        let hidePosition = this.portrait.x + 300;

        let testInterval = setInterval(() => {
            if (this.portrait.x !== hidePosition) {
                statusBarElements.forEach(el => el.x += 10)
            } else {
                clearInterval(testInterval);
            }
        }, 50);
    }
    hideStatusBar() {
        let statusBarElements = [this.portrait, this.healthBar, this.healthBarBorder];
        statusBarElements.forEach(el => el.x += 300)
    }

    viewStatusBar() {
        const elements = [this.portrait, this.healthBar, this.healthBarBorder];
        const endPositon = this.portrait.x - 300;

        const animate = () => {
            if (this.portrait.x !== endPositon) {
                elements.forEach(el => el.x -= 5);
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
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

        // if (targetHealth === 0) {
        //     this.isGameOver = false;
        // }
    }
}
