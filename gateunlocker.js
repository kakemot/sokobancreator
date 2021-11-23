class GateUnlocker {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.name = "gateunlocker";
        this.type = "no-collide";
    }

    unlockGates() {
        for (i = 0; i < objects.length; i++) {
            if (objects[i].name == "gate") {
                objects[i].locked = false;
                objects[i].type = "no-collide";
            }
        }
    }

    openGates() {
        for (i = 0; i < objects.length; i++) {
            if (objects[i].name == "gate") {
                objects[i].locked = true;
                objects[i].type = "block";
            }
        }
    }

    checkCollisions() {
        this.openGates();
        for (i = 0; i < objects.length; i++) {
            if(objects[i].name != "gateunlocker") {
                if (objects[i].x == this.x && objects[i].y == this.y) {
                    this.unlockGates();
                }
            }
        }
    }

    hasCollisions(x, y) {
        //return false;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}

