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

        const sceneLayout = document.getElementById('sceneLayout');
        sceneLayout.innerHTML = this.controlTemp();
        sceneLayout.style.background = 'none';

        this.setupControlButtons();
        this.updateOverlay();
    }

    update() {
        if (!this.world || this.gameOverTriggered) return;

        this.world.update();

        if (this.world.isGameOver()) {
            // this.gameOverTriggered = true;
            // this.world.clearObjects();
            COLLISION_MANAGER.objects = [];
            setTimeout(() => {
                // this.world.character.playContinue();
                // this.game.setState('gameOver');
                console.log('spiel vorbei!');

            }, 10000);
        }
    }

    render(ctx) {
        if (this.world) {
            this.world.render(ctx);
        }
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