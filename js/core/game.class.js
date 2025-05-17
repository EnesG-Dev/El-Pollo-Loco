class Game {
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.keyboard = keyboard;
        this.gameState = 'menu';
        this.scenes = {
            menu: new MenuScene(this),
            playing: new GameScene(this),
            gameOver: new GameOverScene(this)
        };
        this.currentScene = this.scenes.menu;
        this.currentScene.init();
        this.run();
        this.draw();
    }

    setState(state) {
        this.gameState = state;
        this.currentScene = this.scenes[state];
        this.currentScene.init();
    }

    run() {
        setInterval(() => {
            this.currentScene.update();
        }, 1000 / 100);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentScene.render(this.ctx);
        requestAnimationFrame(() => this.draw());
    }
}