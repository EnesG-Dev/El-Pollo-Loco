class CollisionManager {

    objects = [];

    /**
     * Fügt ein Objekt zur Kollisionsüberprüfung hinzu.
     * @param {GameObject} object - Das Objekt, das überprüft werden soll.
     */
    addObject(object) {
        this.objects.push(object);
    }

    /**
     * Entfernt ein Objekt aus der Kollisionsüberprüfung.
     * @param {GameObject} object - Das Objekt, das entfernt werden soll.
     */
    removeObject(object) {
        this.objects = this.objects.filter(obj => obj !== object);
    }

    /**
     * Führt Kollisionsprüfungen zwischen allen registrierten Objekten durch.
     */
    checkCollisions() {
        for (let i = 0; i < this.objects.length; i++) {
            
            for (let j = i + 1; j < this.objects.length; j++) {
                const objA = this.objects[i];
                const objB = this.objects[j];

                if (this.isColliding(objA, objB)) {
                    objA.onCollision(objB);
                    objB.onCollision(objA);
                    // console.log('we have a collision whit ', objA, 'and', objB);
                }
            }
        }
    }

    isColliding(a, b) {
        return (
            a.x + a.width >= b.x &&
            a.x <= b.x + b.width &&
            a.y + a.height >= b.y &&
            a.y <= b.y + b.height
        );
    }
}
