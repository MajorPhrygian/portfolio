import {displayInTicker, continueButtonPromise} from "/ressources/javascripts/cardDisplay.js";
import {clearHeader, clearMain, clearTicker, displayCardArrayInHeader, displayHud, displayPhase, returnCardsOfTypeInLocation, setEventListnersOnCards } from "./cardDisplay.js";

const choosingActive = async (activePlayer, otherPlayer) => {
    clearHeader();
    clearMain();

    // This function is for the Setup part of the game
    let activeChosen = false;
    while (!activeChosen){
        // calling the function to splice basics from the hand
        let displayArray = activePlayer.handBasics;

        // Checking for number of basics in Array and displaying accordingly
        // Case 1 : multiple basics
        if(displayArray.length > 1){
            displayInTicker(`Player ${activePlayer.playerNumber}: Choose your active Pokemon.`);

            displayCardArrayInHeader(displayArray, 'bench-basics');
            let htmlPokemonCards = returnCardsOfTypeInLocation('bench-basics','pokemonCard');

            // let activeChoiceName = [await cardChoicePromise()];
            let activeChoiceID = await setEventListnersOnCards(htmlPokemonCards);
            activeChoiceID = Number(activeChoiceID);

            let chosenActiveCard = activePlayer.extractCardOutOfHand(activeChoiceID);

            // Comparing name to basic pokemon array + setting choice as active
            displayInTicker(`Promoting ${chosenActiveCard.name} to active.`);
            activePlayer.active = chosenActiveCard;
            
            // stops the loop
            activeChosen = true;
            await continueButtonPromise();
        }
        // Case 2 : only 1 basic
        else if (displayArray.length === 1){
            displayInTicker(`Player ${activePlayer.playerNumber}, promoting ${displayArray[0].name} to active, the only basic Pokemon from your hand.`);
            // setting new active
            let activeChoiceID = displayArray[0].id;
            let chosenActiveCard = activePlayer.extractCardOutOfHand(activeChoiceID);
            activePlayer.active = chosenActiveCard;
            
            // stops the loop
            activeChosen = true;
            await continueButtonPromise();
        }

        // Case 3 : no basic
        else {
            displayInTicker(`Player ${activePlayer.playerNumber}, you do not have any basic Pokemon in your Hand. Reshuffling and your adversary gets one extra card.`);
            
            // putting hand back in deck, reshuffling and drawing new hand
            activePlayer.hand.splice(0,7).forEach(card => {
               activePlayer.addCardToDeck(card); 
            });
            activePlayer.shuffleDeck();
            activePlayer.drawFromDeck(7);

            // opposing player draws the extra card
            otherPlayer.drawFromDeck(1);
        }
    }
}

// This function is called by turnManager() when, at the beginning of a turn, it finds that the player has no Active Pokemon
const choosingActiveTurn = async (player, opposingPlayer) => {
    // 0. Clear display & new display
    clearHeader();
    clearMain();
    displayPhase('*** Choose a new Active Pokemon from your Bench.***');
    displayHud(player, opposingPlayer);
    
    // 0. Create done button promise
    // let continueButtonPromiseHolder = continueButtonPromise('Done', 'ticker');

    switch (true){
        case player.bench.length >= 2: {
            displayInTicker('Choose your new active from the bench.')

            // Getting pokemon on bench
            let htmlPokemonCards = returnCardsOfTypeInLocation(`bench${player.playerNumber}`, 'pokemonCard');
            
            // Waiting for selection
            let chosenPokemonID = await setEventListnersOnCards(htmlPokemonCards);

            chosenPokemonID = Number(chosenPokemonID);
            
            // Removing retreat energy cost, switching active and displaying
            let chosenCard1 = player.extractCardOutOfBench(chosenPokemonID);
            clearTicker();
            player.active = chosenCard1;
            displayInTicker(`${chosenCard1.name} is your new active.`);
            break;
        }
        case player.bench.length === 1: {
           // Switching active and displaying
           let chosenCard1 = player.extractCardOutOfBench(player.bench[0].id);
           clearTicker();
           player.active = chosenCard1;
           displayInTicker(`${chosenCard1.name} is your new active.`);
           break;
        }
    }
    let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    return;
}

export {choosingActiveTurn, choosingActive};