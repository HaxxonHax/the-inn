/**
 * Discards Cards for a Character.
 * @param {string}      handName           The name of the deck to draw from.
 * @param {string}      discardDeckName    The name of the deck to send to.
 * @param {array}       idsOfCards         An array of the card IDs to discard.
 * @param {string}      characterActingAs  The name of the character that is requesting the deal.
 */
// discardCardsAsCharacter(handName, discardDeckName, idsOfCards, characterActingAsName)
// Macro Name: Discard Cards As Character
// Run As GM: true
// Has Widget: false

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

console.log(`${gameName} | Discard Cards As Character`);


if (args.length < 3) {
  console.log(`${gameName} | Error: discardCardsAsCharacter was called with too few arguments:`);
  console.log(`${gameName} | Requires: discardCardsAsCharacter(handName, discardDeckName, idsOfCards, characterActingAsName);`);
  console.log(`${gameName} | Got: discardCardsAsCharacter(${args.toString()})`);
} else {
  const handName = args[0];
  const discardDeckName = args[1];
  const idsOfCards = args[2];
  const characterActingAsName = args[3];
 
  const fromDeck = game.cards.getName(handName);
  const toDeck = game.cards.getName(discardDeckName);
  let playedCard = await fromDeck.pass(toDeck, idsOfCards, {chatNotification: false});
  const selectedUserIDs = game.users
                                 .filter(d=>typeof d.character !== 'undefined')
                                 .filter(d=>d.character.name === characterActingAsName)
                                 .map(d=>d.id);

  if (selectedUserIDs.length > 0) {
    let userIDActingAs = selectedUserIDs[0];
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${characterActingAsName} discarded ${idsOfCards.length} cards`,
    });
  } else {
    ChatMessage.create({
      content: `<div>${characterActingAsName} discarded ${idsOfCards.length} cards`,
    });
  }
}
