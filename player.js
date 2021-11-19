class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }

    hasCollisions(x, y) {
        let willCollide = false;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].x == x && blocks[i].y == y) {
                willCollide = true;
            }
          }

          for (let i = 0; i < crates.length; i++) {
              let crateIsRestricted = crates[i].hasCollisions(crates[i].x + x - this.x, crates[i].y + y - this.y);
            if (crates[i].x == x && crates[i].y == y && !crateIsRestricted) {
                //move crate if player is touching it and it is free to move
                    crates[i].x += x - this.x;
                    crates[i].y += y - this.y;
                } else if (crates[i].x == x && crates[i].y == y && crateIsRestricted) {
                    willCollide = true;
                }
          }

          return willCollide;
    }

    move(keyCode) {
        if (keyCode == UP_ARROW && !this.hasCollisions(this.x, this.y-16)) {
            this.y -= 16;
        }

        if (keyCode == DOWN_ARROW && !this.hasCollisions(this.x, this.y+16)) {
            this.y += 16;
        }

        if (keyCode == LEFT_ARROW && !this.hasCollisions(this.x-16, this.y)) {
            this.x -= 16;
        }

        if (keyCode == RIGHT_ARROW && !this.hasCollisions(this.x+16, this.y)) {
            this.x += 16;
        }
    }
}