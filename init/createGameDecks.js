/**
 * Create the Game Decks, including Decks for Actors that have Owners.
 */
// createGameDecks()
// Macro Name: Create Game Decks
// Run As GM: false
// Has Widget: false

const gameName = "The Inn";
const mainDeckBaseName = 'Main';
const drinkDeckBaseName = 'Drink';
const discardDeckSuffix = 'Discard';
const deckSuffix = 'Deck';
const innDeckName = `${gameName} ${drinkDeckBaseName} ${deckSuffix}`;
const innDiscardName = `${gameName} ${drinkDeckBaseName} ${discardDeckSuffix}`;


/**
 * Create a Cards Folder with the Actor's Name, if it doesn't already exist.
 * @param {string}     actorName  The name of the actor with which the folder will be named.
 * @return {string}    The id of the referenced Cards folder.
 */
async function createActorCardsFolder(actorName) {
  console.log(`[${gameName}] Creating folder for ${actorName}.`)
  let existingFolder = await game.cards.directory.folders.filter(d=>d.name === actorName);
  if (existingFolder.length === 0) {
    let newFolder = await Folder.create({name: actorName, type: "Cards", description: "Character cards"});
    console.log(newFolder.id);
    return newFolder.id;
  } else {
    console.log(`[${gameName}] Skipping creation of folder ${existingFolder}, as it already exists`);
    console.log(existingFolder[0].id);
    return existingFolder[0].id;
  }
}

/**
 * Create a Card Stack if it doesn't already exist.
 * @param {string}     stackName  The name of the stack with which the stack will be named.
 * @param {string}     stackType  The type of Card stack to create.  e.g., "hand", "pile"
 * @param {string}     folderId   The id of the folder in which the stack should go.
 * @return {string}    The id of the referenced Cards stack.
 */
async function createCardStack(stackName, stackType, folderId, permsOwner='', permsLevel=1) {
  let existingStack = game.cards.getName(stackName);
  let stackPerms = {};
  if (permsOwner !== '') stackPerms[permsOwner]=permsLevel;
  if (typeof existingStack === 'undefined') {
    let newStack = await Cards.create({
                      name: stackName,
                      type: stackType,
                      width: 2,
                      height: 3,
                      rotation: 0,
                      folder: folderId,
                      sort: 0,
                      permission: stackPerms
                    });
    return newStack.id;
  } else {
    console.log(`Skipping creation of stack ${stackName}, as it already exists`);
    return existingStack.id;
  }
}


let allPlayers = game.users.filter(d=>d.hasPlayerOwner === true);
let folderId = '';

allPlayers.forEach(async function(p){
  const mainDeckName = p.character.name + ' ' + mainDeckBaseName + ' ' + deckSuffix;
  const mainDiscardDeckName = p.character.name + ' ' + mainDeckBaseName + ' ' + discardDeckSuffix;
  const drinkDeckName = p.character.name + ' ' + drinkDeckBaseName + ' ' + deckSuffix;
  const drinkDiscardDeckName = p.character.name + ' ' + drinkDeckBaseName + ' ' + discardDeckSuffix;
  const playerId = p.id;
  const folderId = await createActorCardsFolder(p.character.name);

  if (folderId != '') {
    await createCardStack(mainDeckName, "pile", folderId, playerId, 1);
    await createCardStack(mainDiscardDeckName, "pile", folderId, playerId, 3);
    await createCardStack(drinkDeckName, "pile", folderId, playerId, 1);
    await createCardStack(drinkDiscardDeckName, "pile", folderId, playerId, 3);
    await createCardStack(p.character.name + ' Hand', "hand", folderId, playerId, 3);
  }
});
await createCardStack(innDeckName, "pile", null);
await createCardStack(innDiscardName, "pile", null);
