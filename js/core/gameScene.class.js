class GameScene {
    constructor(game) {
        this.game = game;
        this.world = null;
        this.gameOverTriggered = false;
    }

    init() {
        const level = createLevel();
        this.world = new World(this.game.canvas, this.game.keyboard, level);
        this.world.initObjects();
        this.gameOverTriggered = false;
    }

    update() {
        if (!this.world || this.gameOverTriggered) return;

        this.world.update();

        if (this.world.isGameOver()) {
            this.gameOverTriggered = true;
            this.world.clearObjects();
            COLLISION_MANAGER.objects = [];
            setTimeout(() => {
                // this.world.character.playContinue();
                this.game.setState('gameOver');
            }, 5000);
        }
    }

    render(ctx) {
        if (this.world) {
            this.world.render(ctx);
        }
    }
}
