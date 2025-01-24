class CharacterHitBox extends HitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        this.character = owner;
    }

    onCollision(other) {
        if (other instanceof EnemyHitBox) {
            this.character.hit(10);
            world.healthBar.setPrecentage(this.character.energy);
        }
        if (other instanceof ProjectileHitBox) {
            this.character.hit(20);
            world.healthBar.setPrecentage(this.character.energy);
        }
    }
}
