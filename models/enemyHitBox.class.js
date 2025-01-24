class EnemyHitBox extends HitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        
    }

    onCollision(other) {
        if (other instanceof CharacterHitBox) {
            // this.character.takeDamage(10);
        }
    }
}
