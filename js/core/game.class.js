class Game {
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.keyboard = keyboard;

        this.loopId = null;
        this.setState('menu');
        this.gameLoop();
    }

    get isRunning() {
        return GAME.currentScene instanceof GameScene;
    }

    playNewGame() {
        this.setState('playing');
        // document.getElementById('sceneLayout').style.display = 'none';
    }

    setState(state) {
        if (this.currentScene?.destroy) this.currentScene.destroy();
        switch (state) {
            case 'menu': this.currentScene = new MenuScene(this); break;
            case 'playing': this.currentScene = new GameScene(this); break;
            case 'gameOver': this.currentScene = new GameOverScene(this); break;
        }
        this.currentScene.init();
    }

    gameLoop() {
        const step = (ts) => {
            this.currentScene.update(ts);
            this.currentScene.render(this.ctx);
            this.loopId = requestAnimationFrame(step);
        };
        this.loopId = requestAnimationFrame(step);
    }
}
