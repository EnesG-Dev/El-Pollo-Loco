class ProjectileHitBox extends HitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        this.projectile = owner;
      
    }

    onCollision(other) {
        if (other instanceof CharacterHitBox || other instanceof SwordHitBox) {
            this.projectile.detonate();
        }
    }
}
