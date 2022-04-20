/**
 * Updates the text of a Text Drawing object.  This makes use of Tagger.
 * @param {int}         amount         The amount by which to increase stat.
 * @param {array}       statTag        The array of tags to filter on (e.g. ["Fortitude"]).
 * @param {string}      characterName  The character whose stat needs updating.
 * @param {bool}        chatNotify     Whether chat should notify (defaults to true).
 * @returns Promise          All macros return promise.
 */

// TODO: This only supports one stat at a time.  Need to update multiple stats on matching tags.

// updateCharacterStat(amount, [statTags], characterName)
// Macro Name: Update Character Stat
// Run As GM: true
// Has Widget: false

let gameName = "The Inn";
let chatNotify = true;

console.log(`${gameName} | Update Character Stat`)

if (args.length < 3) {
  console.log(`${gameName} | Error: updateCharacterStat was called with too few arguments:`);
  console.log(`${gameName} | Requires: updateCharacterStat(amount, [statTag], characterName);`);
  console.log(`${gameName} | Got: updateCharacterStat("${args.toString()});`);
} else {
  const amount = args[0];
  const characterName = args[2];
  const statTag = args[1];
  if (args.length > 3) {
    chatNotify = args[3];
  }
  const playerStat = Tagger.getByTag(["Stats", statTag, characterName]);
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
                                    .filter(d=>d.character.name === characterName)
                                    .map(d=>d.id);

      if (selectedUserIDs.length > 0) {
        let userIDActingAs = selectedUserIDs[0];
        ChatMessage.create({
          user: userIDActingAs,
          content: `<div>${characterName} adjusted ${statTag} by ${amount} to ${newStatValue}.</div>`,
        });
      } else {
        ChatMessage.create({
          content: `<div>${characterName} adjusted ${statTag} by ${amount} to ${newStatValue}.</div>`,
        });
      }
    }
  } else {
    console.log(`${gameName} | Error: Unable to find stat with tags ${statTag}, ${characterName}`)
  }
}
