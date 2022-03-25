/**
 * Updates the text of a Text Drawing object.  This makes use of Tagger.
 */
// updateActorStat(amount, [statTags], actorName)
// Macro Name: Update Actor Stat
// Run As GM: true
// Has Widget: false

let gameName = "The Inn";

console.log(`${gameName} | Update Actor Stat`)

if (args.length < 3) {
  console.log("Error: updateActorStat was called with too few arguments:");
  console.log("Requires: updateActorStat(amount, [statTags], actorName);");
  console.log("Got: updateActorStat(" + args.toString() + ");");
} else {
  const amount = args[0];
  const actorName = args[2];
  const statTags = args[1].concat([actorName, "Stats"])
  const playerStat = Tagger.getByTag(statTags);
  if (playerStat.length > 0) {
    const playerStatText = playerStat[0].data.text.split(" ");
    const playerStatTitle = playerStatText[0];
    const playerStatAmount = playerStatText.slice(-1)[0];

    const newStatValue = parseInt(playerStatAmount) + parseInt(amount);

    let updates = await playerStat.map(i=>({_id:i.id,text:`${playerStatText[0]} ${newStatValue}`}));
    canvas.scene.updateEmbeddedDocuments("Drawing",updates);
  } else {
    console.log(`${gameName} | Error: Unable to find stat with tags ${statTags.toString()}`)
  }
}