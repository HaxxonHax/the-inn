# The Inn

The Inn is a game plugin for Foundry based off Slugfest Games's great game Red Dragon Inn.  It uses a more simplistic system of cards than Red Dragon Inn.  If you would like to extend this game, you will need to purchase a copy of Red Dragon Inn and create the cards you wish to play with.

# Foundry Game Structure

None of the decks will use the "Deck" type of card stack.  The "Deck" type works well in single-deck games, but when dealing from one main deck to another similar main deck, "dealing" can be connfusing.  The following will have the "Pile" type of card stacks:

- Inn Drink Deck
- Main Deck (per character)
- Drink Deck (per character)
- Main Discard (per character)
- Drink Discard (per character)

The Hands for each player will utilize the "Hand" type of card stacks.

# Decks and Ownership

Ownership per character is outlined as such:

  - Inn Drink Deck - Observer
  - Main Deck (per character) - Observer
  - Drink Deck (per character) - Observer
  - Main Discard (per character) - Owner
  - Drink Discard (per character) - Owner

Allowing the ownership of "Observer" gives each player the ability to shuffle the decks.  This will require the Deck piles (not Discards or Hand) to be face-down and any "draw" or "play" routines to flip the card face-up.

# Setup

Create the following Macros (folder structure is optional, but helps to keep organized):

   The Inn (Folder)
   - character (Folder)
   - - Draw Cards: character/drawACard.js
   - - Play A Card: character/playACard.js
   - - Shuffle Character Deck: character/shuffleCharacterDeck.js
   - consumables (Folder)
   - - Buy A Drink: consumables/buyADrink.js
   - - Shuffle Drinks: consumables/shuffleDrinks.js
   - - Take A Drink: consumables/takeADrink.js
   - lib (Folder)
   - - Deal Card As Actor: lib/dealCardAsActor.js
   - - Shuffle Deck: lib/shuffleDeck.js
   - - Update Tile Image: lib/updatePlayTile.js
   - init (Folder)
   - - Create Game Decks: init/createGameDecks.js
