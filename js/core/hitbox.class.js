class HitBox {

    constructor(offsetX, offsetY, w, h, owner = undefined, mirrorCorrectionX = 0, type = 'default') {
        this.owner = owner;
        
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = w;
        this.height = h;
        this.type = type;

        this.defaultOffsetX = offsetX;
        this.mirroredOffsetX = offsetX - mirrorCorrectionX;
        
        this.initialCollisionRegister();
    }

    onCollision(other) {
        if (this.type === 'character' && other.type === 'enemy') {
            this.owner.hit(10);
        }
        
        if (this.type === 'sword' && other.type === 'enemy') {
            other.owner.hit(20);
        }
        
        if (this.type === 'attackArea' && other.type === 'character') {
            other.owner.hit(20);
        }

        if (this.type === 'projectile' && other.type === 'character') {
            other.owner.hit(40);
            this.owner.detonate();
        }        
    }

    initialCollisionRegister() {
        if (this.type !== 'sword' && this.type !== 'attackArea') {
            COLLISION_MANAGER.addObject(this);
        }
    }

    addToCollisionList() {
        COLLISION_MANAGER.addObject(this);
    }

    removeFromCollisionList(afterTime = 0) {
        setTimeout(() => {
            COLLISION_MANAGER.removeObject(this);
        }, afterTime);
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
            this.offsetX = this.mirroredOffsetX;
        } else this.offsetX = this.defaultOffsetX;
    }
    
    draw(ctx) {}
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}
