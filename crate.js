class Crate {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    hasCollisions(x, y) {
        let willCollide = false;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].x == x && blocks[i].y == y) {
                willCollide = true;
            }
          }
          return willCollide;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}

