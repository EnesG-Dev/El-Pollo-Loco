class AnimatedEffect extends DrawableObject {
    constructor(path, x, y, w, h, owner) {
        super().loadImage(imgPaths.null[0])
        this.loadImageSprites(path);
        this.x = owner.x + x;
        this.y = owner.y + y;
        this.width = w;
        this.height = h;
    }
}
