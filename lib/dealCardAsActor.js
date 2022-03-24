/**
 * Shuffles the given deck.
 * @param {string}      fromDeckName  The name of the deck to draw from.
 * @param {string}      toDeckName    The name of the deck to send to.
 */
// dealCardAsActor(fromDeckName, toDeckName, chatText, actorActingAs, userIDActingAs)

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
 
  const fromDeck = game.cards.getName(fromDeckName);
  const discardDeck = game.cards.getName(toDeckName);
  const fromDeckCards = fromDeck.data.cards;
  if (fromDeckCards.contents.length > 0) {
    const cardId = fromDeckCards.contents[fromDeckCards.contents.length - 1].id;
    let playedCard = await discardDeck.draw(fromDeck, 1, {action: "play", chatNotification: false});
    const newCount = fromDeck.data.cards.contents.length;
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${chatText}</div><div>New Count: ${newCount}</div>`,
    });
  } else {
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${fromDeckName} has no more cards!</div>`,
    });    
  }
}



if (args.length < 3) {
  console.log("Error: dealCardAsActor was called with too few arguments:");
  console.log("Requires: dealCardAsActor(actorDeckName, drawDeckName, chatText, actorActingAs);");
  console.log("Got: dealCardAsActor(" + args.toString() + ")");
} else {
  const playerDeckName = args[0];
  const drawDeckName = args[1];
  const chatText = args[2];
  const actorActingAs = args[3];
  const playerDeck = game.cards.getName(playerDeckName);
  const drawDeck = game.cards.getName(drawDeckName);
  const drawDeckCards = drawDeck.data.cards;
  if (drawDeckCards.contents.length > 0) {
    const cardId = drawDeckCards.contents[drawDeckCards.contents.length - 1].id;
    let drawnCard = await drawDeck.deal([playerDeck], 1, {chatNotification: false});
    const newCount = playerDeck.data.cards.contents.length;
    ChatMessage.create({
      user: game.user,
      content: `<div>` + chatText + `</div><div>New Count: ` + newCount + `</div>`,
    });
  }
}
