class SwordHitBox extends HitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        this.character = owner;
        this.removeFromCollisionList();
    }

    onCollision(other) {
        if (other instanceof EnemyHitBox) {
            other.owner.hit(10);
        }
    }

    alignHitBox() {
        if (this.character.otherDirection) {
            console.log('drehung');
            this.offsetX = 10;
        } else this.offsetX = 105;
    }
}
