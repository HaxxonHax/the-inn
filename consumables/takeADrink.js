console.log("Taking a Drink");
const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

// Only do something if there's an actor clicking.
if (actor) {
  let personalDrinkDeckName = "";
  let drinkDiscardName = "";

  if (args.length > 0) {
    personalDrinkDeckName = args[0];
  } else {
    personalDrinkDeckName = `${actor.name} ${drinkDeckBaseName} ${deckSuffix}`;
  }

  if (args.length > 1) {
    drinkDiscardName = args[1];
  } else {
    drinkDiscardName = `${actor.name} ${drinkDeckBaseName} ${discardDeckSuffix}`;
  }

  const playMacro = game.macros.getName("Resolve Take A Drink");
  const cardPlayed = await playMacro.execute(actor.name, game.user.id);
  console.log(cardPlayed);
  const drinkDiscard = game.cards.getName(drinkDiscardName);
  const drinkDiscardCount = drinkDiscard.data.cards.contents.length;
  if (drinkDiscardCount > 0) {
    const topCard = drinkDiscard.data.cards.contents[drinkDiscardCount - 1];
    console.log(topCard);
    const cardImg = topCard.img;
    console.log(cardImg);
    const calledMacro = game.macros.getName("Update Tile Image");
    calledMacro.execute(cardImg,"Drink",actor.name);
  }
}
