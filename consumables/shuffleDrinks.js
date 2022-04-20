/**
 * Shuffles the global consumables deck (e.g. Inn Drink Deck).
 */

// shuffleDrinks()
// Macro Name: Shuffle Drinks
// Run As GM: false
// Has Widget: true

if (game.paused !== true && typeof game.user.character !== 'undefined') {
  const gameName = "The Inn"
  const mainDeckBaseName = 'Main';
  const drinkDeckBaseName = 'Drink';
  const discardDeckSuffix = 'Discard';
  const deckSuffix = 'Deck';

  const shuffleDeckMacro = "Shuffle Deck";

  console.log(`${gameName} | Shuffle Drinks`)

  let calledMacro = null;

  const deckToShuffle = `${gameName} ${drinkDeckBaseName} ${deckSuffix}`;
  const discardDeckName = `${gameName} ${drinkDeckBaseName} ${discardDeckSuffix}`;
  let doTheShuffle = false;
  let chatText = '';

  let dialogContent = `
      <div>Shuffle Deck</div>
      <form>
        <div class="form-group">
          <input type="checkbox" id="collect-discards" name="collect-discards">
          <label for="collect-discards">Collect Inn Discards</label><br>
        </div>
        <div class="form-group">
          <input type="checkbox" id="collect-character-discards" name="collect-character-discards">
          <label for="collect-character-discards">Collect All Character Drink Discards</label><br>
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
        let collectGlobalDiscards = html.find('[name="collect-discards"]')[0].checked;
        let collectCharacterDiscards = html.find('[name="collect-character-discards"]')[0].checked;
        if (collectGlobalDiscards) {
          chatText = chatText + `<div>${game.user.character.name} collected the ${discardDeckName}s.</div>`
          console.log(`[${gameName}] Collecting discards from ${discardDeckName} for ${deckToShuffle}`);
          calledMacro = game.macros.getName("Collect Discards");
          calledMacro.execute(deckToShuffle,discardDeckName);
        }
        if (collectCharacterDiscards) {
          let allPlayers = game.users.filter(d=>d.hasPlayerOwner === true);
          chatText = chatText + `<div>${game.user.character.name} collected all the player drink discards.</div>`
          allPlayers.forEach(async function(p){
            const characterDrinkDiscard = p.character.name + ' ' + drinkDeckBaseName + ' ' + discardDeckSuffix;
            console.log(`[${gameName}] Collecting discards from ${characterDrinkDiscard} for ${deckToShuffle}`);
            calledMacro = game.macros.getName("Collect Discards");
            await calledMacro.execute(deckToShuffle,characterDrinkDiscard);
          });
        }
        calledMacro = game.macros.getName(shuffleDeckMacro);
        calledMacro.execute(deckToShuffle, true);
        console.log(deckToShuffle + "has been shuffled.");
        ChatMessage.create({
          user: game.user,
          content: chatText + `<div>${game.user.character.name} shuffled ${deckToShuffle}.</div>`,
        });
      }
    }
  }).render(true);
}
