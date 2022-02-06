class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.name = "player";
        this.type = "player";
    }

    display() {
        image(this.sprite, this.x, this.y);
    }

    hasCollisions(x, y, dirX, dirY) {
        let willCollide = false;
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].type == "block") {
                if (objects[i].x == x && objects[i].y == y) {
                    willCollide = true;
                }
            }
            if (objects[i].type == "crate") {
                //let crateIsRestricted = objects[i].hasCollisions(x + dirX, y + dirY);
                if (objects[i].x == x && objects[i].y == y) {
                    //move crate if player is touching it and it is free to move
                        willCollide = objects[i].tryMove(dirX, dirY);
                    //} else if (objects[i].x == x && objects[i].y == y && crateIsRestricted) {
                        //willCollide = true;
                }
            }
        }
        return willCollide;
    }

    checkForVictory() {
        if (this.x == goal.x && this.y == goal.y) {
            gameWon = true;
            objects = [];
        }
    }

    checkOutsideBounds(keyCode, newX, newY) {
        if (keyCode == UP_ARROW) {
            if (newY < 0) {
                return (h*res) - 32;
            } else {
                return newY;
            }
        }

        if (keyCode == DOWN_ARROW) {
            if (newY >= h*res) {
                return 0;
            } else {
                return newY;
            }
        }

        if (keyCode == RIGHT_ARROW) {
            if (newX >= w*res) {
                return 0;
            } else {
                return newX;
            }
        }

        if (keyCode == LEFT_ARROW) {
            if (newX < 0) {
                return (w*res) - 32;
            } else {
                return newX;
            }
        }
    }

    checkIfGateIsUnlocked() {
        let gateUnlockers = objects.filter(x => x.name == "gateunlocker");
        for (let i = 0; i < gateUnlockers.length; i++) {
            if(gateUnlockers[i].name == "gateunlocker") {
                gateUnlockers[i].checkCollisions();
            }
        }
    }

    move(keyCode) {
        if (keyCode == UP_ARROW) {
            let wantToGoToY = this.checkOutsideBounds(keyCode, 0, this.y - 32);
            if (!this.hasCollisions(this.x, wantToGoToY, 0, -32)) {
                this.y = wantToGoToY;
            }
        }

        if (keyCode == DOWN_ARROW) {
            let wantToGoToY = this.checkOutsideBounds(keyCode, 0, this.y + 32);
            if (!this.hasCollisions(this.x, wantToGoToY, 0, 32)) {
                this.y = wantToGoToY;
            }
        }

        if (keyCode == LEFT_ARROW) {
            let wantToGoToX = this.checkOutsideBounds(keyCode, this.x-32, 0);
            if (!this.hasCollisions(wantToGoToX, this.y, -32, 0)) {
                this.x = wantToGoToX;
            }
        }

        if (keyCode == RIGHT_ARROW) {
            let wantToGoToX = this.checkOutsideBounds(keyCode, this.x+32, 0);
            if (!this.hasCollisions(wantToGoToX, this.y, 32, 0)) {
                this.x = wantToGoToX;
            }
        }

    this.checkForVictory();
    this.checkIfGateIsUnlocked();
    }
}