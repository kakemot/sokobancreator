class Gate {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.name = "gate";
        this.type = "block";
        this.locked = true;
    }

    hasCollisions(x, y) {
        //return false;
    }

    display() {
        if (this.locked == false) {
            tint(255,128);
            image(this.sprite, this.x, this.y);
            noTint();
        } else {
            image(this.sprite, this.x, this.y);
        }
        
    }
}

