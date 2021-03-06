/**
 * Resolves the Collect Pot macro.  The pot name should be a tag for the Text Drawing Object of form 'Name: Number',
 *  e.g., "Pot: 0".
 * @param {string}      characterActingAsName  The name of the character paying Gold.
 */
// resolveCollectPot(characterActingAsName)
// Macro Name: Resolve Pay Gold
// Run As GM: true
// Has Widget: false

const gameName = "The Inn";
const potName = "Pot";

console.log(`${gameName} | Resolve Collect Pot`);

if (args.length < 1) {
  console.log(`${gameName} | Error: resolveCollectPot was called with too few arguments:`);
  console.log(`${gameName} | Requires: resolveCollectPot(characterActingAsName);`);
  console.log(`${gameName} | Got: resolveCollectPot(${args.toString()})`);
} else {
  const characterActingAsName = args[0];

  let goldDrawing = Tagger.getByTag(["Stats", "Gold", "Drawing", "Pot", "Global"]);
  if (goldDrawing.length > 0) {
    const goldDrawingText = goldDrawing[0].data.text.split(" ");
    const goldAmount = goldDrawingText[1];

    let statMacro = game.macros.getName("Update Character Stat");
    await statMacro.execute(goldAmount,"Gold",characterActingAsName, false);
    await statMacro.execute(-goldAmount,"Pot","Global",false);
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
}
