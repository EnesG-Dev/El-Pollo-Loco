class HitBox {

    constructor(offsetX, offsetY, w, h, owner = undefined, correctionX = 0) {
        this.owner = owner;
        
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = w;
        this.height = h;

        this.resetOffsetX = offsetX;
        this.alignX = offsetX - correctionX;
        
        this.addToCollisionList();
    }

    onCollision(other) {
        return;
    }

    addToCollisionList() {
        COLLISION_MANAGER.addObject(this);
    }

    removeFromCollisionList(afterTime = 0) {
        setTimeout(() => {
            COLLISION_MANAGER.removeObject(this);
        }, afterTime);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // Halbtransparentes Rot
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    updatePosition() {
        this.alignmentCorrection();

        if (this.owner) {   
            this.x = this.owner.x + this.offsetX;
            this.y = this.owner.y + this.offsetY;
        } else {
            this.x = this.offsetX;
            this.y = this.offsetY;
        }
    }

    alignmentCorrection() {
        if (this.owner.otherDirection) {
            this.offsetX = this.alignX;
        } else this.offsetX = this.resetOffsetX;
    }

    // damit keine fehler entstehen provisorisch!!
    drawFrame(ctx) {}
    drawOffset(ctx) {}
}
