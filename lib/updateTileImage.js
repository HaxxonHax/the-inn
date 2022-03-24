/**
 * Updates a Card tile based off its tags.
 * @param {string}       img       The string of the image to update the tile to show
 * @param {string}       slotType  The tag that indicates the type of slot (e.g., "Drink", "Main")
 * @param {string}       slotOwner The tag that indicates the name of the actor that owns the slot
 */

if (typeof args !== 'undefined') {
  const img = args[0];
  const slotType = args[1];
  const slotOwner = args[2];
  console.log(slotType);
  console.log(slotOwner);
  console.log(img);
  const taggedTileDocs = Tagger.getByTag(["Tile",slotType,slotOwner]);
  let updates = await taggedTileDocs.map(i=>({_id:i.id,img:args[0]}));
  canvas.scene.updateEmbeddedDocuments("Tile",updates);
}
