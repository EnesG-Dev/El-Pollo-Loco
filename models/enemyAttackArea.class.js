class EnemyAttackArea extends HitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        this.enemy = owner;
        this.removeFromCollisionList();
    }

    onCollision(other) {
        if (other instanceof CharacterHitBox) {
            other.owner.hit(100);
        }
    }

    alignHitBox() {
        if (this.enemy.otherDirection) {
            this.offsetX = 10;
        } else this.offsetX = 105;
    }
}