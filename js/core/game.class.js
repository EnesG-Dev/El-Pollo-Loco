class Game {
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.keyboard = keyboard;

        this.loopId = null;
        this.setState('menu');
        this.gameLoop();

        this.gameResult = null;
        this.mute = true;
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

    toggleSound() {
        const soundBtn = document.getElementById('soundBtn');
        if (!this.mute) {
            this.mute = true;
            soundBtn.innerText = "Sound OFF";
            soundBtn.setAttribute("aria-pressed", "true");
            AUDIO_MANAGER.muteAll(true);
        } else {
            this.mute = false;
            soundBtn.innerText = "Sound ON";
            soundBtn.setAttribute("aria-pressed", "false");
            AUDIO_MANAGER.startSoundOnUserInteraction();
            AUDIO_MANAGER.muteAll(false);
        }
    }


    //########################################
    // nicht in benutzung
    get isRunning() {
        return GAME.currentScene instanceof GameScene;
    }

    newGame() {
        this.saveName();
        AUDIO_MANAGER.playEffectSound('effects_startGame');
        this.setState('playing');
    }

    turnToMenu() {
        // reset world > menu
        this.setState('menu');
    }

    playAgain() {
        // reset world > playing
        this.setState('playing');
    }

    saveName() {
        const name = document.getElementById('playerName').value || 'Spieler';
        this.playerName = name;
    }

    playerName = null;



    _score = 10;

    set score(value) {
        this._score = value;
    }

}
// manage sound
// manage player
// manage scores
// clear interval / timeouts of scenes

let players = [];
let scores = [];
loadScores();
function loadScores() {
    console.log(players, scores);
    players = getArray("players");
    scores = getArray("scores");
    console.log(players, scores);
}

// wird erst ausgeführt wenn gameOver oder winn!
function saveScore() {
    players.push(testPlayer);
    scores.push(testScore);

    setArray("players", players);
    setArray("scores", scores);
}

function saveName() {
    let inputPlayerName = document.getElementById('playerName').value;
    player = inputPlayerName || 'Player';
}

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}






