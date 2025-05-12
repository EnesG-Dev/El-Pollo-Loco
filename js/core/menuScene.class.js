class MenuScene {
    constructor(game) {
        this.game = game;
    }

    // TODO: finish MenuScene
    init() {
        document.addEventListener('keydown', this.startGameListener = (event) => {
            if (event.code === 'Space') {
                this.game.setState('playing');
            }
        });
    }

    update() {}

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Drücke Space zum Starten', 100, 100);
    }
}