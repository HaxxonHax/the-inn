/**
 * Creates the buttons for players to interact with the game.
 */
// createButtonsOnScene()
// Macro Name: Create Buttons On Scene
// Run As GM: false
// Has Widget: false

const buttonInstances = [
  {
    macroName: "Shuffle Character Deck",
    img: "Tiles/buttons/shuffle-my-deck-Button-PNG-Picture.png",
    tags: [ "Button", "Shuffle", "Character", "Test" ],
  },
  {
    macroName: "Shuffle Drinks",
    img: "Tiles/buttons/shuffle-drink-deck-Button-PNG-Picture.png",
    tags: [ "Button", "Shuffle", "Drink", "Tavern", "Test" ],
  },
  {
    macroName: "View My Cards",
    img: "Tiles/buttons/view-my-cards-Button-PNG-Picture.png",
    tags: [ "Button", "Hand", "Character", "Test" ],
  },
  {
    macroName: "Order A Drink",
    img: "Tiles/buttons/order-a-drink-Button-PNG-Picture.png",
    tags: [ "Button", "Draw", "Tavern", "Drink", "Test" ],
  },
  {
    macroName: "Draw Cards",
    img: "Tiles/buttons/draw-cards-Button-PNG-Picture.png",
    tags: [ "Button", "Draw", "Character", "Test" ],
  },

  {
    macroName: "Take A Drink",
    img: "Tiles/buttons/take-a-drink-Button-PNG-Picture.png",
    tags: [ "Button", "Play", "Drink", "Tavern", "Test" ],
  },
  {
    macroName: "Play A Card",
    img: "Tiles/buttons/play-a-card-Button-PNG-Picture.png",
    tags: [ "Button", "Play", "Character", "Test" ],
  },
  {
    macroName: "End Turn",
    img: "Tiles/buttons/end-turn-Button-PNG-Picture.png",
    tags: [ "Button", "End", "Turn", "Character", "Test" ],
  },
  {
    macroName: "Gambling",
    img: "Tiles/buttons/gambling-Button-PNG-Picture.png",
    tags: [ "Button", "Gold", "Pot", "Global", "Test" ],
  },
  {
    macroName: "Pay Gold",
    img: "Tiles/buttons/pay-gold-Button-PNG-Picture.png",
    tags: [ "Button", "Gold", "Character", "Tavern", "Test" ],
  },
]

let tileInfo = {
  img: "",
  width: 300,
  height: 128,
  x: 1600,
  y: 800,
  flags: {
    "tagger": {
        "tags": []
    },
    "monks-active-tiles": {
      "active": true,
      "record": false,
      "restriction": "all",
      "controlled": "all",
      "trigger": "click",
      "pointer": true,
      "pertoken": false,
      "minrequired": 0,
      "chance": 100,
      "actions": [{
        "action": "runmacro",
        "data": {
            "macroid": "",
            "args": "",
            "runasgm": "player"
        }
      }]
    }
  }
}

const initTileX = 1600;
const initTileY = 800;
let tileX = initTileX;
let tileY = initTileY;

for (var i=0; i < buttonInstances.length; i++) {
  let existingTiles = Tagger.getByTag(buttonInstances[i].tags);
  if (existingTiles.length === 0) {
    const macroInstance = game.macros.getName(buttonInstances[i].macroName);
    tileInfo.img = buttonInstances[i].img;
    tileInfo.flags.tagger.tags = buttonInstances[i].tags;
    tileInfo.flags["monks-active-tiles"].actions[0].data.macroid = macroInstance.id;
    tileInfo.x = tileX;
    tileInfo.y = tileY;
    let tileDataDoc = await TileDocument.createDocuments([tileInfo], {parent: canvas.scene});
    if (tileX === initTileX + tileInfo.width - 10) {
      tileY = tileY + tileInfo.height - 10;
      tileX = initTileX;
    } else {
      tileX = tileX + tileInfo.width - 10;
    }
  }
}
