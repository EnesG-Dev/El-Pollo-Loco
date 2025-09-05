class ManaBar extends DrawableObject {
    constructor(path, x, y, w, h, owner, mirro = 0) {
        super().loadImage(path.border[0])
        this.loadImageSprites(path);
        this.x = owner.x + x;
        this.y = owner.y + y;
        this.width = w;
        this.height = h;

        this.whiteBorder = new AnimatedEffect(path, 0, 0, 250, 60, this, mirro);
        this.manaLine = new AnimatedEffect(path, 0, 0, 250, 60, this, mirro);

        this.whiteBorder.loadImage(this.IMAGES_BORDER_WHITE[1]);
        this.manaLine.loadImage(this.IMAGES_STATUS[3]);

    }
    
    emptyEffect() {
        this.whiteBorder.playSpriteOnce(this.IMAGES_BORDER_WHITE, 100);
    }

    render(ctx) {
        this.draw(ctx);
        this.manaLine.draw(ctx);
        this.whiteBorder.draw(ctx);
    }

    update() {
        this.setMana();
    }

    setMana(amount) {
        amount = Math.max(0, Math.min(amount, 6));
        this.manaLine.loadImage(this.IMAGES_STATUS[amount]);
    }
}
