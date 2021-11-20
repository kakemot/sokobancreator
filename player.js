class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.type = "player";
    }

    display() {
        image(this.sprite, this.x, this.y);
    }

    hasCollisions(x, y) {
        let willCollide = false;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == "block") {
                if (objects[i].x == x && objects[i].y == y) {
                    willCollide = true;
                }
            }
            if (objects[i].type == "crate") {
                let crateIsRestricted = objects[i].hasCollisions(objects[i].x + x - this.x, objects[i].y + y - this.y);
                if (objects[i].x == x && objects[i].y == y && !crateIsRestricted) {
                    //move crate if player is touching it and it is free to move
                        objects[i].x += x - this.x;
                        objects[i].y += y - this.y;
                    } else if (objects[i].x == x && objects[i].y == y && crateIsRestricted) {
                        willCollide = true;
                    }
              }
        }
        return willCollide;
          }

    move(keyCode) {
        if (keyCode == UP_ARROW && !this.hasCollisions(this.x, this.y-32)) {
            this.y -= 32;
        }

        if (keyCode == DOWN_ARROW && !this.hasCollisions(this.x, this.y+32)) {
            this.y += 32;
        }

        if (keyCode == LEFT_ARROW && !this.hasCollisions(this.x-32, this.y)) {
            this.x -= 32;
        }

        if (keyCode == RIGHT_ARROW && !this.hasCollisions(this.x+32, this.y)) {
            this.x += 32;
        }
    }
}