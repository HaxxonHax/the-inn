/**
 * Offers a selection of players/Inn/Pot to pay gold.
 */
// playACard()
// Macro Name: Play A Card
// Run As GM: false
// Has Widget: true

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';
const handSuffix = 'Hand';

console.log(`${gameName} | Pay Gold`);

// Only do something if there's an actor clicking.
if (actor) {
  let doPayGold = false;

  let dialogContent = "";
  let dialogContentHead = `
      <div>To whom would you like to pay gold?</div>
      <div>(select yourself to collect from ${gameName})</div>
      <form>
        <div class="form-group">
          <select id="selected-target" name="selected-target">`;
  let dialogOptions = `<option value="${gameName}" selected="selected">${gameName}</option>`;

  let dailogContentFooter = `
          </select>
        </div>
        <div class="form-group">
          Amount: 
          <select id="gold-amount" name="gold-amount">
              <option value="1" selected="selected">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
          </select>
        </div>
      </form>`;

  const ownedActors = game.users.players.filter(u=> u.active===true && typeof u.character !== 'undefined')
          .filter(u=> typeof u.character.name !== 'undefined')
          .map(u=>u.character.name);
  ownedActors.forEach(function(element) { 
    dialogOptions = dialogOptions + `<option value="${element}">${element}</option>`;
  });

  dialogContent = dialogContentHead + dialogOptions + dailogContentFooter;
  new Dialog({
    title: "Pay Gold",
    content: dialogContent,
    buttons: {
      play: {
        icon: "<i class='fas fa-check'></i>",
        label: `Pay Gold`,
        callback: () => doPayGold = true
      },
      cancel: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel`
      },
    },
    default: "cancel",
    close: html => {
        if (doPayGold) {
          let targetActor = html.find('[name="selected-target"]')[0].value;
          let amountToPay = html.find('[name="gold-amount"]')[0].value;
          let payMacro = game.macros.getName("Resolve Pay Gold");
          payMacro.execute(actor.name,targetActor,amountToPay);
        }
      }
  }).render(true);
}
