let player;
let items = [];
let objects = [];
let level;
let sprites = [];
let res = 32;
let w = 9;
let h = 14;
let levels = [];
let unlockedGates = 0;
let currentLevel = readLevelFromUrlOrReturnDefaultLevel();
let gameWon = false;

function setup() {
  var canvas = createCanvas(w*res, h*res);
  canvas.parent('canvas-holder');

  textSize(20);

  player = new Player(sprites["player"], 0, 0);
  loadLevel(currentLevel);
}

function loadLevel(id) {
  getLevel(id).then(levelData => {
  gameWon = false;
  objects = [];
  let e = document.getElementById("level-title");
    e.innerHTML = "Level " + levelData.id + ": " + levelData.levelName;
    let levelObjects = levelData.levelContent.split(";");
    for (i = 0; i<levelObjects.length; i++) {
      let entityInformation = levelObjects[i].split(",")
        createObject(entityInformation);
    }
  });
}

function createObject(entityInformation) {
  let entity = entityInformation[0];
  let x = entityInformation[1] * 1;
  let y = entityInformation[2] * 1;
  if (entity != "player") {
    objects.push(new items[entity](sprites[entity], x, y));
  }

  if (entity == "player") {
    player = new Player(sprites[entity], x, y);
  }
}

function draw() {
  background('#222222');

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      image(sprites["floor"], i*res, j*res);
    } 
  }
  
  level = "";
  for (let i = 0; i < objects.length; i++) {
      objects[i].display();
  }
  player.display();
  if (gameWon) {
    background('#000000');
    fill(255, 255, 255);
    text("You made it. Congratulations!", 20, 100);
  }
}

function keyPressed() {
    player.move(keyCode);
}

async function getLevel(levelNumber) {
  //let response = await fetch("https://localhost:7294/api/Levels/Get/" + levelNumber);
  //let data = await response.json();

  let data = {
    levelContent: "block,0,0;block,32,0;block,64,0;block,96,0;block,0,32;block,0,96;block,0,128;block,0,160;block,0,192;block,32,192;block,64,192;block,256,0;block,256,32;block,256,96;block,256,96;block,256,128;block,256,160;block,256,192;block,256,224;block,256,256;block,256,288;block,256,320;block,256,352;block,256,384;block,256,416;block,224,416;block,192,416;block,160,416;block,128,416;block,96,416;block,64,416;block,32,416;block,0,416;block,0,384;block,0,352;block,0,320;block,0,288;block,0,256;block,0,224;block,224,192;block,192,192;crate,96,192;crate,128,192;crate,160,192;block,32,256;block,64,256;block,96,256;block,160,256;block,224,256;block,192,256;block,128,320;block,96,320;block,64,320;block,32,320;block,160,320;goal,192,384;block,128,0;block,160,0;block,192,0;block,224,0;crate,192,64;block,64,64;block,64,96;block,64,128;gateunlocker,32,64;gate,128,256;player,32,32",
    levelName: "Test level"
    }

  return data;
}

function nextLevel() {
  currentLevel ++;
  window.location.href = "index.html?level=" + currentLevel;
}

function previousLevel() {
  currentLevel --;
  window.location.href = "index.html?level=" + currentLevel;
}

function retryLevel() {
  loadLevel(currentLevel);
}

function readLevelFromUrlOrReturnDefaultLevel() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const levelId = urlParams.get('level');
  console.log(levelId);
  return (levelId == null ? "1" : levelId)
}