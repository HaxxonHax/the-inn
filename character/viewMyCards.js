/**
 * Display Cards from the Character's Main Deck.
 */
// viewMyCards()
// Macro Name: View My Cards
// Run As GM: false
// Has Widget: true

if (game.paused !== true && typeof game.user.character !== 'undefined') {
  const gameName = "The Inn"
  const mainDeckBaseName = 'Main';
  const drinkDeckBaseName = 'Drink';
  const discardDeckSuffix = 'Discard';
  const deckSuffix = 'Deck';
  const handSuffix = 'Hand';

  console.log(`${gameName} | View My Cards`);

  const handName = `${game.user.character.name} ${handSuffix}`;
  const discardName = `${game.user.character.name} ${mainDeckBaseName} ${discardDeckSuffix}`
  const deckName = `${game.user.character.name} ${mainDeckBaseName} ${deckSuffix}`

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
