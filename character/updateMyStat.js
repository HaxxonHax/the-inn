/**
 * Updates the given stat for an character.  Calls the "Update Character Stat" macro.
 * @param {string}      statName            The name of the stat to adjust (e.g. "Fortitude").
 * @param {int}         amountToUpdateBy    The amount to add to the stat.
 * @param {string}      ownedCharacterName  (optional) The name of the character that owns the stat.
 * @returns Promise                         All macros return promise.
 */

// updateMyStat(statName, amountToUpdateBy, ownedCharacterName)
// Macro Name: Update My Stat
// Run As GM: false
// Has Widget: true

const gameName = "The Inn";

console.log(`${gameName} | Update My Stat`)

if (args.length > 1) {
  // Here we support both any character and named character checking via parameters.
  if (args.length > 2) {
    if (game.user.character.name !== args[2]) return
  }
  const statToUpdate = args[0];
  const amountToUpdateBy = args[1];
  const statMacro = game.macros.getName("Update Character Stat");
  statMacro.execute(amountToUpdateBy,statToUpdate,game.user.character.name);
}
