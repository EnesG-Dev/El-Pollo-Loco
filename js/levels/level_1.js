
function createLevel() {

    return new Level(
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
            new Phantom(530, 130),
            new Phantom(1400, 200),
            new Phantom(2000, 200),
            new Phantom(1950, -40),
            new Endboss(),
        ],
        [
            { minX: 4000, maxX: Infinity, groundLevel: 300, type: "static" },
            { minX: 2845, maxX: 4000, groundLevel: 255, type: "static" },
            { minX: 2750, maxX: 2845, groundLevel: 183, type: "static" },
            {
                minX: 2560,
                maxX: 2750,
                type: "ramp",
                startLevel: 290,
                endLevel: 183
            },
            { minX: 2400, maxX: 2560, groundLevel: 300, type: "static" },
            {
                minX: 1690,
                maxX: 2040,
                groundLevel: 0,
                type: "highground",
                minY: -5,
                maxY: 5
            },
            {
                minX: 1760,
                maxX: 1995,
                groundLevel: 120,
                type: "highground",
                minY: 115,
                maxY: 125
            },
            {
                minX: 1230,
                maxX: 1420,
                groundLevel: 120,
                type: "highground",
                minY: 115,
                maxY: 125
            },
            { minX: 1105, maxX: 2400, groundLevel: 245, type: "static" },
            { minX: 1010, maxX: 1105, groundLevel: 120, type: "static" },
            {
                minX: 780,
                maxX: 1010,
                type: "ramp",
                startLevel: 230,
                endLevel: 120
            },
            { minX: 630, maxX: 780, groundLevel: 280, type: "static" },
            {
                minX: 300,
                maxX: 480,
                groundLevel: 55,
                type: "highground",
                minY: 50,
                maxY: 60
            },
            { minX: 260, maxX: 630, groundLevel: 170, type: "static" },
            {
                minX: 105,
                maxX: 260,
                type: "ramp",
                startLevel: 225,
                endLevel: 170
            },
            { minX: -200, maxX: 105, groundLevel: 225, type: "static" }
        ]
    );
}