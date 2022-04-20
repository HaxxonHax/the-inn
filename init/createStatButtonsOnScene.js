/**
 * Creates the stat buttons that for players to interact with adjusting their stats.
 */
// createStatButtonsOnScene()
// Macro Name: Create Stat Buttons On Scene
// Run As GM: false
// Has Widget: false

const macroInstance = game.macros.getName("Update My Stat");


let tileInfo = {
  img: "Tiles/buttons/arrow-27-xxl.png",
  width: 100,
  height: 100,
  x: 2300,
  y: 1250,
  rotation: 0,
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
            "macroid": macroInstance.id,
            "args": "",
            "runasgm": "player"
        }
      }]
    },
  }
}


async function createPlayerStatButton(statTypes, tileX, tileY, paddingX, paddingY, numColumns, tileData) {
  // Create the tiles for player cards and stats
  let playerCharacters = game.users.filter(d=>d.hasPlayerOwner === true).map(d=>d.character.name);
  const initialX = tileX;
  const initialY = tileX;

  for (var i=0; i< playerCharacters.length; i++) {
    let tileTags = ["Tile", ...statTypes, playerCharacters[i]];
    let existingTiles = Tagger.getByTag(tileTags);
    if (existingTiles.length === 0) {
      tileData.flags.tagger.tags = tileTags;
      tileData.x = tileX;
      tileData.y = tileY;
      await TileDocument.createDocuments([tileData], {parent: canvas.scene});
    }
    if (Math.floor(tileX - initialX) / paddingX === numColumns - 1) {
      tileY = tileY + paddingY;
      tileX = initialX;
    } else {
      tileX = tileX + paddingX;
    }
  }
}


tileInfo.flags["monks-active-tiles"].actions[0].data.args = "Alcohol -1";
tileInfo.rotation = 180;
await createPlayerStatButton(["Alcohol", "Decrement"], 2300, 1250, 750, 850, 3, tileInfo);
tileInfo.flags["monks-active-tiles"].actions[0].data.args = "Alcohol 1";
tileInfo.rotation = 0;
await createPlayerStatButton(["Alcohol", "Increment"], 2400, 1250, 750, 850, 3, tileInfo);

tileInfo.flags["monks-active-tiles"].actions[0].data.args = "Fortitude -1";
tileInfo.rotation = 180;
await createPlayerStatButton(["Fortitude", "Decrement"], 2600, 1250, 750, 850, 3, tileInfo);
tileInfo.flags["monks-active-tiles"].actions[0].data.args = "Fortitude 1";
tileInfo.rotation = 0;
await createPlayerStatButton(["Fortitude", "Increment"], 2700, 1250, 750, 850, 3, tileInfo);
