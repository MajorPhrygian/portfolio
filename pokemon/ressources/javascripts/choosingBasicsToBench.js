import {displayInTicker, continueButtonPromise} from "/ressources/javascripts/cardDisplay.js";
import { clearCardDisplay, clearMain, displayCardArrayInHeader, displayHud, returnCardsOfTypeInLocation } from "./cardDisplay.js";

const choosingBasicsToBench = async (player, opposingPlayer, isSetup)=>{
    // clearMain();
    // clearHeader();

    // calling the function to get basics from the hand
    let displayArray = player.handBasics;

    // Checking for number of basics in Array and displaying accordingly
    // Case 1 : there are basics
    if(displayArray.length > 0){
        displayInTicker(`Player ${player.playerNumber}, choose the basic pokemons you want to bench.`);
        displayCardArrayInHeader(displayArray, 'bench-basics');

        let htmlPokemonCards = returnCardsOfTypeInLocation('bench-basics','pokemonCard');
        let chosenPokemonCardIDs = [];

        for (let x = 0; x < htmlPokemonCards.length; x++) {
            htmlPokemonCards[x].addEventListener('click', () => {
                // retrieving the id from the chosen HTML card
                htmlPokemonCards[x].style.border = 'black 2px solid';
                chosenPokemonCardIDs.push(Number(htmlPokemonCards[x].id));
            })
        };

        // checking if there is enough places on the bench
        let benchPlacesRemaining = 5 - player.bench.length;
        if (benchPlacesRemaining < chosenPokemonCardIDs.length) {
            displayInTicker('Bench size is 5 max. Choose accordingly.')
            await continueButtonPromise('Go back to Actions', 'card-display');
            return;
        }

        let pokemonToBench;
        await continueButtonPromise('Done', 'card-display');
        chosenPokemonCardIDs.forEach(id => {
            pokemonToBench = player.extractCardOutOfHand(id);
            player.addToBench(pokemonToBench);
            displayInTicker(`Benching ${pokemonToBench.name}.`)
        });
        clearCardDisplay();
        
        if (!isSetup) {
            clearMain();
            displayHud(player, opposingPlayer);
            await continueButtonPromise('Go back to Actions', 'card-display');
        }
    }
    // Case 2 : no basic
    else {
        displayInTicker(`Player ${player.playerNumber}, you do not have any basic Pokemon to bench.`);
        await continueButtonPromise('Done', 'card-display');
    }
};



export {choosingBasicsToBench};
