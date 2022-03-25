// shuffleCharacterDeck();
//
//    example: shuffleCharacterDeck();

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

const shuffleDeckMacro = "Shuffle Deck";

console.log(`${gameName} | Shuffle Character Deck`)

let calledMacro = null;


if (actor) {
  const deckToShuffle = `${actor.name} ${mainDeckBaseName} ${deckSuffix}`;
  const discardDeckName = `${actor.name} ${mainDeckBaseName} ${discardDeckSuffix}`;
  let doTheShuffle = false;
  let chatText = '';

  let dialogContent = `
      <div>Shuffle Deck</div>
      <form>
        <div class="form-group">
          <input type="checkbox" id="collect-discards" name="collect-discards">
          <label for="collect-discards">Collect Discards</label><br>
        </div>
      </form>`;

  new Dialog({
    title: `Shuffle ${deckToShuffle}`,
    content: dialogContent,
    buttons: {
      play: {
        icon: "<i class='fas fa-check'></i>",
        label: `Shuffle!`,
        callback: () => doTheShuffle = true
      },
      cancel: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel`
      },
    },
    default: "cancel",
    close: html => {
      if (doTheShuffle) {
        let collectDiscards = html.find('[name="collect-discards"]')[0].checked;
        if (collectDiscards) {
          chatText = chatText + `<div>${actor.name} collected the ${discardDeckName}s.</div>`
          console.log(`[${gameName}] Collecting discards from ${discardDeckName} for ${deckToShuffle}`);
          calledMacro = game.macros.getName("Collect Discards");
          calledMacro.execute(deckToShuffle,discardDeckName);
        }
        calledMacro = game.macros.getName(shuffleDeckMacro);
        calledMacro.execute(deckToShuffle, true);
        console.log(deckToShuffle + "has been shuffled.");
        ChatMessage.create({
          user: game.user,
          content: chatText + `<div>${actor.name} shuffled ${deckToShuffle}.</div>`,
        });
      }
    }
  }).render(true);
} else {
  console.log(`[${gameName}] Attempt to call macro with no actor!`);
}
