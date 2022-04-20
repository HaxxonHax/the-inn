/**
 * Ends the player's turn and moves to the next one in the combat tracker.
 */
// endTurn()
// Macro Name: End Turn
// Run As GM: false
// Has Widget: true

if (game.paused !== true && typeof game.user.character !== 'undefined') {
  const gameName = "The Inn"
  const mainDeckBaseName = 'Main';
  const drinkDeckBaseName = 'Drink';
  const discardDeckSuffix = 'Discard';
  const deckSuffix = 'Deck';
  const globalDrinkDeckName = `${gameName} ${drinkDeckBaseName} ${deckSuffix}`;

  console.log(`${gameName} | End Turn`);

  if (typeof game.combats.active !== 'undefined') {
    let activeName = canvas.tokens.get(game.combat.combatant.token.id).name;
    if (game.user.character.name !== activeName) return;

    // Update turn
    await game.combats.active.nextTurn()
    canvas.tokens.get(game.combats.active.combatant.data.tokenId).control()
    let newActiveName = canvas.tokens.get(game.combat.combatant.token.id).name;

    // Update tiles
    const globalDrinkDeck = game.cards.getName(globalDrinkDeckName);
    const calledMacro = await game.macros.getName("Update Tile Image");
    await calledMacro.execute(globalDrinkDeck.data.img,"Drink",activeName);
    const characterMainDeckName = `${game.user.character.name} ${mainDeckBaseName} ${deckSuffix}`;
    const characterMainDeck = game.cards.getName(characterMainDeckName);
    const characterMacro = await game.macros.getName("Update Tile Image");
    await characterMacro.execute(characterMainDeck.data.img,"Play",activeName);

    ChatMessage.create({
      content: `<div>${activeName} ended their turn.</div><div>It's now ${newActiveName}'s turn.</div>`,
    });
  } else {
    ChatMessage.create({
      content: `<div>Attempt to end turn when <b>no active encounters</b> have started.  Please add characters and start an encounter.</div>`,
    });
  }
}
