
function createLevel() {
    
    LEVEL_1 = new Level(
        [
            imgPaths.background
        ],
        [
            new BackgroundObject(imgPaths.map[0], -150, 2155, 480),
            new BackgroundObject(imgPaths.map[1], 2005, 2155, 480)
        ],
        [
            new Cloud(0, 100, 40, 0.5),
            new Cloud(1, 500, 40, 0.8),
            new Cloud(2, 700, 100, 1),
            new Cloud(3, 700, 40, 0.5),
            new Cloud(4, 900, 40, 0.8),
            new Cloud(5, 1100, 80, 2.0),
            
            new Cloud(0, 1100, 40, 0.5),
            new Cloud(1, 1500, 40, 0.8),
            new Cloud(2, 1700, 100, 1),
            new Cloud(3, 1700, 40, 0.5),
            new Cloud(4, 1900, 40, 0.8),
            new Cloud(5, 2100, 80, 2.0),

            new Cloud(0, 2100, 40, 0.5),
            new Cloud(1, 2500, 40, 0.8),
            new Cloud(2, 2700, 100, 1),
            new Cloud(3, 2700, 40, 0.5),
            new Cloud(4, 2900, 40, 0.8),
            new Cloud(5, 3100, 80, 2.0),

            new Cloud(0, 3100, 40, 0.5),
            new Cloud(1, 3500, 40, 0.8),
            new Cloud(2, 3700, 100, 1),
            new Cloud(3, 3700, 40, 0.5),
            new Cloud(4, 3900, 40, 0.8),
            new Cloud(5, 4100, 80, 2.0),

            new Cloud(0, 4100, 40, 0.5),
            new Cloud(1, 4500, 40, 0.8),
            new Cloud(2, 100, 100, 1),
            new Cloud(3, -200, 40, 0.5),
            new Cloud(4, -300, 40, 0.8),
            new Cloud(5, -300, 80, 2.0),

        ],
        [
            new Witch(1300, 35),
            new Witch(2750, 100),
            // new Chicken(),
            new Endboss(),
        ],
    );
    
}