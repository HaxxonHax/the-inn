/**
 * Shuffles the global consumables deck (e.g. Inn Drink Deck).
 */

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

const macroToCall = "Shuffle Deck"

if (actor) {
  const deckToShuffle = `${gameName} ${drinkDeckBaseName} ${deckSuffix}`;
  const discardDeckName = `${gameName} ${drinkDeckBaseName} ${discardDeckSuffix}`;
  let calledMacro = game.macros.getName(macroToCall);
  if (calledMacro) {
    calledMacro.execute(deckToShuffle, true);
    console.log(deckToShuffle + "has been shuffled.");
    ChatMessage.create({
      user: game.user,
      content: `<div>${actor.name} shuffled ${deckToShuffle}.</div>`,
    });
  } else {
    console.log(`[${gameName}] ERROR: No macro named ${macroToCall} found!`);
  }
} else {
  console.log(`[${gameName}] Attempt to call macro with no actor!`);
}
