function preload() {
    items["player"] = Player;
    items["block"] = Block;
    items["crate"] = Crate;
    items["goal"] = Goal;
    items["gate"] = Gate;
    items["gateunlocker"] = GateUnlocker;
    sprites["player"] = loadImage('img/player.png');
    sprites["block"] = loadImage('img/block.png');
    sprites["floor"] = loadImage('img/floor.png');
    sprites["crate"] = loadImage('img/crate.png');
    sprites["goal"] = loadImage('img/goal.png');
    sprites["gate"] = loadImage('img/bluewall.png');
    sprites["gateunlocker"] = loadImage('img/gateunlocker.png');
  }