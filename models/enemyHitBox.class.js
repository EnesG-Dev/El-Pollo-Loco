class EnemyHitBox extends HitBox {

    constructor(x, y, w, h, owner, cX) {
        super(x, y, w, h, owner, cX);
        
    }

    onCollision(other) {
        if (other instanceof CharacterHitBox) {
            // this.character.takeDamage(10);
        }
    }
}
