class Block {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}

