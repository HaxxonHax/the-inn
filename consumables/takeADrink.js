/**
 * Plays the top card from the actor's drink pile into the actor's drink discard pile.
 * @param {string}      personalDrinkDeckName   (Optional) The name of the actor's drink pile to draw from.
 * @param {string}      personalDrinkDeckName   (Optional) The name of the actor's discard pile to send to.
 */
// takeADrink()
// Macro Name: Take A Drink
// Run As GM: false
// Has Widget: true

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

console.log(`${gameName} | Take a Drink`);


// Only do something if there's an actor clicking.
if (actor) {
  let personalDrinkDeckName = "";
  let drinkDiscardName = "";

  if (args.length > 0) {
    personalDrinkDeckName = args[0];
  } else {
    personalDrinkDeckName = `${actor.name} ${drinkDeckBaseName} ${deckSuffix}`;
  }

  if (args.length > 1) {
    drinkDiscardName = args[1];
  } else {
    drinkDiscardName = `${actor.name} ${drinkDeckBaseName} ${discardDeckSuffix}`;
  }

  const playMacro = game.macros.getName("Resolve Take A Drink");
  await playMacro.execute(actor.name, game.user.id);
}
