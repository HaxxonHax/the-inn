/**
 * Runs all the init macros.
 */
// runAllInits()
// Macro Name: Run All Inits
// Run As GM: false
// Has Widget: false

let calledMacro = {};

calledMacro = game.macros.getName("Create Cards On Scene");
await calledMacro.execute();
calledMacro = game.macros.getName("Create Stat Buttons On Scene");
await calledMacro.execute();
calledMacro = game.macros.getName("Create Stats On Scene");
await calledMacro.execute();
calledMacro = game.macros.getName("Create Buttons On Scene");
await calledMacro.execute();
calledMacro = game.macros.getName("Create Game Decks");
await calledMacro.execute();
