class Goal {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.type = "goal";
    }

    hasCollisions(x, y) {
        let willCollide = false;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].x == x && objects[i].y == y) {
                willCollide = true;
            }
          }
          return willCollide;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}
