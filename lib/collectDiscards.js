/**
 * Collects discards for a pile
 * @param {string}   deckName         The name of the deck to collect for (e.g. "The Inn Drink Deck").
 * @param {string}   discardPileName  The name of the deck to collect for (e.g. "The Inn Drink Discard").
 */

// collectDiscards(deckName, discardPileName)
// Macro Name: Collect Discards
// Run As GM: true
// Has Widget: false

if (args.length < 2) {
  console.log("Error: collectDiscards was called with too few arguments:");
  console.log("Requires: collectDiscards(deckName, discardPileName);");
  console.log("Got: collectDiscards(" + args.toString() + ");");
} else {
  const deckName = args[0];
  const discardPileName = args[1];
  const deckInstance = game.cards.getName(deckName);
  const discardInstance = game.cards.getName(discardPileName);
  const passFromCount = discardInstance.data.cards.contents.length;
  if (passFromCount > 0) {
    const passedCards = await discardInstance.deal([deckInstance], passFromCount, {down: false, how: 2});
  }
}
