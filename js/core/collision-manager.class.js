/**
 * Manages AABB collision detection between registered game objects.
 */
class CollisionManager {

    /**
     * List of objects currently registered for collision checks.
     *
     * @type {Object[]}
     */
    objects = [];

    /**
     * Registers a game object for collision detection.
     *
     * @param {Object} object - The game object to register. Must expose x, y, width, height, and onCollision().
     * @returns {void}
     */
    addObject(object) {
        this.objects.push(object);
    }

    /**
     * Unregisters a game object from collision detection.
     *
     * @param {Object} object - The game object to remove
     * @returns {void}
     */
    removeObject(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    /**
     * Iterates over all unique object pairs and notifies both parties on collision.
     * Each pair is checked only once per frame (i < j).
     *
     * @returns {void}
     */
    checkCollisions() {
        for (let i = 0; i < this.objects.length; i++) {

            for (let j = i + 1; j < this.objects.length; j++) {
                const objA = this.objects[i];
                const objB = this.objects[j];

                if (this.isColliding(objA, objB)) {
                    objA.onCollision(objB);
                    objB.onCollision(objA);
                }
            }
        }
    }

    /**
     * Returns true when two objects overlap using AABB collision detection.
     * The check passes only if there is overlap on **both** axes simultaneously.
     *
     * @param {{ x: number, y: number, width: number, height: number }} a - First object
     * @param {{ x: number, y: number, width: number, height: number }} b - Second object
     * @returns {boolean} True if the bounding boxes overlap
     */
    isColliding(a, b) {
        return (
            a.x + a.width   >= b.x &&
            a.x             <= b.x + b.width &&
            a.y + a.height  >= b.y &&
            a.y             <= b.y + b.height
        );
    }
}
