/**
 * Display Cards from the Character's Main Deck.
 */
// viewMyCards()
// Macro Name: View My Cards
// Run As GM: false
// Has Widget: true

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';
const handSuffix = 'Hand';

console.log(`${gameName} | View My Cards`);


if (actor) {
  const handName = `${actor.name} ${handSuffix}`;
  const discardName = `${actor.name} ${mainDeckBaseName} ${discardDeckSuffix}`
  const deckName = `${actor.name} ${mainDeckBaseName} ${deckSuffix}`

  const playerHand = game.cards.getName(handName);
  const playerDiscard = game.cards.getName(discardName);
  const playerDeck = game.cards.getName(deckName);

  if (playerHand) {
    playerHand.sheet.render(true);
  } else {
    new Dialog({
      title: "Deck not found!",
      content: `<div>Unable to find Deck!  Ensure GM has created ${handName}, ${deckName}, and ${discardName} decks.</div>`,
        buttons: {
        ok: {
          icon: "<i class='fas fa-times'></i>",
          label: `OK`
        },
      },
      default: "ok",
    }).render(true);
  }
}
