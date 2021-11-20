let playerSprite;
let blockSprite;
let crateSprite;
let floorSprite;
let player;
let blocks = [];
let crates = [];
let objects = [];
let level = "player,32,64;block,0,0;block,32,0;block,128,128;crate,64,64;block,64,0;block,96,0;block,128,0;block,160,0;block,192,0;block,224,0;block,256,0;block,288,0;block,288,32;block,288,64;block,288,96;block,288,128;block,288,160;block,288,192;block,288,224;block,288,256;block,288,288;block,256,288;block,224,288;block,192,288;block,160,288;block,128,288;block,96,288;block,64,288;block,32,288;block,0,288;block,0,256;block,0,224;block,0,192;block,0,160;block,0,128;block,0,96;block,0,64;block,0,32;block,160,128";
const levelObjects = level.split(";");

function preload() {
  playerSprite = loadImage('img/1.png');
  blockSprite = loadImage('img/2.png');
  floorSprite = loadImage('img/3.png');
  crateSprite = loadImage('img/4.png');
}

function setup() {
  var canvas = createCanvas(320, 320);
  canvas.parent('canvas-holder');


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

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
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