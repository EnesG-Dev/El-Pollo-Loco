// @constant {boolean} devMode - Enables developer mode
let devMode = true;

// @type {Object} imgPaths - Loaded image asset paths
let imgPaths;

// @constant {number} GAME_WIDTH - Logical game width in pixels
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

// @type {Keyboard} keyboard - Tracks keyboard input state
const keyboard = new Keyboard();

// @type {CollisionManager} COLLISION_MANAGER - Manages collision detection
const COLLISION_MANAGER = new CollisionManager();

// @type {AudioManager} AUDIO_MANAGER - Manages audio playback
const AUDIO_MANAGER = new AudioManager();

// @type {Game} GAME - The main game instance
let GAME;

// @type {string[]} players - List of player names from storage
let players = [];

// @type {number[]} scores - List of player scores from storage
let scores = [];

/**
 * Initializes the game: loads assets, sets up the canvas, and restores saved data.
 *
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    await AUDIO_MANAGER.init();

    const response = await fetch('data/assets.json');
    imgPaths = await response.json();

    const canvas = document.getElementById('canvas');
    GAME = new Game(canvas, keyboard);

    loadStorage();
    resizeCanvas();
}

/**
 * Serializes an array and saves it to localStorage under the given key.
 *
 * @param {string} key - The storage key
 * @param {Array} array - The array to store
 * @returns {void}
 */
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

/**
 * Retrieves and parses an array from localStorage. Returns an empty array if not found.
 *
 * @param {string} key - The storage key
 * @returns {Array} The stored array or an empty array
 */
function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Loads player and score data from localStorage into global variables.
 *
 * @returns {void}
 */
function loadStorage() {
    players = getArray("players");
    scores = getArray("scores");
}

/**
 * Recalculates and applies the canvas scale based on the current window dimensions.
 *
 * @returns {void}
 */
function resizeCanvas() {
    const canvas = document.getElementById('canvas');
    const scale  = Math.min(
        window.innerWidth  / GAME_WIDTH,
        window.innerHeight / GAME_HEIGHT
    );
    scaleSize(canvas, scale);
}

/**
 * Applies CSS dimensions to the canvas element.
 * On touch devices, small screens, or in fullscreen mode the canvas is scaled up;
 * otherwise it stays at its logical size.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {number} scale - The computed scale factor
 * @returns {void}
 */
function scaleSize(canvas, scale) {
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const shouldScale =
    isTouchDevice() ||
    window.innerWidth <= 720 ||
    !!document.fullscreenElement;

    if (shouldScale) {
        canvas.style.width  = `${GAME_WIDTH  * scale}px`;
        canvas.style.height = `${GAME_HEIGHT * scale}px`;
    } else {
        canvas.style.width  = `${GAME_WIDTH}px`;
        canvas.style.height = `${GAME_HEIGHT}px`;
    }
}

/**
 * Returns true when the current device supports touch input.
 *
 * @returns {boolean}
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Toggles fullscreen mode for the game screen element.
 * Uses vendor-prefixed APIs for broader browser compatibility.
 *
 * @returns {void}
 */
function toggleFullscreen() {
    const gameScreen = document.getElementById('gameScreen');

    if (!document.fullscreenElement) {
        const requestFS =
            gameScreen.requestFullscreen         ||
            gameScreen.webkitRequestFullscreen   ||
            gameScreen.msRequestFullscreen;
 
        requestFS?.call(gameScreen);
    } else {
        const exitFS =
            document.exitFullscreen         ||
            document.webkitExitFullscreen   ||
            document.msExitFullscreen;
 
        exitFS?.call(document);
    }
}

/**
 * Toggles the wide-screen layout class on the score list element.
 *
 * @returns {void}
 */
function toggleWideScreenSize() {
    const scoreList = document.getElementById('scoreList');
    scoreList.classList.toggle('wide-screen-size');
}

/**
 * Opens the info dialog by adding the 'open' CSS class.
 *
 * @returns {void}
 */
function toggleInfoScreen() {
    const infoDialog = document.getElementById('infoDialog');
    infoDialog.classList.add('open');
}

window.addEventListener("resize", resizeCanvas);

document.addEventListener("fullscreenchange", () => {
    GAME.currentScene.updateOverlay();
});

/**
 * Maps DOM KeyboardEvent codes to Keyboard state properties.
 *
 * @constant {Object.<string, string>}
 */
const KEY_MAP = {
    ArrowLeft:  'LEFT',
    ArrowRight: 'RIGHT',
    ArrowUp:    'UP',
    ArrowDown:  'DOWN',
    Space:      'SPACE',
    KeyC:       'C',
    KeyV:       'V',
    KeyB:       'B',
};
 
/**
 * Sets the corresponding keyboard flag to true on key press.
 *
 * @param {KeyboardEvent} event
 * @returns {void}
 */
document.addEventListener('keydown', (event) => {
    if (KEY_MAP[event.code]) keyboard[KEY_MAP[event.code]] = true;
});
 
/**
 * Sets the corresponding keyboard flag to false on key release.
 *
 * @param {KeyboardEvent} event
 * @returns {void}
 */
document.addEventListener('keyup', (event) => {
    if (KEY_MAP[event.code]) keyboard[KEY_MAP[event.code]] = false;
});
