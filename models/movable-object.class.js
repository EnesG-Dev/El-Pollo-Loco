class MovableObject {
    x = 120;
    y = 250;
    img;


    loadImage(path) {
        this.img = new Image(); // this.image = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        
    }
}