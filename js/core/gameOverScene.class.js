class GameOverScene {
    constructor(game) {
        this.game = game;
    }

    // TODO: finish GameOverScene
    init() {
        document.addEventListener('keydown', this.restartGameListener = (event) => {
            if (event.code === 'Space') {
                this.game.setState('menu');
            }
        });
    }

    update() {}

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over - Space zum Neustart', 100, 100);
    }
}