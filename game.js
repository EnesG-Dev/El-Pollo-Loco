let devMode = true;
let imgPaths;
const keyboard = new Keyboard();
const COLLISION_MANAGER = new CollisionManager();
let GAME;

async function init() {
    const response = await fetch('data/assets.json');
    imgPaths = await response.json();

    const canvas = document.getElementById('canvas');
    const game = new Game(canvas, keyboard);
    GAME = game;
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
