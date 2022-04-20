/**
 * Creates drawings that house character stats on the scene within the game.
 */
// createStatsOnScene()
// Macro Name: Create Stats On Scene
// Run As GM: false
// Has Widget: false

let author = this.data.author;

let drawingInfo = {
  author: author,
  text: "Alcohol: 0",
  width: 350,
  height: 75,
  x: 2213,
  y: 1350,
  flags: {
    "tagger": {
        "tags": ["Pash", "Alcohol", "Test"]
    },
  }
}


async function createPlayerStatDrawing(statType, statStartValue, tileX, tileY, paddingX, paddingY, numColumns, drawingData) {
  // Create the tiles for player cards and stats
  let playerCharacters = game.users.filter(d=>d.hasPlayerOwner === true).map(d=>d.character.name);
  const initialX = tileX;
  const initialY = tileX;


  for (var i=0; i< playerCharacters.length; i++) {
    let tileTags = ["Text", "Stats", statType, playerCharacters[i]];
    let existingTiles = Tagger.getByTag(tileTags);
    if (existingTiles.length === 0) {
      drawingData.text = `${statType}: ${statStartValue}`;
      if (statType === "Name") drawingData.text = playerCharacters[i];
      drawingData.flags.tagger.tags = tileTags;
      drawingData.x = tileX;
      drawingData.y = tileY;
      await DrawingDocument.createDocuments([drawingData], {parent: canvas.scene});
    }
    if (Math.floor(tileX - initialX) / paddingX === numColumns - 1) {
      tileY = tileY + paddingY;
      tileX = initialX;
    } else {
      tileX = tileX + paddingX;
    }
  }
}


await createPlayerStatDrawing("Alcohol", 0, 2213, 1350, 750, 850, 3, drawingInfo);
await createPlayerStatDrawing("Fortitude", 20, 2563, 1350, 750, 850, 3, drawingInfo);
await createPlayerStatDrawing("Drinks", 0, 2213, 1425, 725, 850, 3, drawingInfo);
await createPlayerStatDrawing("Gold", 10, 2550, 1425, 725, 850, 3, drawingInfo);
await createPlayerStatDrawing("Name", "name", 2450, 1475, 725, 850, 3, drawingInfo);

let tileTags = ["Drawing", "Text", "Gold", "Pot", "Stats", "Global"];
let existingTiles = Tagger.getByTag(tileTags);
if (existingTiles.length === 0) {
  drawingInfo.flags.tagger.tags = tileTags;
  drawingInfo.x = 1725;
  drawingInfo.y = 1388;
  drawingInfo.text = "Pot: 0";
  drawingInfo.width = 350;
  drawingInfo.height = 75;
  await DrawingDocument.createDocuments([drawingInfo], {parent: canvas.scene})
}
