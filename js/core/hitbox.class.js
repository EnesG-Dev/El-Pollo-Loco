class HitBox {
    constructor(offsetX, offsetY, w, h, owner = undefined, mirrorCorrectionX = 0, type = 'default') {
        this.owner = owner;

        if (owner == undefined) {
            this.x = offsetX;
            this.y = offsetY;
        }
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
            if (this.isTopDemage(other)) {
                AUDIO_MANAGER.playEffectSound('effects_headJump');
                this.owner.speedY = 10;
                other.owner.hit(100);
            } else {
                this.owner.hit(10);
            }
        }

        if (this.type === 'character' && other.type === 'boss') {
            this.owner.hit(10);
        }

        if (this.type === 'cast' && (other.type === 'enemy' || other.type === 'boss')) {
            AUDIO_MANAGER.playEffectSound('enemy_hurt');
            this.owner.detonate();
            other.owner.hit(30);
        }

        if (this.type === 'sword' && (other.type === 'enemy' || other.type === 'boss')) {
            AUDIO_MANAGER.playEffectSound('enemy_hurt');
            other.owner.hit(20);
        }

        if (this.type === 'attackArea' && other.type === 'character') {
            other.owner.hit(10);
        }

        if (this.type === 'projectile' && other.type === 'character') {
            other.owner.hit(40);
            this.owner.detonate();
        }

        if (this.type === 'coin' && other.type === 'character') {
            other.owner.updateScore(100);
            this.owner.takeItem();
        }

        if (this.type === 'gem' && other.type === 'character') {
            other.owner.updateMana();
            this.owner.takeItem();
        }

        if (this.type === 'default' && other.type === 'character') {
            other.owner.hit(10);
            other.owner.speedY = 10;
        }
    }

    isTopDemage(other) {
        const verticalOverlap = this.y + this.height <= other.y + other.height * 0.5;
        const isFalling = this.owner.speedY < 0;
        return verticalOverlap && isFalling;
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
        if (this.owner !== undefined) {

            this.alignmentCorrection();

            if (this.owner) {
                this.x = this.owner.x + this.offsetX;
                this.y = this.owner.y + this.offsetY;
            } else {
                this.x = this.offsetX;
                this.y = this.offsetY;
            }
        }
    }

    alignmentCorrection() {
        if (this.owner.otherDirection) {
            this.offsetX = this.mirroredOffsetX;
        } else this.offsetX = this.defaultOffsetX;
    }

    draw(ctx) { }
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}
