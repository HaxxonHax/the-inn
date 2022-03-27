/**
 * Shuffles the given deck.
 * @param {object} deckName  The name of the deck to shuffle.
 * @returns Promise          All macros return promise.
 */

// shuffleDeck(deckName)
let gameName = "The Inn";

if (args.length < 1) {
  console.log(`${gameName} | Error: shuffleDeck was called with too few arguments:`);
  console.log(`${gameName} | Requires: shuffleDeck(deckName);`);
  console.log(`${gameName} | Got: shuffleDeck(${args.toString()});`);
} else {
  const deckName = args[0];
  const deckInstance = game.cards.getName(deckName);
  await deckInstance.shuffle();
}
