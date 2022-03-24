// resolveTakeADrink(actorActingAs, userIDActingAs)
const gameName = "The Inn"
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';

if (args.length < 2) {
  console.log(`[${gameName}] Error: resolveTakeADrink was called with too few arguments:`);
  console.log(`[${gameName}] Requires: resolveTakeADrink(actorActingAs, userIDActingAs);`);
  console.log(`[${gameName}] Got: resolveTakeADrink(${args.toString()})`);
} else {
  const actorActingAs = args[0];
  const userIDActingAs = args[1];;
 
  const passFromDeckName = `${actorActingAs} ${drinkDeckBaseName} ${deckSuffix}`;
  const toDeckName = `${actorActingAs} ${drinkDeckBaseName} ${discardDeckSuffix}`
  const passFromDeck = game.cards.getName(passFromDeckName);
  const discardDeck = game.cards.getName(toDeckName);
  const passFromDeckCards = passFromDeck.data.cards;
  if (passFromDeckCards.contents.length > 0) {
    const cardId = passFromDeckCards.contents[passFromDeckCards.contents.length - 1].id;
    let playedCard = await discardDeck.draw(passFromDeck, 1, {action: "play", chatNotification: false});
    const newCount = passFromDeck.data.cards.contents.length;
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${actorActingAs} took a drink: ${playedCard[0].name}.</div><div>New ${passFromDeckName} Count: ${newCount}</div>`,
    });
    const cardImg = playedCard[0].img;
    const calledMacro = await game.macros.getName("Update Tile Image");
    await calledMacro.execute(cardImg,"Drink",actor.name);
  } else {
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div> No cards to play in ${passFromDeckName}</div><div>Count: ${passFromDeckCards.contents.length}</div>`,
    });    
  }
}
