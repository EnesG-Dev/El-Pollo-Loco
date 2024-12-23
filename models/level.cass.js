class Level {
    enemies;
    clouds;
    backgroundPaths1;
    backgroundPaths2;
    backgroundObjects = [];
    level_end_x = 5706;

    constructor(enemies, clouds, backgroundPaths1, backgroundPaths2,) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundPaths1 = backgroundPaths1;
        this.backgroundPaths2 = backgroundPaths2;
        this.backgroundLoop();
    }

    backgroundLoop() {
        for (let loopIndex = -1; loopIndex < 8; loopIndex++) {
            this.backgroundPaths1.forEach(path => {
                this.backgroundObjects.push(new BackgroundObject(path, 719*loopIndex));
            });
            loopIndex++;
            this.backgroundPaths2.forEach(path => {
                this.backgroundObjects.push(new BackgroundObject(path, 719*loopIndex));
            });
        }
    }
}