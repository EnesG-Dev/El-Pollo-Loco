class GameOverScene {
    constructor(game) {
        this.game = game;
    }

    // TODO: finish GameOverScene
    init() {
        this.onKeyDown = (e) => {
            if (e.code === 'Space') this.game.setState('playing');
        };
        document.addEventListener('keydown', this.onKeyDown);
    }

    destroy() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    update() { }

    render(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over - Space zum Neustart', 100, 100);
    }

    updateOverlay() {
        this.checkButtons();
    }

    checkButtons() {
        const fullscreenBtn = document.getElementById('fullscreenBtnImg');
        if (document.fullscreenElement) {
            fullscreenBtn.src = "./assets/images/icons/fullscreen_exit.png";
            fullscreenBtn.alt = "fullscreen exit icon";
        } else {
            fullscreenBtn.src = "./assets/images/icons/fullscreen.png";
            fullscreenBtn.alt = "fullscreen icon";
        }
    }
}
