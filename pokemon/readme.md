# POKEMON CARD GAME PROJECT

## DESCRIPTION
This project aims to recreate the pokemon card game on a website. It uses only HTML, CSS, and vanilla Javascript. Some prior knowledge of how the game works is assumed as no tutorial is provdided. 
Two deck of cards are provided: a Chien-Pao water deck and a Lucario fighting deck, which are classic pre-built decks that you can buy. 
To play, both players have to play on the same devise, passing it from one player to player as the turns come and go. 

## OBJECTIVES
The main objective of this project is for me to put into practice my learnings made on the Codecademy full stack learning path. As well, a second objective is to serve as a testament to my passion and dedication for coding. 

## COMPONENTS
There are 1 html file, 1 css file, and 23 javascript components. 
* main.js is called.
* gamesetup.js is then called to distribute cards and have players make their opening choices. 
* then, matchManager.js takes over. It will call the turnmanger.js in alternance for each player.
* the turn manager will guide players through their turn. First through picking a card, then looping through the option, then going to the attach phase, checking for 0 hp pokemons, checking for victory conditions, and finally doing any end of turn housekeeping functions. 
* There are three win conditions : knocking out all your opponent's pokemons, picking all your prize cards, or if your opponent empties his deck. 

## LEARNINGS
Before learning about asyncs functions, I could not make any progress. With async / await in hand, everything got much easier. I got to practice a lot array manipulations. Although I dropped my unit tests halfway through, I loved doing it and could not see myself doing the next project withoug them. I already know that I should have used array.filter() and array.map() more. 

## FUTURE
A future improvement would be to allow players to play from seperate devices, through the web. 