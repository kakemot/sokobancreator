let playerSprite;
let blockSprite;
let crateSprite;
let floorSprite;
let player;
let blocks = [];
let crates = [];
let objects = [];
let level = "player,32,64;block,0,0;block,32,0;block,128,128;crate,64,64";
const levelObjects = level.split(";");

function preload() {
  playerSprite = loadImage('img/1.png');
  blockSprite = loadImage('img/2.png');
  floorSprite = loadImage('img/3.png');
  crateSprite = loadImage('img/4.png');
}

function setup() {
  createCanvas(256, 256);

  for (i = 0; i<levelObjects.length; i++) {
    let entityInformation = levelObjects[i].split(",")
      createObject(entityInformation);
  }

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

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      image(floorSprite, i*32, j*32);
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