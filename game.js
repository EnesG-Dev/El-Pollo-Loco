let devMode = true;
let fullscreen = false;
let imgPaths;
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;
const keyboard = new Keyboard();
const COLLISION_MANAGER = new CollisionManager();
let GAME;

async function init() {
    const response = await fetch('data/assets.json');
    imgPaths = await response.json();

    const canvas = document.getElementById('canvas');
    const game = new Game(canvas, keyboard);
    GAME = game;



    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (event.code === 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (event.code === 'ArrowUp') {
        keyboard.UP = true;
    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (event.code === 'Space') {
        keyboard.SPACE = true;
    }

    if (event.code === 'KeyC') {
        keyboard.C = true;
    }

    if (event.code === 'KeyV') {
        keyboard.V = true;
    }

    if (event.code === 'KeyB') {
        keyboard.B = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (event.code === 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (event.code === 'ArrowUp') {
        keyboard.UP = false;
    }

    if (event.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (event.code === 'Space') {
        keyboard.SPACE = false;
    }

    if (event.code === 'KeyC') {
        keyboard.C = false;
    }

    if (event.code === 'KeyV') {
        keyboard.V = false;
    }

    if (event.code === 'KeyB') {
        keyboard.B = false;
    }
});

let player = '';
let score = '';
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

function resizeCanvas() {
    const canvas = document.getElementById('canvas');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = Math.min(
        screenWidth / GAME_WIDTH,
        screenHeight / GAME_HEIGHT
    );

    scaleSize(canvas, scale);
}

function scaleSize(canvas, scale) {

    const gameScreen = document.getElementById('gameScreen');


    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    if (isTouchDevise() || window.innerWidth <= 720 || document.fullscreenElement) {
        canvas.style.width = GAME_WIDTH * scale + "px";
        canvas.style.height = GAME_HEIGHT * scale + "px";
    } else {
        canvas.style.width = GAME_WIDTH + "px";
        canvas.style.height = GAME_HEIGHT + "px";
    }
}

function isTouchDevise() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

function toggleFullscreen() {
    const gameScreen = document.getElementById('gameScreen');

    if (!document.fullscreenElement) {
        if (gameScreen.requestFullscreen) {
            gameScreen.requestFullscreen();
        } else if (gameScreen.webkitRequestFullscreen) {
            gameScreen.webkitRequestFullscreen();
        } else if (gameScreen.msRequestFullscreen) {
            gameScreen.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

document.addEventListener("fullscreenchange", () => {
    GAME.currentScene.updateOverlay();
});
