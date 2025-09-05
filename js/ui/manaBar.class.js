class ManaBar extends DrawableObject {
    constructor(path, x, y, w, h, owner, mirro = 0) {
        super().loadImage(path.border[0])
        this.loadImageSprites(path);
        this.x = owner.x + x;
        this.y = owner.y + y;
        this.width = w;
        this.height = h;
        this.lastStatus = 1;

        this.whiteBorder = new AnimatedEffect(path, 0, 0, 250, 60, this, mirro);
        this.manaLine = new AnimatedEffect(path, 0, 0, 250, 60, this, mirro);
        this.recoverEffect = new AnimatedEffect(path, 0, 22, 15, 15, this, mirro);
        this.fillEffect = new AnimatedEffect(path, 85, 3, 50, 50, this, mirro);

        this.whiteBorder.loadImage(this.IMAGES_BORDER_WHITE[1]);
        this.manaLine.loadImage(this.IMAGES_STATUS[1]);
    }

    render(ctx) {
        this.draw(ctx);
        this.manaLine.draw(ctx);
        this.whiteBorder.draw(ctx);
        this.recoverEffect.draw(ctx);
        this.fillEffect.draw(ctx);
    }

    setMana(amount) {
        this.manaLine.loadImage(this.IMAGES_STATUS[amount]);

        if (amount > this.lastStatus) {
            this.playManaEffect(amount);
        } else this.playFill(amount);

        this.lastStatus = amount;
    }

    emptyEffect() {
        this.whiteBorder.playSpriteOnce(this.IMAGES_BORDER_WHITE, 100);
    }

    playManaEffect(amount) {
        let startPosition = this.recoverEffect.x;
        let endPositon = startPosition + ((100 / 6) * amount);
        this.recoverEffect.playSprite(this.IMAGES_RECOVER, 100);
        let tempInterval = setInterval(() => {
            this.recoverEffect.x += 5;
            if (this.recoverEffect.x >= endPositon) {
                clearInterval(tempInterval);
                this.resetRecoverEffect(startPosition);
                this.playFill(amount);
            }
        }, 50);
    }

    resetRecoverEffect(startPosition) {
        clearInterval(this.recoverEffect.animationInterval);
        this.recoverEffect.loadImage(imgPaths.null[0]);
        this.recoverEffect.x = startPosition;
    }

    playFill(amount) {
        if (amount === 6) {
            this.fillEffect.playSpriteOnce(this.IMAGES_FILL, 100);
        }
    }
}
