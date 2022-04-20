/**
 * Creates the card tiles that house played cards within the game.
 */
// createCardsOnScene()
// Macro Name: Create Cards On Scene
// Run As GM: false
// Has Widget: false

let tileInfo = {
  img: "",
  width: 300,
  height: 450,
  x: 1600,
  y: 800,
  flags: {
    "tagger": {
        "tags": []
    },
  }
}


async function createPlayerCardTile(cardType, tileX, tileY, paddingX, paddingY, numColumns) {
  // Create the tiles for player cards and stats
  let playerCharacters = game.users.filter(d=>d.hasPlayerOwner === true).map(d=>d.character.name);
  const initialX = tileX;
  const initialY = tileY;

  for (var i=0; i< playerCharacters.length; i++) {
    let tileTags = ["Tile", cardType, playerCharacters[i]];
    let existingTiles = Tagger.getByTag(tileTags);
    if (existingTiles.length === 0) {
      tileInfo.img = "cards/dark-gold/clubs-ace.webp";
      tileInfo.flags.tagger.tags = tileTags;
      tileInfo.x = tileX;
      tileInfo.y = tileY;
      await TileDocument.createDocuments([tileInfo], {parent: canvas.scene});
    }
    if (Math.floor(tileX - initialX) / (tileInfo.width + paddingX) === numColumns - 1) {
      tileY = tileY + tileInfo.height + paddingY;
      tileX = initialX;
    } else {
      tileX = tileX + tileInfo.width + paddingX;
    }
  }
}


await createPlayerCardTile("Play", 2250, 800, 150 + tileInfo.width, 400, 3);
await createPlayerCardTile("Drink", 2250 + 20 + tileInfo.width, 800, 150 + tileInfo.width, 400, 3);
