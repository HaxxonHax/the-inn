# The Inn

The Inn is a game plugin for Foundry based off Slugfest Games's great game Red Dragon Inn.  It uses a more simplistic system of cards than Red Dragon Inn.  If you would like to extend this game, you will need to purchase a copy of Red Dragon Inn and create the cards you wish to play with.

# Foundry Game Structure

None of the decks will use the "Deck" type of card stack.  The "Deck" type works well in single-deck games, but when dealing from one main deck to another similar main deck, "dealing" can be connfusing.  The following will have the "Pile" type of card stacks:

- Inn Drink Deck
- Main Deck (per character)
- Drink Deck (per character)
- Main Discard (per character)
- Drink Discard (per character)

The Hands for each player will utilize the "Hand" type of card stacks.  For simplicity, this implementation does not utilize any flipping of the cards.  The flipping of the cards only affects the image and not the cards When creating the decks, ensure all the faces are up.

# Decks and Ownership

The default ownership should be set to "none", with the exception of the Inn Drink Deck, which should be "limited" for all players.  Ownership per character is outlined as such:

  - Inn Drink Deck - Limited
  - Main Deck (per character) - Limited
  - Drink Deck (per character) - Limited
  - Main Discard (per character) - Owner
  - Drink Discard (per character) - Owner

# Setup

Create the following Macros, keeping Names as such (folder structure is optional, but helps to keep organized):

   The Inn (Folder)
   - character (Folder)
   - - Draw Cards: character/drawACard.js
   - - Play A Card: character/playACard.js
   - - Shuffle Character Deck: character/shuffleCharacterDeck.js
   - - Update My Stats: character/updateMyStats.js
   - - View My Cards: character/viewMyCards.js
   - consumables (Folder)
   - - Order A Drink: consumables/orderADrink.js
   - - Shuffle Drinks: consumables/shuffleDrinks.js
   - - Take A Drink: consumables/takeADrink.js
   - gold (Folder)
   - - Gambling: gold/gambling.js
   - - Pay Gold: gold/payGold.js
   - init (Folder)
   - - Create Buttons On Scene: init/createButtonsOnScene.js
   - - Create Cards On Scene: init/createCardsOnScene.js
   - - Create Game Decks: init/createGameDecks.js
   - - Create Stat Buttons On Scene: init/createStatButtonsOnScene.js
   - - Create Stats On Scene: init/createStatsOnScene.js
   - - Run All Inits: init/runAllInits.js
   - lib (Folder)
   - - Collect Discards: lib/collectDiscards.js
   - - Deal Card As Actor: lib/dealCardAsActor.js
   - - Resolve Collect Pot: lib/resolveCollectPot.js
   - - Resolve Pay Gold: lib/resolvePayGold.js
   - - Resolve Take A Drink: lib/resolveTakeADrink.js
   - - Shuffle Deck: lib/shuffleDeck.js
   - - Update Actor Stat: lib/updateActorStat.js
   - - Update Tile Image: lib/updateTileImage.js

Once the initial setup is created, you can create a scene.  Note that all actors must have a user associated with them before running the init macros.  These initialization macros can be run in any order, or the **Run All Inits** macro will run them in succession.  The next step is to bring your actors onto the scene and import the decks.  After the decks are imported, it is easiest to copy them and rename them as noted above, allowing the proper ownership.

# Notes

The `createTilesOnScene.js` macro creates the tile buttons and the action configuration for them.  However, I was unable to create the sheets (`ActionConfig` from monks-active-tiles), so modifying them manually is not an option; you would instead have to delete them and re-create them to make them modifiable.
