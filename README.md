# The Tavern

The Tavern is a game plugin for Foundry based off Slugfest Games's great game Red Dragon Inn.  It uses a more simplistic system of cards than Red Dragon Inn.  If you would like to extend this game, you will need to purchase a copy of Red Dragon Inn and create the cards you wish to play with.

# Foundry Game Structure

The following will have the "Deck" type of card stacks:

- Tavern Drink Deck
- Main Deck (per character)

For simplicity, this does not utilize any flipping of the cards.  The flipping of the cards only affects the image and not the cards When creating the decks, ensure all the faces are up.

# Decks and Ownership

With the exception of the Tavern Drink Deck, The ownership of the decks must be owned by the actor controlling them.  Although this does allow for the actor to be able to view their Main Decks, most of the game play will be done through the scene.

  Tavern Drink Deck - Limited


# Setup

Create the following Macros (folder structure is optional, but helps to keep organized):

   TheInn (Folder)
   - character (Folder)
   - - Draw Cards: character/drawacard.js
   - - Play A Card: character/playacard.js
   - - Shuffle Character Deck: character/shufflecharacterdeck.js
   - drinks (Folder)
   - - Buy A Drink: consumables/buyadrink.js
   - - Shuffle Drinks: consumables/shuffledrinks.js
   - - Take A Drink: consumables/takeadrink.js
   - lib (Folder)
   - - Deal Card As Actor: lib/dealCardAsActor.js
   - - Shuffle Deck: lib/shuffleDeck.js
   - - Update Tile Image: lib/updatePlayTile.js
