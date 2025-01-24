class SwordHitBox extends HitBox {

    constructor(x, y, w, h, owner) {
        super(x, y, w, h, owner);
        
    }

    onCollision(other) {
        console.log('sword');
        this.removeFromCollisionList();            

    }

}