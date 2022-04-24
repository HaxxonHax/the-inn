# The Inn

The Inn is a set of macros and resources for [Foundry VTT](https://foundryvtt.com/) based off Slugfest Games's great game [Red Dragon Inn](https://slugfestgames.com/).  It uses a more simplistic system of cards than Red Dragon Inn.  If you would like to extend this game, you will need to purchase a copy of Red Dragon Inn and create the cards you wish to play with.


# Why

Why create this?  First, my friends and I love playing Red Dragon Inn, but we don't live near each other anymore and some don't have PCs that can run most tabletop simulation software (some only have tablets).  Second, I enjoy programming challenges and Foundry VTT provides an API that allowed me to challenge myself to create a game that can be played adjacent to and within our normal RPG games.


# Foundry VTT Requirements

The following modules will need to be installed for your world:

- [Advanced Macros](https://foundryvtt.com/packages/advanced-macros)
- [Monk's Active Tile Triggers](https://foundryvtt.com/packages/monks-active-tiles)
- [Tagger](https://foundryvtt.com/packages/tagger)


# Card Piles Structure in Foundry VTT

The card piles can be created using the macros in the `init` macro folder (see **Setup** below).  None of the card stacks will use the "Deck" type of card stack.  The "Deck" type works well in single-deck games, but when dealing from one main deck to another similar main deck, "dealing" can be confusing.  The following will have the "Pile" type of card stacks:

- The Inn Drink Deck
- The Inn Drink Discard
- Main Deck (per character)
- Drink Deck (per character)
- Main Discard (per character)
- Drink Discard (per character)

The card piles for each player will utilize the "Hand" type of card stacks.  For simplicity, this implementation does not utilize any flipping of the cards.  When creating your decks, ensure all the faces are up.


# Deck Piles and Ownership

The default ownership should be set to "none", with the exception of the Inn Drink Deck, which should be "limited" for all players.  Ownership per character is outlined as such:

  - The Inn Drink Deck - Limited or None
  - The Inn Drink Discard - Limited or None
  - Main Deck (per character) - Limited
  - Drink Deck (per character) - Limited
  - Main Discard (per character) - Owner
  - Drink Discard (per character) - Owner


# Setup

Before creating the macros and tiles, install and enable the required modules (see Requirements).  The following macros can be pulled in from the compendium in the `packs` directory.  You can also manually create them from the folders in this repo, keeping Names as such (folder structure is optional, but helps to keep organized):

- The Inn (Folder)
  - character (Folder)
    - Draw Cards: character/drawCards.js
    - End Turn: character/endTurn.js
    - Play A Card: character/playACard.js
    - Shuffle Character Deck: character/shuffleCharacterDeck.js
    - Update My Stats: character/updateMyStats.js
    - View My Cards: character/viewMyCards.js
  - consumables (Folder)
    - Order A Drink: consumables/orderADrink.js
    - Shuffle Drinks: consumables/shuffleDrinks.js
    - Take A Drink: consumables/takeADrink.js
  - gold (Folder)
    - Gambling: gold/gambling.js
    - Pay Gold: gold/payGold.js
  - init (Folder)
    - Create Buttons On Scene: init/createButtonsOnScene.js
    - Create Cards On Scene: init/createCardsOnScene.js
    - Create Game Decks: init/createGameDecks.js
    - Create Stat Buttons On Scene: init/createStatButtonsOnScene.js
    - Create Stats On Scene: init/createStatsOnScene.js
    - Run All Inits: init/runAllInits.js
  - lib (Folder)
    - Collect Discards: lib/collectDiscards.js
    - Deal Card As Character: lib/dealCardAsCharacter.js
    - Resolve Collect Pot: lib/resolveCollectPot.js
    - Resolve Pay Gold: lib/resolvePayGold.js
    - Resolve Take A Drink: lib/resolveTakeADrink.js
    - Shuffle Deck: lib/shuffleDeck.js
    - Update Character Stat: lib/updateCharacterStat.js
    - Update Tile Image: lib/updateTileImage.js

Once the initial setup is created, you will need to transfer the files in the `Tiles/buttons` subfolder of this repository to your **Foundry Data** directory, under the subfolder structure `Tiles/buttons`.  For example, on my Linux system, these reside in `/home/foundryvtt/foundrydata/Data/Tiles/buttons`.  You can now create a scene that will act as the game board.  Ensure all players have a  associated with them before running the init macros.  These initialization macros can be run in any order, or the **Run All Inits** macro will run them in succession.  The next step is to bring your characters onto the scene and import the decks.  After the decks are imported, it is easiest to copy them and rename them as noted above, allowing the proper ownership.

1. Create macros.
2. Upload button images (`Tiles/buttons` -> `Tiles/buttons`).
3. Assign characters to players.
4. Create game board scene.
5. Run init macros.
6. Import card piles of the drink deck and character decks.
7. Duplicate/rename card piles of select character decks to each "<PlayerCharacter> Main Deck".
8. Drag the player character tokens onto the scene.
9. Unpause the game.
10. Roll for Initiative.
11. Start combat.
12. Play the game.


# Importing Decks

The JSON files in the `Cards` directory can be imported to bring in the decks.  Currently, the JSON files include the text and values needed to play the game, but not the images.  Due to copyright restrictions, I am unable to provide the images for the characters, so you will have to find some online or scan/import your own.  I did ask Slugfest games for permission to include the games, but they replied (expectedly) that "cannot grant permission to publicly post images of our Red Dragon Inn decks on GitHub".  I'm currently having private discussions with my friends on Discord about the best way to resolve this.


# How to Play

I'm not including the rules here.  I'm a big encourager of supporting game creators, so you can purchase the game from [Slugfest Games](https://slugfestgames.com/).


# Importing Other Decks from Steam Workshop

Hypothetically, you could import cards from games on Tabletop Simulator Workshop, but you'd have to know which json file to parse.  You also would need to know which nth item of ObjectStates maps to each character.  For example, I found one called 648233037 and used `jq` to create a new object.

If you wanted to play that game, it takes a lot of work.  Hypothetically, one would do the following:

1. Purchase the base game from [Slugfest Games](https://slugfestgames.com/).
2. Purchase any additional game expansions from [Slugfest Games](https://slugfestgames.com/).
3. Purchase Tabletop Simlator and subscribe to the game on the Workshop.
3. Find the json object in your Workshops folder.
4. Use a JSON parser to map the `n`th object in the `.Objectstates[n]` to the deck whose item you want (e.g. `.ObjectStates[10]` -> **Wulf the Glorious** [disclaimer: Wulf is not real])

For example, I [Installed JQ](https://stedolan.github.io/jq/download/), then used JQ to parse the data into a JSON that can be imported into Foundry VTT:
```
cat 648233037.json | jq '.ObjectStates[3].ContainedObjects[0].ContainedObjects[] | { "name": .Nickname, "type": .Description, "description": .Nickname, "data": {}, "suit": "", "value": .Value, "back": { "name": "Dimli the Dwarf", "text": "Dimli the Dwarf", "img": "Cards/base/dimli/dimli-the-dwarf-back.png" }, "faces": [{ "name": .Nickname, "img": ("Cards/base/dimli/" + (.Nickname | ascii_downcase | gsub("[^[:alnum:][:space:]]";"") | gsub(" ";"-") | gsub("$";".png") )), "text": "" }], "face":0, "drawn": false, "width": 2, "height": 3, "rotation": 0, "flags": {} }' | jq -s .

cat 648233037.json | jq '.ObjectStates[11].ContainedObjects[0].ContainedObjects[] | { "name": .Nickname, "type": "base", "description": .Nickname, "data": { "type": .Description }, "suit": "", "value": .Value, "back": { "name": "Zot the Wizard", "text": "Zot the Wizard", "img": "Cards/base/zot/zot-the-wizard-back.png" }, "faces": [{ "name": .Nickname, "img": ("Cards/base/zot/" + (.Nickname | ascii_downcase | gsub("[^[:alnum:][:space:]]";"") | gsub(" ";"-") | gsub("$";".png") )), "text": "" }], "face":0, "drawn": false, "width": 2, "height": 3, "rotation": 0, "flags": {} }' | jq -s . | jq '{ "name": "Zot the Wizard", "type": "pile", "description": "", "img": "Cards/base/zot/zot-the-wizard-back.png", "data": {}, "cards": . }'
```

5. Purchase merch from [Slugfest Games](https://slugfestgames.com/merch/).


# Notes

The `createTilesOnScene.js` macro creates the tile buttons and the action configuration for them.  However, I was unable to create the sheets (`ActionConfig` from monks-active-tiles), so modifying them manually is not an option; you would instead have to delete them and re-create them to make them modifiable.


# Supporting the author

I did not write Red Dragon Inn, but wrote these libraries and macros that allow the game to be played over Foundry VTT.  If you would like to support the development that I do and would like to see more things like this, you can [Buy me a Coffee](https://www.buymeacoffee.com/haxxonhax), where all money gets donated to [CMTA USA](https://www.cmtausa.org/).  You can also donate directly to [CMTA USA](https://www.cmtausa.org/)).

If you have a request for a game, feel free to reach me on Discord.
