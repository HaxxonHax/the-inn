/**
 * Draw Cards from the Character's Main Deck.
 */
// drawCards()
// Macro Name: Draw Cards
// Run As GM: false
// Has Widget: true

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';
const handSuffix = 'Hand';

console.log(`${gameName} | Draw Cards`);


if (actor) {
  const handName = `${actor.name} ${handSuffix}`;
  const deckName = `${actor.name} ${mainDeckBaseName} ${deckSuffix}`;
  const discardName = `${actor.name} ${mainDeckBaseName} ${discardDeckSuffix}`;

  let applyChanges=false;
  let dialogContent = "";
  let dialogContentHead = `
      <div>Select Cards to Discard:</div>
      <form>`;
  let dialogOptions = "";
  let dailogContentFooter = `</form>`;

  let hand = game.cards.getName(handName);
  hand.data.cards.forEach(function(element) { 
    dialogOptions = dialogOptions + `
      <div class="form-group">
      <input type="checkbox" value="${element.data._id}">${element.data.name}</input>
      </div>`;
  });

  dialogOptions = dialogOptions + `
        <div class="form-group">
          Draw How many cards: 
          <select id="select-type" name="select-type">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
          </select>
        </div>`;
  dialogContent = dialogContentHead + dialogOptions + dailogContentFooter;

  new Dialog({
    title: `Draw Cards`,
    content: dialogContent,
    buttons: {
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Draw`,
        callback: () => applyChanges = true
      },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel`
      },
    },
    default: "yes",
    close: html => {
        if (applyChanges) {
          let nCardsToDraw = html.find('[name="select-type"]')[0].value || null;
          let cardsToDiscard = $('input[type=checkbox]:checked').map((i, el) => el.value).get();
          //let cardsToDiscard = html.find('[name="selected-card"]')[0].value || null;
          const discardCardMacro = game.macros.getName("Discard Cards As Actor");
          discardCardMacro.execute(handName, discardName, cardsToDiscard, actor.name);
          const dealCardMacro = game.macros.getName("Deal Card As Actor");
          dealCardMacro.execute(deckName,
                                handName,
                                actor.name + " attempted to draw " + nCardsToDraw + " cards.",
                                actor.name,
                                false,
                                nCardsToDraw);
        }
      }
  }).render(true);
}
