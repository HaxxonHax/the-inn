// shuffleCharacterDeck();
//
//    example: shuffleCharacterDeck();

const gameName = "The Inn";
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

const macroToCall = "Shuffle Deck"

if (actor) {
  const deckToShuffle = `${actor.name} ${mainDeckBaseName} ${deckSuffix}`
  const discardDeckName = `${actor.name} ${mainDeckBaseName} ${discardDeckSuffix}`
  let calledMacro = game.macros.getName(macroToCall);
  if (calledMacro) {
    calledMacro.execute(deckToShuffle, true);
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
