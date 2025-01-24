class WitchHitBox extends EnemyHitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        this.witch = owner;

    }

    onCollision(other) {
        if (other instanceof SwordHitBox) {
            this.witch.hit(50);
        }
    }
}
