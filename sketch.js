let player;
let items = [];
let objects = [];
let level;
let sprites = [];
let res = 32;
let w = 9;
let h = 14;
let levels = [];
let currentLevel = 0;

function preload() {
  items["player"] = Player;
  items["block"] = Block;
  items["crate"] = Crate;
  items["goal"] = Goal;
  sprites["player"] = loadImage('img/1.png');
  sprites["block"] = loadImage('img/2.png');
  sprites["floor"] = loadImage('img/3.png');
  sprites["crate"] = loadImage('img/4.png');
  sprites["goal"] = loadImage('img/goal.png');
}

function setup() {
  var canvas = createCanvas(w*res, h*res);
  canvas.parent('canvas-holder');

  player = new Player(sprites["player"], 0, 0);
  goal = new Goal(sprites["goal"], -200, -200);

  getLevel(1).then(data => {
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
      levels.push(value);
    }
    loadLevel();
  });
}

function loadLevel() {
  objects = [];
  let e = document.getElementById("level-title");
    e.innerHTML = levels[currentLevel].name;
    let levelObjects = levels[currentLevel].world.split(";");
  
    for (i = 0; i<levelObjects.length; i++) {
      let entityInformation = levelObjects[i].split(",")
        createObject(entityInformation);
    }
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

  player.display();
  goal.display();
  level = "";
  for (let i = 0; i < objects.length; i++) {
      objects[i].display();
  }
}

function keyPressed() {
    player.move(keyCode);
}

async function getLevel(levelNumber) {
  let response = await fetch("https://dsokoban-default-rtdb.europe-west1.firebasedatabase.app/level.json?id=1");
  let data = await response.json();
  return data;
}

function nextLevel() {
  currentLevel ++;
  loadLevel();
}

function previousLevel() {
  currentLevel --;
  loadLevel();
}