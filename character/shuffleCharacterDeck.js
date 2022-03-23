// shuffleCharacterDeck();
//
//    example: shuffleCharacterDeck();

const macroToCall = "Shuffle Deck"
const baseDeckName = "Main"

if (actor) {
  const deckToShuffle = actor.name + " " + baseDeckName + "Deck"
  let calledMacro = game.macros.getName(macroToCall);
  if (calledMacro) {
    calledMacro.execute(deckToShuffle, true);
    ChatMessage.create({
      user: game.user,
      content: `<div>` + actor.name + ` shuffled the ` + deckToShuffle + ` deck.</div>`,
    });
  } else {
    console.log("ERROR: No macro named '" + macroToCall + "' found!");
  }
} else {
  console.log("Attempt to call macro with no actor!");
}
