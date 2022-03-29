/**
 * Updates the given stat for an actor.  Calls the "Update Actor Stat" macro.
 * @param {string}      statName          The name of the stat to adjust (e.g. "Fortitude").
 * @param {int}         amountToUpdateBy  The amount to add to the stat.
 * @param {string}      ownedActor        The actor that should own the stat.
 * @returns Promise          All macros return promise.
 */

// updateActorStat(amount, [statTags], actorName)
// Macro Name: Update Actor Stat
// Run As GM: true
// Has Widget: false

const gameName = "The Inn";

console.log(`${gameName} | Update My Stat`)

if (actor) {
  if (args.length > 1) {
    // Here we support both any actor and named actor checking via parameters.
    if (args.length > 2) {
      if (actor.name !== args[2]) return
    }
    const statToUpdate = args[0];
    const amountToUpdateBy = args[1];
    const statMacro = game.macros.getName("Update Actor Stat");
    statMacro.execute(amountToUpdateBy,statToUpdate,actor.name);
  }
}
