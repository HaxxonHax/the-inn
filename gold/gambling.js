/**
 * Offers a selection of gambling options: Ante Up or Collect Gold.
 */
// gambling()
// Macro Name: Gambling
// Run As GM: false
// Has Widget: true

if (game.paused !== true && typeof game.user.character !== 'undefined') {
  const gameName = "The Inn"
  const mainDeckBaseName = 'Main';
  const drinkDeckBaseName = 'Drink';
  const discardDeckSuffix = 'Discard';
  const deckSuffix = 'Deck';
  const handSuffix = 'Hand';

  console.log(`${gameName} | Gambling`);

  let doAnteUp = false;
  let doCollect = false;

  let dialogContent = `
      <div>Ante</div>
        <div class="form-group">
          Amount to Add to Pot:
          <select id="gold-amount" name="gold-amount">
              <option value="1" selected="selected">1</option>
              <option value="2">2</option>
          </select>
        </div>
      </form>`;

  new Dialog({
    title: "Ante",
    content: dialogContent,
    buttons: {
      play: {
        icon: "<i class='fas fa-check'></i>",
        label: `Ante Up`,
        callback: () => doAnteUp = true
      },
      collect: {
        icon: "<i class='fas fa-check'></i>",
        label: `Collect Pot`,
        callback: () => doCollect = true
      },
      cancel: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel`
      },
    },
    default: "cancel",
    close: html => {
        if (doAnteUp) {
          let amountToAnte = html.find('[name="gold-amount"]')[0].value;
          let anteMacro = game.macros.getName("Resolve Pay Gold");
          anteMacro.execute(game.user.character.name,"Pot",amountToAnte);
        }
        else if (doCollect) {
          let collectPotMacro = game.macros.getName("Resolve Collect Pot");
          collectPotMacro.execute(game.user.character.name);
        }
      }
  }).render(true);
}
