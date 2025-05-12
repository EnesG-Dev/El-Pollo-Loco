class Level {
   
    backgroundObjects = [];
    level_end_x = 3880;

    constructor(background, map, clouds, enemies, lvlConfig) {
        this.backgroundPaths = background[0];
        this.map = map;
        this.clouds = clouds;
        this.enemies = enemies;
        this.configs = lvlConfig;

        this.backgroundLoop();
    }

    backgroundLoop() {        
        for (let loopIndex = -1; loopIndex < 7; loopIndex++) {
            this.backgroundPaths.layers_1.forEach(path => {
                this.backgroundObjects.push(new BackgroundObject(path, 719*loopIndex));
            });

            if (this.backgroundPaths.layers_2) {
                loopIndex++;
                this.backgroundPaths.layers_2.forEach(path => {
                    this.backgroundObjects.push(new BackgroundObject(path, 719*loopIndex));
                });
            }
        }
    }
}