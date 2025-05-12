class GameScene {
    constructor(game) {
        this.game = game;
        this.world = null;
    }

    init() {
        const level = createLevel();
        this.world = new World(this.game.canvas, this.game.keyboard, level);
        this.world.initObjects();
    }

    // TODO: GAME OVER screen
    update() {
        if (this.world) {
            this.world.update();
            if (this.world.isGameOver()) {
                this.game.setState('gameOver');
            }
        }
    }

    render(ctx) {
        if (this.world) {
            this.world.render(ctx);
        }
    }
}