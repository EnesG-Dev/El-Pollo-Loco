class SwordHitBox extends HitBox {

    constructor(x, y, w, h, owner, cX) {
        super(x, y, w, h, owner, cX);
        this.character = owner;
        this.removeFromCollisionList();
    }

    onCollision(other) {
        if (other instanceof EnemyHitBox) {
            other.owner.hit(10);
        }
    }
}
