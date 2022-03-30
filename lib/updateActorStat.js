/**
 * Updates the text of a Text Drawing object.  This makes use of Tagger.
 * @param {int}         amount     The amount by which to increase stat.
 * @param {array}       statTag    The array of tags to filter on (e.g. ["Fortitude"]).
 * @param {string}      actorName  The actor whose stat needs updating.
 * @param {bool}        chatNotify Whether chat should notify (defaults to true).
 * @returns Promise          All macros return promise.
 */

// TODO: This only supports one stat at a time.  Need to update multiple stats on matching tags.

// updateActorStat(amount, [statTags], actorName)
// Macro Name: Update Actor Stat
// Run As GM: true
// Has Widget: false

let gameName = "The Inn";
let chatNotify = true;

console.log(`${gameName} | Update Actor Stat`)

if (args.length < 3) {
  console.log(`${gameName} | Error: updateActorStat was called with too few arguments:`);
  console.log(`${gameName} | Requires: updateActorStat(amount, [statTag], actorName);`);
  console.log(`${gameName} | Got: updateActorStat("${args.toString()});`);
} else {
  const amount = args[0];
  const actorName = args[2];
  const statTag = args[1];
  if (args.length > 3) {
    chatNotify = args[3];
  }
  const playerStat = Tagger.getByTag(["Stats", statTag, actorName]);
  if (playerStat.length > 0) {
    const playerStatText = playerStat[0].data.text.split(" ");
    const playerStatTitle = playerStatText[0];
    const playerStatAmount = playerStatText.slice(-1)[0];

    const newStatValue = parseInt(playerStatAmount) + parseInt(amount);

    let updates = await playerStat.map(i=>({_id:i.id,text:`${playerStatText[0]} ${newStatValue}`}));
    canvas.scene.updateEmbeddedDocuments("Drawing",updates);
    if (chatNotify) {
      const selectedUserIDs = game.users
                                    .filter(d=>typeof d.character !== 'undefined')
                                    .filter(d=>d.character.name === actorName)
                                    .map(d=>d.id);

      if (selectedUserIDs.length > 0) {
        let userIDActingAs = selectedUserIDs[0];
        ChatMessage.create({
          user: userIDActingAs,
          content: `<div>${actorName} adjusted ${statTag} by ${amount} to ${newStatValue}.</div>`,
        });
      } else {
        ChatMessage.create({
          content: `<div>${actorName} adjusted ${statTag} by ${amount} to ${newStatValue}.</div>`,
        });
      }
    }
  } else {
    console.log(`${gameName} | Error: Unable to find stat with tags ${statTag}, ${actorName}`)
  }
}
