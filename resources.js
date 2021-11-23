function preload() {
    items["player"] = Player;
    items["block"] = Block;
    items["crate"] = Crate;
    items["goal"] = Goal;
    items["gate"] = Gate;
    items["gateunlocker"] = GateUnlocker;
    sprites["player"] = loadImage('img/1.png');
    sprites["block"] = loadImage('img/2.png');
    sprites["floor"] = loadImage('img/3.png');
    sprites["crate"] = loadImage('img/4.png');
    sprites["goal"] = loadImage('img/goal.png');
    sprites["gate"] = loadImage('img/bluewall.png');
    sprites["gateunlocker"] = loadImage('img/gateunlocker.png');
  }