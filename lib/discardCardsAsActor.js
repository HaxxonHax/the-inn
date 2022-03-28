/**
 * Shuffles the given deck.
 * @param {string}      handName   The name of the deck to draw from.
 * @param {string}      discardDeckName     The name of the deck to send to.
 * @param {array}       idsOfCards     An array of the card IDs to discard.
 * @param {string}      actorActingAs  The name of the actor that is requesting the deal.
 */
// discardCardsAsActor(handName, discardDeckName, idsOfCards, actorActingAsName)
// Macro Name: Deal Cards As Actor
// Run As GM: true
// Has Widget: false

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

console.log(`${gameName} | Discard Cards As Actor`);


if (args.length < 3) {
  console.log(`${gameName} | Error: discardCardsAsActor was called with too few arguments:`);
  console.log(`${gameName} | Requires: discardCardsAsActor(handName, discardDeckName, idsOfCards, actorActingAsName);`);
  console.log(`${gameName} | Got: discardCardsAsActor(${args.toString()})`);
} else {
  const handName = args[0];
  const discardDeckName = args[1];
  const idsOfCards = args[2];
  const actorActingAsName = args[3];
 
  const fromDeck = game.cards.getName(handName);
  const toDeck = game.cards.getName(discardDeckName);
  let playedCard = await fromDeck.pass(toDeck, idsOfCards, {chatNotification: false});
  let actorActingAs = game.actors.getName(actorActingAsName);
  let permissionArray = Object.keys(actorActingAs.data.permission);
  permissionArray = permissionArray.filter(f => f != 'default');
  if (permissionArray.length > 0) {
    let userIDActingAs = permissionArray[0];
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${actorActingAsName} discarded ${idsOfCards.length} cards`,
    });
  } else {
    ChatMessage.create({
      content: `<div>${actorActingAsName} discarded ${idsOfCards.length} cards`,
    });
  }
}
