let playerSprite;
let blockSprite;
let crateSprite;
let floorSprite;
let player;
let blocks = [];
let crates = [];
let objects = [];
let level;
let res = 32;
let w = 9;
let h = 14;

function preload() {
  playerSprite = loadImage('img/1.png');
  blockSprite = loadImage('img/2.png');
  floorSprite = loadImage('img/3.png');
  crateSprite = loadImage('img/4.png');
}

function setup() {
  var canvas = createCanvas(w*res, h*res);
  canvas.parent('canvas-holder');

  getLevel(1).then(data => {
    console.log(data);
    let levelObjects = data.split(";");

    for (i = 0; i<levelObjects.length; i++) {
      let entityInformation = levelObjects[i].split(",")
        createObject(entityInformation);
    }
  });

  player = new Player(playerSprite, 32, 32);
}

function createObject(entityInformation) {
  
  if (entityInformation[0] == "block") {
    objects.push(new Block(blockSprite, entityInformation[1], entityInformation[2]));
  }

  if (entityInformation[0] == "crate") {
    objects.push(new Crate(crateSprite, entityInformation[1]*1, entityInformation[2]*1));
  }
}

function draw() {
  background('#222222');

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      image(floorSprite, i*res, j*res);
    } 
  }

  player.display();
  level = "";
  for (let i = 0; i < objects.length; i++) {
    
      //level += ";" + objects[i].type + "," + objects[i].x + "," + objects[i].y;
    
      objects[i].display();
  }
  //console.log(level);
}

function keyPressed() {
    player.move(keyCode);
}

async function getLevel(levelNumber) {
  let response = await fetch("https://dsokoban-default-rtdb.europe-west1.firebasedatabase.app/level/" + levelNumber + ".json");
  let data = await response.json();
  return data;
}