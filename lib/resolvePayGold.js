/**
 * Resolves the Pay Gold macro.  The pot name should be a tag for the Text Drawing Object of form 'Name: Number',
 *  e.g., "Pot: 0".
 * @param {string}      characterActingAsName  The name of the character paying Gold.
 * @param {string}      targetName         The name of the character or game to which the character is sending Gold .
 * @param {int}         numGold            The number of Gold pieces to send.
 */
// resolvePayGold(characterActingAsName, targetName, amountToPay)
// Macro Name: Resolve Pay Gold
// Run As GM: true
// Has Widget: false

const gameName = "The Inn";
const potName = "Pot";

console.log(`${gameName} | Resolve Pay Gold`);

if (args.length < 3) {
  console.log(`${gameName} | Error: resolvePayGold was called with too few arguments:`);
  console.log(`${gameName} | Requires: resolvePayGold(characterActingAsName, targetName, amountToPay);`);
  console.log(`${gameName} | Got: resolvePayGold(${args.toString()})`);
} else {
  const characterActingAsName = args[0];
  const targetName = args[1];
  const numGold = parseInt(args[2]);

  let statMacro = game.macros.getName("Update Character Stat");
  await statMacro.execute(-numGold,"Gold",characterActingAsName, false);
  if (targetName !== gameName && targetName !== potName) await statMacro.execute(numGold,"Gold",targetName, false);
  if (targetName === potName) await statMacro.execute(numGold,"Pot","Global",false);
  const selectedUserIDs = game.users
                                .filter(d=>typeof d.character !== 'undefined')
                                .filter(d=>d.character.name === characterActingAsName)
                                .map(d=>d.id);
  if (selectedUserIDs.length > 0) {
    let userIDActingAs = selectedUserIDs[0];
    ChatMessage.create({
      user: userIDActingAs,
      content: `<div>${characterActingAsName} paid ${numGold} Gold to ${targetName}</div>`,
    });
  } else {
    ChatMessage.create({
      content: `<div>${characterActingAsName} paid ${numGold} Gold to ${targetName}</div>`,
    });
  }
}
