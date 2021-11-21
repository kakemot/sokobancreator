class Crate {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.type = "crate";
    }

    move(x,y) {
        this.x += x;
        this.y += y;
        this.checkOutsideBounds();
    }

    checkOutsideBounds() {
        if (this.x >= w*res) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = (w*res) - 32;
        }

        if (this.y >= h*res) {
            this.y = 0;
        }

        if (this.y < 0) {
            this.y = (h*res) - 32;
        }

    }

    hasCollisions(x, y) {
        let willCollide = false;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].x == x && objects[i].y == y) {
                willCollide = true;
            }
          }

          if (goal.x == x && goal.y == y) {
            willCollide = true;
        }
          return willCollide;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}
