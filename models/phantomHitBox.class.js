class PhantomHitBox extends EnemyHitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        this.phantom = owner;

    }

    onCollision(other) {
        if (other instanceof SwordHitBox) {
            this.phantom.hit(100);
        }
    }
}
