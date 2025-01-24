class HitBox {

    constructor(offsetX, offsetY, w, h, owner = undefined) {
        this.owner = owner;
        
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = w;
        this.height = h;
        
        this.addToCollisionList();
    }


    addToCollisionList() {
        COLLISION_MANAGER.addObject(this);
    }

    removeFromCollisionList() {
        COLLISION_MANAGER.removeObject(this);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // Halbtransparentes Rot
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    updatePosition() {
        if (this.owner) {   
            this.x = this.owner.x + this.offsetX;
            this.y = this.owner.y + this.offsetY;
        } else {
            this.x = this.offsetX;
            this.y = this.offsetY;
        }
    }




    // damit keine fehler entstehen provisorisch!!
    drawFrame(ctx) {}
    drawOffset(ctx) {}
}
