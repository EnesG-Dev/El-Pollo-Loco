class GameScene {
    constructor(game) {
        this.game = game;
        this.world = null;
        this.gameOverGrace = false;
        this.gameOverEndTime = 0;
    }

    init() {
        const level = createLevel();
        this.world = new World(this.game.canvas, this.game.keyboard, level);
        this.world.initObjects();
        this.setSceneLayout();

        this.setupControlButtons();
        this.updateOverlay();
    }

    update() {
        if (!this.world) return;

        if (this.gameOverGrace) {
            if (Date.now() < this.gameOverEndTime) {
                this.world.update();
            }
            return;
        }

        if (this.world.isGameOver()) {
            this.triggerGameOverGrace();
        } else {
            this.world.update();
        }
    }

    triggerGameOverGrace() {
        this.gameOverGrace = true;
        this.gameOverEndTime = Date.now() + 2000;
        COLLISION_MANAGER.objects = [];
        this.setGameResult();
        this.switchEndScene();
    }
    
    setGameResult() {
        if (this.world.character.energy === 0) {
            this.game.gameResult = 'failed';
        } else this.game.gameResult = 'win';

        this.game.playerScore = this.world.score;
        this.game.saveScore();
    }
    
    switchEndScene() {
        setTimeout(() => {
            this.world.clearWorld();
            COLLISION_MANAGER.objects = [];

            // this.game.setState('gameOver');
            // game leichter machen > boss langsammer
        }, 5000);
    }

    render(ctx) {
        if (this.world) {
            this.world.render(ctx);
        }
    }

    setSceneLayout() {
        const sceneLayout = document.getElementById('sceneLayout');
        sceneLayout.innerHTML = this.controlTemp();
        sceneLayout.style.background = 'none';
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

    touchAction(action) {
        this.game.keyboard[action] = true;
    }
    touchStop(action) {
        this.game.keyboard[action] = false;
    }

    setupControlButtons() {
        document.querySelectorAll('.control-btn').forEach(btn => {
            const action = btn.dataset.action;
            if (!action) return;

            btn.onpointerdown = () => this.touchAction(action);
            btn.onpointerup = () => this.touchStop(action);
        });
    }

    controlTemp() {
        return /*html*/`
            <div id="controlLayout" class="mobile-controls">
                <div class="top-bar">
                    <button class="control-btn" aria-label="fullscreen" onpointerdown="toggleFullscreen()">
                        <img id="fullscreenBtnImg" src="./assets/images/icons/fullscreen.png" alt="fullscreen icon"/>
                    </button>
                </div>

                <div class="bottom-bar">
                    <div class="left-side-btns">
                        <button class="control-btn" data-action="LEFT" aria-label="move left">
                            <img src="./assets/images/icons/left_white.png" alt="move left icon"/>
                        </button>
                        <button class="control-btn" data-action="RIGHT" aria-label="move right" >
                            <img src="./assets/images/icons/right_white.png" alt="move right icon"/>
                        </button>
                    </div>

                    <div class="right-side-btns">
                        <button class="control-btn" data-action="V" aria-label="energy attack">
                            <img src="./assets/images/icons/energy.png" alt="energy icon"/>
                        </button>
                        <button class="control-btn" data-action="C" aria-label="sword attack">
                            <img src="./assets/images/icons/sword.png" alt="sword icon"/>
                        </button>
                        <button class="control-btn" data-action="SPACE" aria-label="jump">
                            <img src="./assets/images/icons/jump.png" alt="jump icon"/>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}