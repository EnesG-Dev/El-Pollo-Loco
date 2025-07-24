class ManaBar extends DrawableObject {
    constructor(path, x, y, w, h, owner) {
        super().loadImage(path.border[0])
        this.loadImageSprites(path);
        this.x = owner.x + x;
        this.y = owner.y + y;
        this.width = w;
        this.height = h;

        this.manaLine = new AnimatedEffect(path, 0, 0, 250, 60, this);

        this.manaLine.loadImage(this.IMAGES_AMOUNT[3])
    }

    render(ctx) {
        this.draw(ctx);
        this.manaLine.draw(ctx);
    }

    update() {
        this.setMana();
    }

    setMana(amount) {
        amount = Math.max(0, Math.min(amount, 6));
        this.manaLine.loadImage(this.IMAGES_AMOUNT[amount]);
    }


}
