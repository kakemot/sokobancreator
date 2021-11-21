class Crate {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.type = "crate";
    }

    tryMove(x, y) {
        let wrap = this.checkOutsideBounds(this.x + x, this.y + y);
        let blockedPath = false;
        for (let i = 0; i < objects.length; i++) {
                if (objects[i].x == this.x + x && objects[i].y == this.y + y) {
                    blockedPath = true;
                }

                if (objects[i].x == wrap.x && objects[i].y == wrap.y) {
                    blockedPath = true;
                }   
        }
        if (!blockedPath) {
            this.move(x, y);
        }
    return blockedPath;
}

    move(x,y) {
        this.x += x;
        this.y += y;
        this.wrapAround();
    }

    checkOutsideBounds(x, y) {
        let coords = {x: x, y: y};
        if (x >= w*res) {
            coords.x = 0;
        }

        if (x < 0) {
            coords.x = (w*res) - 32;
        }

        if (y >= h*res) {
            coords.y = 0;
        }

        if (y < 0) {
            coords.y = (h*res) - 32;
        }
        return coords;
    }

    wrapAround() {
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
