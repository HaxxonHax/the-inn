/**
 * Plays a selected card from the actor's hand and moves it into the actor's discard pile.
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

console.log(`${gameName} | Play a Card`);

function updatePlayTileWithCard(cardId, hand, passTo, actor) {
  let playedCard = hand.data.cards.get(cardId);
  let cardImg = playedCard.img;
  let cardName = playedCard.name;
  let calledMacro = game.macros.getName("Update Tile Image");
  // hand.playDialog(hand.data.cards.get(cardId));
  hand.pass(passTo, [cardId], {action: "play", chatNotification: false});
  ChatMessage.create({
    content: `<div>${actor.name} played ${cardName}</div>`,
  });
  calledMacro.execute(cardImg,"Play",actor.name);

}

// Only do something if there's an actor clicking.
if (actor) {
  let actorHandName = `${actor.name} ${handSuffix}`;
  let actorMainDiscardName = `${actor.name} ${mainDeckBaseName} ${discardDeckSuffix}`;
  let doPlayCard = false;

  let hand = game.cards.getName(actorHandName);
  let passTo = game.cards.getName(actorMainDiscardName);
  let dialogContent = "";
  let dialogContentHead = `
      <div>Play which card?</div>
      <form>
        <div class="form-group">
          <select id="selected-card" name="selected-card">`;
  let dialogOptions = "";
  let dailogContentFooter = `          </select>
        </div>
      </form>`;

  if (typeof hand !== 'undefined' && typeof passTo !== 'undefined') {
    hand.data.cards.forEach(function(element) { 
      dialogOptions = dialogOptions + '<option value="' + element.data._id + '">' + element.data.name + "</option>";
    });
    dialogContent = dialogContentHead + dialogOptions + dailogContentFooter;
    new Dialog({
      title: "Play a Card",
      content: dialogContent,
      buttons: {
        play: {
          icon: "<i class='fas fa-check'></i>",
          label: `Play Card`,
          callback: () => doPlayCard = true
        },
        cancel: {
          icon: "<i class='fas fa-times'></i>",
          label: `Cancel`
        },
      },
      default: "cancel",
      close: html => {
          if (doPlayCard) {
            let selectedCardID = html.find('[name="selected-card"]')[0].value || null;
            if(selectedCardID) {
              updatePlayTileWithCard(selectedCardID, hand, passTo, actor);
            }
          }
        }
    }).render(true);
  }
  else {
    new Dialog({
      title: "Deck not found!",
      content: `<div>Unable to find Decks!  Ensure GM has created "` + handName + `" and "` + passToName + `" decks.</div>`,
      buttons: {
        ok: {
          icon: "<i class='fas fa-times'></i>",
          label: `OK`
        },
      },
      default: "ok",
    }).render(true);
  }
}
