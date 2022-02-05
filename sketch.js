let player;
let items = [];
let objects = [];
let level;
let sprites = [];
let res = 32;
let w = 9;
let h = 14;
let levels = [];
let currentLevel = readLevelFromUrlOrReturnDefaultLevel();
let gameWon = false;

function setup() {
  var canvas = createCanvas(w*res, h*res);
  canvas.parent('canvas-holder');

  textSize(20);

  player = new Player(sprites["player"], 0, 0);
  goal = new Goal(sprites["goal"], -200, -200);
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
  if (entity != "player" && entity != "goal") {
    objects.push(new items[entity](sprites[entity], x, y));
  }

  if (entity == "player") {
    player = new Player(sprites[entity], x, y);
  }

  if (entity == "goal") {
    goal = new Goal(sprites[entity], x, y);
  }
}

function draw() {
  background('#222222');

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      image(sprites["floor"], i*res, j*res);
    } 
  }
  goal.display();
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
  let response = await fetch("https://sokoban-server-k9xmz.ondigitalocean.app/api/Levels/Get/" + levelNumber);
  let data = await response.json();
  return data;
}

function nextLevel() {
  currentLevel ++;
  loadLevel(currentLevel);
}

function previousLevel() {
  currentLevel --;
  loadLevel(currentLevel);
}

function readLevelFromUrlOrReturnDefaultLevel() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const levelId = urlParams.get('level')
  return (levelId == "" ? "1" : levelId)
}