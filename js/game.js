let canvas;
let world;
let keyboard = new Keyboard();;
let imgPaths;
let LEVEL_1 = null;
const COLLISION_MANAGER = new CollisionManager();


async function init() {
    const response = await fetch('./assets/paths/img_paths.json');
    imgPaths = await response.json();
    const levelData = await loadLevelData(); // Lade die JSON-Daten
    LEVEL_1 = await createLevelFromData(levelData); // Erstelle das Level
    
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

async function loadLevelData() {
    const response = await fetch('./assets/levels/level_1.json');
    return response.json(); // Liefert die JSON-Daten als Objekt
}

async function createLevelFromData(levelData) {
    const enemies = levelData.enemies.map(enemyData => {
        if (enemyData.type === 'Witch') {
            return new Witch(enemyData.x, enemyData.y);
        } else if (enemyData.type === 'Endboss') {
            return new Endboss(enemyData.x, enemyData.y);
        }
        throw new Error(`Unbekannter Gegner-Typ: ${enemyData.type}`);
    });

    const clouds = levelData.clouds.map(cloudData => {
        if (cloudData.type === 'Cloud') {
            return new Cloud(cloudData.x, cloudData.y);
        }
        throw new Error(`Unbekannter Wolken-Typ: ${cloudData.type}`);
    });

    const backgroundLayers = levelData.backgroundLayers;

    // Erstelle das Level-Objekt
    return new Level(enemies, clouds, backgroundLayers, backgroundLayers);
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
