/**
 * Shuffles the given deck.
 * @param {string}      fromDeckName  The name of the deck to draw from.
 * @param {string}      toDeckName    The name of the deck to send to.
 */
// dealCardAsActor(actorActingAs, userIDActingAs)
const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';


if (args.length < 2) {
  console.log(`[${gameName}] Error: dealCardAsActor was called with too few arguments:`);
  console.log(`[${gameName}] Requires: dealCardAsActor(actorActingAs, userIDActingAs);`);
  console.log(`[${gameName}] Got: dealCardAsActor(${args.toString()})`);
} else {
  const fromDeckName = args[0];
  const toDeckName = args[1];
  const chatText = args[2];
  const actorActingAs = args[3];
  const userIDActingAs = args[4];
 
  const fromDeck = game.cards.getName(fromDeckName);
  const toDeck = game.cards.getName(toDeckName);
  const fromDeckCards = fromDeck.data.cards;
  if (fromDeckCards.contents.length > 0) {
    const cardId = fromDeckCards.contents[fromDeckCards.contents.length - 1].id;
    let playedCard = await toDeck.draw(fromDeck, 1, {action: "play", chatNotification: false});
    const newFromCount = fromDeck.data.cards.contents.length;
    const newToCount = toDeck.data.cards.contents.length;
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${chatText}</div>
                <div>${fromDeckName} has ${newFromCount} left</div>
                <div>${toDeckName} now has ${newToCount}`,
    });
  } else {
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${fromDeckName} has no more cards!</div>`,
    });    
  }
}
