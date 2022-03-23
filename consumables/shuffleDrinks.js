/**
 * Shuffles the global consumables deck (e.g. Inn Drink Deck).
 */

const gameName = "Tavern"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

const macroToCall = "Shuffle Deck"
const deckToShuffle = `${gameName} ${drinkDeckBaseName} ${deckSuffix}`;

if (actor) {
  let calledMacro = game.macros.getName(macroToCall);
  if (calledMacro) {
    calledMacro.execute(deckToShuffle, true);
    console.log(deckToShuffle + "has been shuffled.");
    ChatMessage.create({
      user: game.user,
      content: `<div>${actor.name} shuffled ${deckToShuffle}.</div>`,
    });
  } else {
    console.log(`ERROR: No macro named ${macroToCall} found!`);
  }
} else {
  console.log("Attempt to call macro with no actor!");
}
