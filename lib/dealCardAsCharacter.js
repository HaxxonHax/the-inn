/**
 * Shuffles the given deck.
 * @param {string}      fromDeckName           The name of the deck to draw from.
 * @param {string}      toDeckName             The name of the deck to send to.
 * @param {string}      chatText               The text to send to Chat.
 * @param {string}      characterActingAsName  The name of the character that is requesting the deal.
 * @param {bool}        toTop                  Whether the card should be dealt to the top of the target deck.
 * @param {int}         numCards               The number of cards to draw.
 */
// dealCardAsCharacter(characterActingAs, userActingAs, chatText, characterActingAs, userActingAs)
// Macro Name: Deal Card As Character
// Run As GM: true
// Has Widget: false

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

console.log(`${gameName} | Deal Card As Character`);

let numCards = 1;
let chatText = '';

if (args.length < 2) {
  console.log(`${gameName} | Error: dealCardAsCharacter was called with too few arguments:`);
  console.log(`${gameName} | Requires: dealCardAsCharacter(fromDeckName, toDeckName, chatText, characterActingAsName, toTop, numCards);`);
  console.log(`${gameName} | Got: dealCardAsCharacter(${args.toString()})`);
} else {
  if (args.length > 5) numCards = args[5];
  const fromDeckName = args[0];
  const toDeckName = args[1];
  const chatText = args[2];
  const characterActingAsName = args[3];
  const toTop = args[4];
 
  const fromDeck = game.cards.getName(fromDeckName);
  let toDeck = game.cards.getName(toDeckName);
  const fromDeckCards = fromDeck.data.cards;

  const selectedUserIDs = game.users
                                .filter(d=>typeof d.character !== 'undefined')
                                .filter(d=>d.character.name === characterActingAsName)
                                .map(d=>d.id);

  if (fromDeckCards.contents.length > 0) {
    if (fromDeckCards.contents.length < numCards) numCards = fromDeckCards.contents.length;
    let valArray = toDeck.data.cards.map(f => f.data.sort);
    let lowest = Math.min.apply(null,valArray);
    let highest = Math.max.apply(null,valArray);
    let playedCard = await toDeck.draw(fromDeck, numCards, {action: "play", chatNotification: false});
    playedCard[0].data.sort = highest + 1;
    const newFromCount = fromDeck.data.cards.contents.length;
    const newToCount = toDeck.data.cards.contents.length;

    // Move drawn card to the top.
    if (toTop) {
      toDeck = game.cards.getName(toDeckName);
      valArray = toDeck.data.cards.map(f => f.data.sort);
      lowest = Math.min.apply(null,valArray);
      highest = Math.max.apply(null,valArray);

      toDeck.data.cards.forEach(function(f) {
        if (f.data.sort == highest) {
          f.data.sort=lowest;
        } else {
          f.data.sort = f.data.sort + 1;
        }
      });

    }
    if (selectedUserIDs.length > 0) {
      let userIDActingAs = selectedUserIDs[0];
      ChatMessage.create({
        user: userIDActingAs,
        content: `<div>${chatText}</div>
                  <div>${fromDeckName} has ${newFromCount} left</div>
                  <div>${toDeckName} now has ${newToCount}`,
      });
    } else {
      ChatMessage.create({
        content: `<div>${chatText}</div>
                  <div>${fromDeckName} has ${newFromCount} left</div>
                  <div>${toDeckName} now has ${newToCount}`,
      });
    }
  } else {
    if (selectedUserIDs.length > 0) {
      let userIDActingAs = selectedUserIDs[0];
      ChatMessage.create({
        user: userIDActingAs,
        content: `<div>${fromDeckName} has no more cards!</div>`,
      });
    } else {
      ChatMessage.create({
        content: `<div>${fromDeckName} has no more cards!</div>`,
      });
    }
  }
}
