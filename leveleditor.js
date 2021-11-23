let player;
let goal;
let items = [];
let sprites = [];
let objects = [];
let res = 32;
let w = 9;
let h = 14;

function setup() {
    var canvas = createCanvas(w*res, h*res);
    canvas.parent('canvas-holder');
    canvas.mouseClicked(addItem);

  player = new Player(sprites["player"], 32, 32);
  goal = new Goal(sprites["goal"], 32, 128);
}

function draw() {
  background('#222222');

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      image(sprites["floor"], i*res, j*res);
    } 
  }
  goal.display();
  for (let i = 0; i < objects.length; i++) {
      objects[i].display();
  }
  player.display();
}

function addItem() {
    let removeItem = false;
    let e = document.getElementById("item-selected");
    let selectedItem = items[e.value];
    console.log(e.value);
    let mx = Math.floor(mouseX / 32) * 32;
    let my = Math.floor(mouseY / 32) * 32;

    for (i = 0; i<objects.length; i++) {
        if (dist(mouseX, mouseY, objects[i].x+(res/2), objects[i].y+(res/2)) < res/2) {
            objects.splice(objects.indexOf(objects[i]), 1);
            removeItem = true;
        }
    }

    if (e.value == "player") {
        player = new Player(sprites["player"], mx, my);
        removeItem = true;
    }

    if (e.value == "goal") {
        goal = new Goal(sprites["goal"], mx, my);
        removeItem = true;
    }

    if (!removeItem) {
        objects.push(new selectedItem(sprites[e.value], mx, my));
    }
  }

function keyPressed() {
    player.move(keyCode);
}

function generateLevel() {
    let level = "";

    for (let i = 0; i < objects.length; i++) {
        level += ";" + objects[i].type + "," + objects[i].x + "," + objects[i].y;
    }
    level += ";" + player.type + "," + player.x + "," + player.y;
    level += ";" + goal.type + "," + goal.x + "," + goal.y;
    return level.substring(1);
}

function uploadLevel() {
    let world = generateLevel();
    let name = document.getElementById("level-name").value;

    let data = {
            name: name,
            world: world
      }
    console.log(data);
    fetch('https://dsokoban-default-rtdb.europe-west1.firebasedatabase.app/level.json', {
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}