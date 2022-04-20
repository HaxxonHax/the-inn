/**
 * Plays the top card from the character's drink pile into the character's drink discard pile.
 * @param {string}      personalDrinkDeckName   (Optional) The name of the character's drink pile to draw from.
 * @param {string}      personalDrinkDeckName   (Optional) The name of the character's discard pile to send to.
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

let personalDrinkDeckName = "";
let drinkDiscardName = "";

if (args.length > 0) {
  personalDrinkDeckName = args[0];
} else {
  personalDrinkDeckName = `${game.user.character.name} ${drinkDeckBaseName} ${deckSuffix}`;
}

if (args.length > 1) {
  drinkDiscardName = args[1];
} else {
  drinkDiscardName = `${game.user.character.name} ${drinkDeckBaseName} ${discardDeckSuffix}`;
}

const playMacro = game.macros.getName("Resolve Take A Drink");
await playMacro.execute(game.user.character.name, game.user.id);

