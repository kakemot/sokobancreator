let playerSprite;
let blockSprite;
let crateSprite;
let player;
let blocks = [];
let crates = [];

function preload() {
  playerSprite = loadImage('img/SlightlySmilingFace.png');
  blockSprite = loadImage('img/DarkStoneBlock.png');
  crateSprite = loadImage('img/WoodCrate.png');
}

function setup() {
  createCanvas(256, 256);
  player = new Player(playerSprite, 16, 16);

  blocks.push(new Block(blockSprite, 0, 0));
  blocks.push(new Block(blockSprite, 16, 0));
  blocks.push(new Block(blockSprite, 128, 128));
  crates.push(new Crate(crateSprite, 64, 64));
}

function draw() {
  background('#222222');
  player.display();

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].display();
  }

  for (let i = 0; i < crates.length; i++) {
    crates[i].display();
  }
}

function keyPressed() {
    player.move(keyCode);
}