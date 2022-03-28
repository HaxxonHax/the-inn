/**
 * Shuffles the given deck.
 * @param {string}      fromDeckName   The name of the deck to draw from.
 * @param {string}      toDeckName     The name of the deck to send to.
 * @param {string}      chatText       The text to send to Chat.
 * @param {string}      actorActingAs  The name of the actor that is requesting the deal.
 * @param {string}      userActingAs The id of the user that is requesting the deal.
 * @param {int}         numCards       The number of cards to deal.
 */
// dealCardAsActor(actorActingAs, userActingAs, chatText, actorActingAs, userActingAs)
// Macro Name: Deal Card As Actor
// Run As GM: true
// Has Widget: false

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

console.log(`${gameName} | Deal Card As Actor`);

let numCards = 1;
let chatText = '';

if (args.length < 2) {
  console.log(`${gameName} | Error: dealCardAsActor was called with too few arguments:`);
  console.log(`${gameName} | Requires: dealCardAsActor(actorActingAs, userActingAs, chatText, actorActingAs, userActingAs);`);
  console.log(`${gameName} | Got: dealCardAsActor(${args.toString()})`);
} else {
  if (args.length > 5) numCards = args[5];
  const fromDeckName = args[0];
  const toDeckName = args[1];
  const chatText = args[2];
  const actorActingAs = args[3];
  const userActingAs = args[4];
 
  const fromDeck = game.cards.getName(fromDeckName);
  const toDeck = game.cards.getName(toDeckName);
  const fromDeckCards = fromDeck.data.cards;
  if (fromDeckCards.contents.length > 0) {
    const cardId = fromDeckCards.contents[fromDeckCards.contents.length - 1].id;
    if (fromDeckCards.contents.length < numCards) numCards = fromDeckCards.contents.length;
    let playedCard = await toDeck.draw(fromDeck, numCards, {action: "play", chatNotification: false});
    const newFromCount = fromDeck.data.cards.contents.length;
    const newToCount = toDeck.data.cards.contents.length;
    ChatMessage.create({
      user: userActingAs,
      content: `<div>${chatText}</div>
                <div>${fromDeckName} has ${newFromCount} left</div>
                <div>${toDeckName} now has ${newToCount}`,
    });
  } else {
    ChatMessage.create({
      user: userActingAs,
      content: `<div>${fromDeckName} has no more cards!</div>`,
    });
  }
}
