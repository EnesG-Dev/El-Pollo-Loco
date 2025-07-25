class AnimatedEffect extends DrawableObject {
    constructor(path, x, y, w, h, owner, mirro = 0) {
        super().loadImage(imgPaths.null[0])
        this.loadImageSprites(path);
        this.x = owner.x + x + mirro;
        this.y = owner.y + y;
        this.width = w;
        this.height = h;
    }
}
