/**
 * Draw Cards from the Character's Main Deck.
 */

// Macro Name: Draw Cards
// Run As GM: false
// Has Widget: true

const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';
const handSuffix = 'Hand';

console.log(`${gameName} | Drawing Cards`);


if (actor) {
  const handName = `${actor.name} ${handSuffix}`;
  const deckName = `${actor.name} ${mainDeckBaseName} ${deckSuffix}`;

  let applyChanges=false;

  new Dialog({
    title: `Draw Cards`,
    content: `
      <form>
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
        </div>
      </form>
      `,
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
          const dealCardMacro = game.macros.getName("Deal Card As Actor");
          dealCardMacro.execute(deckName,
                                handName,
                                actor.name + " attempted to draw " + nCardsToDraw + " cards.",
                                actor.name,
                                game.user.id,
                                nCardsToDraw);
        }
      }
  }).render(true);
}
