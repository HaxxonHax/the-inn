/**
 * Resolves the Pay Gold macro.  The pot name should be a tag for the Text Drawing Object of form 'Name: Number',
 *  e.g., "Pot: 0".
 * @param {string}      actorActingAsName  The name of the actor paying Gold.
 * @param {string}      targetName         The name of the actor or game to which the actor is sending Gold .
 * @param {int}         numGold            The number of Gold pieces to send.
 */
// resolvePayGold(actorActingAsName, targetName, amountToPay)
// Macro Name: Resolve Pay Gold
// Run As GM: true
// Has Widget: false

const gameName = "The Inn";
const potName = "Pot";

if (args.length < 3) {
  console.log(`${gameName} | Error: resolvePayGold was called with too few arguments:`);
  console.log(`${gameName} | Requires: resolvePayGold(actorActingAsName, targetName, amountToPay);`);
  console.log(`${gameName} | Got: resolvePayGold(${args.toString()})`);
} else {
  const actorActingAsName = args[0];
  const targetName = args[1];
  const numGold = parseInt(args[2]);

  let statMacro = game.macros.getName("Update Actor Stat");
  await statMacro.execute(-numGold,"Gold",actorActingAsName, false);
  if (targetName !== gameName) await statMacro.execute(numGold,"Gold",targetName, false);
  const selectedUserIDs = game.users.filter(d=>typeof d.character !== 'undefined').filter(d=>d.character.name === actorActingAsName).map(d=>d.id);
  if (selectedUserIDs.length > 0) {
    let userIDActingAs = selectedUserIDs[0];
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${actorActingAsName} paid ${numGold} Gold to ${targetName}</div>`,
    });
  } else {
    ChatMessage.create({
      content: `<div>${actorActingAsName} paid ${numGold} Gold to ${targetName}</div>`,
    });
  }
}
