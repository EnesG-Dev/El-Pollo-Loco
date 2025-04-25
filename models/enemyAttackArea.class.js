class EnemyAttackArea extends HitBox {

    constructor(x, y, w, h, owner, correctionX) {
        super(x, y, w, h, owner, correctionX);

        this.removeFromCollisionList();
    }

    onCollision(other) {
        if (other instanceof CharacterHitBox) {
            other.owner.hit(20);
        }
    }
}