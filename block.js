class Block {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.type = "block";
    }

    hasCollisions(x, y) {
        //return false;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}

