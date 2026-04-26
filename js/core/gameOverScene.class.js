class GameOverScene {
    constructor(game) {
        this.game = game;

        this.background;
        this.backgroundWinn = new Image();
        this.backgroundWinn.src = "./assets/images/menu/endscreen_win.png";
        this.backgroundFail = new Image();
        this.backgroundFail.src = "./assets/images/menu/endscreen_fail.jpg";

    }

    init() {
        this.setSceneLayout();
        this.setBackground();
        this.updateOverlay();
    }

    setBackground() {
        if (this.game.gameResult === 'win') {
            this.background = this.backgroundWinn;
            this.renderScoreList();
        } else {
            this.background = this.backgroundFail;
        }
    }

    update() { }

    render(ctx) {
        ctx.drawImage(
            this.background, 0, 0,
            this.game.canvas.width,
            this.game.canvas.height
        );
    }

    renderold(ctx) {
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

        this.displaySoundStatus();
    }

    displaySoundStatus(mute = this.game.mute) {
        const soundBtn = document.getElementById('soundBtn');
        if (mute) {
            soundBtn.src = "./assets/images/icons/mute.png";
            soundBtn.setAttribute("aria-pressed", "true");
        } else {
            soundBtn.src = "./assets/images/icons/sound.png";
            soundBtn.setAttribute("aria-pressed", "false");
        }
    }

    setSceneLayout() {
        const sceneLayout = document.getElementById('sceneLayout');
        sceneLayout.innerHTML = this.gameOverTemp();
    }

    renderScoreList() {
        const currentPlayerIndex = players.length - 1;
        const sortedScoreList = players.map((name, index) => {
            return { name: name, score: scores[index], isCurrentPlayer: index === currentPlayerIndex };
        });
        sortedScoreList.sort((a, b) => b.score - a.score);
        
        const scoreList = document.getElementById('scoreList');
        for (let i = 0; i < Math.min(sortedScoreList.length, 5); i++) {
            const name = sortedScoreList[i].name || '---';
            const score = sortedScoreList[i].score || '---';
            const isHighlighted = sortedScoreList[i].isCurrentPlayer;
            scoreList.innerHTML += this.scoreListTemp(name, score, isHighlighted);
        }
    }

    gameOverTemp() {
        return  /*html*/`
            <div id="controlLayout" class="mobile-controls">
                <div class="top-bar">
                    <button class="control-btn" aria-label="info" onpointerdown="toggleInfoScreen()"
                        onclick="document.getElementById('infoDialog').classList.add('open')">
                        <img id="infoBtnImg" src="./assets/images/icons/info.png" alt="info icon"/>
                    </button>
                    <button class="control-btn" aria-label="fullscreen" onpointerdown="toggleFullscreen(), toggleWideScreenSize()">
                        <img id="fullscreenBtnImg" src="./assets/images/icons/fullscreen.png" alt="fullscreen icon"/>
                    </button>
                    <button class="control-btn" aria-label="mute" onpointerdown="GAME.toggleSound()">
                        <img id="soundBtn" src="./assets/images/icons/mute.png" aria-pressed="true" alt="mute icon"/>
                    </button>
                </div>
            
                <div class="bottom-bar gameover-btns">
                    <button class="menu-btn" onpointerdown="GAME.playAgain()" aria-label="Spiel starten">
                    Neu starten
                    </button>

                    <button class="menu-btn" onpointerdown="GAME.turnToMenu()" aria-label="Zum Menü">
                    Zum Menü
                    </button>
                </div>

                <div class="score-board">
                    <list id="scoreList" class="score-list wide-screen-size"></list>
                </div>
            </div>
        `;
    }

    scoreListTemp(name = '', score = '',  isHighlighted = false) {
        return /*html*/`
            <div class="score-item ${isHighlighted ? 'highlight-player' : ''}"><span>${name}</span> <span>${score}</span></div>
        `;
    }
}
