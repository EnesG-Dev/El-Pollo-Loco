class PhantomHitBox extends EnemyHitBox {

    constructor(x, y, w, h, owner, cX) {
        super(x, y, w, h, owner, cX);
        this.phantom = owner;
    }

    onCollision(other) {
        if (other instanceof SwordHitBox) {
            this.phantom.hit(100);
        }
    }
}
