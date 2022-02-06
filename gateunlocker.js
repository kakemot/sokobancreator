class GateUnlocker {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.name = "gateunlocker";
        this.type = "no-collide";
        this.unlocked = false;
    }

    toggleGates() {
        let gateUnlockers = objects.filter(x => x.name=="gateunlocker");
        let numberOfGateUnlockers = gateUnlockers.length;
        let numberOfOpenedGates = gateUnlockers.filter(x => x.unlocked == true).length;
        if (numberOfOpenedGates == numberOfGateUnlockers) {
            this.unlockGates();
        } else {
            this.lockGates();
        }
    }

    unlockGates() {
        let gates = objects.filter(x => x.name=="gate");
        let negativegates = objects.filter(x => x.name=="gatenegative");
        for (i = 0; i < gates.length; i++) {
                gates[i].locked = false;
                gates[i].type = "no-collide";
        }

        for (i = 0; i < negativegates.length; i++) {
            negativegates[i].locked = true;
            negativegates[i].type = "block";
        }
    }

    lockGates() {
        let gates = objects.filter(x => x.name=="gate");
        let negativegates = objects.filter(x => x.name=="gatenegative");
        for (i = 0; i < gates.length; i++) {
            gates[i].locked = true;
            gates[i].type = "block";
        }

        for (i = 0; i < negativegates.length; i++) {
            negativegates[i].locked = false;
            negativegates[i].type = "no-collide";
        }
    }

    checkCollisions() {
        this.unlocked = false;
        for (i = 0; i < objects.length; i++) {
            if(objects[i].name != "gateunlocker") {
                if (objects[i].x == this.x && objects[i].y == this.y) {
                    this.unlocked = true;
                }
            }
        }
        if (player.x == this.x && player.y == this.y) {
            this.unlocked = true;
        }
        this.toggleGates();
    }

    hasCollisions(x, y) {
        //return false;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }
}

