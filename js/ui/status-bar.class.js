class StatusBar extends DrawableObject {
    empty = './assets/sprites/7_statusbars/4_bar_elements/statusbar_empty.png';
    icon;
    color;
    
    x = 20;
    y = 0;
    width = 230;
    height = 60;
    
    
    
    percentage = 100;

    constructor() {
        super().loadImage(imgPaths.statusBar.health[0])
        this.loadImageSprites(imgPaths.statusBar);

        this.setPrecentage(100);
    }
    /*
    blue = 'img/7_statusbars/4_bar_elements/statusbar_blue.png';
    green = 'img/7_statusbars/4_bar_elements/statusbar_green.png';
    orange = 'img/7_statusbars/4_bar_elements/statusbar_orange.png';
    */

    setPrecentage(percentage) {
        this.percentage = percentage;

        if (this.percentage > 80) {
            this.img = this.imageCache[this.IMAGES_HEALTH[5]]
        } else if (this.percentage > 60) {
            this.img = this.imageCache[this.IMAGES_HEALTH[4]]
        } else if (this.percentage > 40) {
            this.img = this.imageCache[this.IMAGES_HEALTH[3]]
        } else if (this.percentage > 20) {
            this.img = this.imageCache[this.IMAGES_HEALTH[2]]
        } else if (this.percentage > 0) {
            this.img = this.imageCache[this.IMAGES_HEALTH[1]]
        } else if (this.percentage >= 0) {
            this.img = this.imageCache[this.IMAGES_HEALTH[0]]
        }
    }


}