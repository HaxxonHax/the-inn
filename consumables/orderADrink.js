/**
 * Transfers the top card of the global drink pile to the character's personal drink pile.
 * @param {string}      globalDrinkDeckName   The name of the global drink pile to draw from.
 */
// orderADrink()
// Macro Name: Order A Drink
// Run As GM: false
// Has Widget: true

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

console.log(`${gameName} | Order a Drink`);


let applyChanges = false;
let globalDrinkDeckName = `${gameName} ${drinkDeckBaseName} ${deckSuffix}`;
let targetedPlayerDrinkDeckName = "";
let dialogContent = "";
let dialogContentHead = `
    <div>For whom would you like to order a drink?</div>
    <form>
      <div class="form-group">
        <select id="selected-character" name="selected-character">`;
let dialogOptions = "";
let dailogContentFooter = `          </select>
      </div>
    </form>`;

if (args.length > 0) {
  globalDrinkDeckName = args[1];
}

let globalDrinkDeck = game.cards.getName(globalDrinkDeckName);
const sceneId = game.scenes.active.id;
const userIds = game.users.players.filter(u=> u.active===true && typeof u.character !== 'undefined')
        .filter(u=> typeof u.character.name !== 'undefined')
        .map(u=>u.character.name);

userIds.forEach(function(element) { 
  dialogOptions = dialogOptions + `<option value="${element}">${element}</option>`;
});
dialogContent = dialogContentHead + dialogOptions + dailogContentFooter;
new Dialog({
  title: "Order a Drink",
  content: dialogContent,
  buttons: {
    play: {
      icon: "<i class='fas fa-check'></i>",
      label: `Order a Drink!`,
      callback: () => applyChanges = true
    },
    cancel: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel`
    },
  },
  default: "cancel",
  close: html => {
      if (applyChanges) {
            let selectedCharacter = html.find('[name="selected-character"]')[0].value || null;
            if(selectedCharacter) {
              targetedPlayerDrinkDeckName = `${selectedCharacter} ${drinkDeckBaseName} ${deckSuffix}`;
              console.log(targetedPlayerDrinkDeckName);
              const dealCardMacro = game.macros.getName("Deal Card As Character");
              dealCardMacro.execute(globalDrinkDeckName,
                                    targetedPlayerDrinkDeckName,
                                    game.user.character.name + " bought a drink for " + selectedCharacter,
                                    game.user.character.name,
                                    true);
            }
        }
    }
}).render(true);
