import { clearHeader, clearMain, clearTicker, continueButtonPromise, displayHud, displayInTicker, displayPhase, returnCardsOfTypeInLocation, setEventListnersOnCards } from "./cardDisplay.js";
import { returnCardFromID } from "./utilities.js";

const turnRetreatActive = async (player, opposingPlayer, activeSwitched) => {
    // 0. Clear display & new display
    clearHeader();
    clearMain();
    displayPhase('*** Choose a new Active Pokemon from your Bench.***');
    displayHud(player, opposingPlayer);
    
    // 0. Create done button promise
    // let continueButtonPromiseHolder = continueButtonPromise('Done', 'ticker');
    
    //Checking if active was already switched in turn
    if (activeSwitched) {
        displayInTicker('You can only switch your active once per turn.')
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
        return activeSwitched;
    }

    let retreatCost = player.active.retreatCost;

    if(!player.active.checkEnergies(retreatCost)){
        displayInTicker(`${player.active.name} does not have enough energy to retreat.`);
        let continueButtonPromiseHolder = await continueButtonPromise('Go back to Actions', 'ticker');
        return activeSwitched;
    }

    switch (true){
        case player.bench.length >= 2: {
            displayInTicker('Choose your new active from the bench.')

            // Getting pokemon on bench
            let htmlPokemonCards = returnCardsOfTypeInLocation(`bench${player.playerNumber}`, 'pokemonCard');
            
            // Waiting for selection
            let chosenPokemonID = await setEventListnersOnCards(htmlPokemonCards);

            chosenPokemonID = Number(chosenPokemonID);
            let chosenCard1 = returnCardFromID(player.bench, chosenPokemonID);
            
            // Removing retreat energy cost, switching active and displaying
            chosenCard1 = player.extractCardOutOfBench(chosenPokemonID);
            player.active.payEnergyCost(retreatCost);
            clearTicker();
            displayInTicker(`Sending ${player.active.name} to bench.`);
            player.addToBench(player.active);
            player.active = chosenCard1;
            displayInTicker(`${chosenCard1.name} is your new active.`);
            activeSwitched = true;
            break;
        }
        case player.bench.length === 1: {
            
            // Checking energy cost
            let chosenCard1 = returnCardFromID(player.bench, player.bench[0].id);

           // Switching active and displaying
           chosenCard1 = player.extractCardOutOfBench(player.bench[0].id);
           player.active.payEnergyCost(retreatCost);
           clearTicker();
           displayInTicker(`Sending ${player.active.name} to bench.`);
           player.addToBench(player.active);
           player.active = chosenCard1;
           displayInTicker(`${chosenCard1.name} is your new active.`);
           activeSwitched = true;
           break;
        }
        case player.bench.length === 0: {
            // Display
            clearTicker();
            displayInTicker('You cannot switch active because your bench is empty.');
            break;
        }
    }
    clearMain();
    displayHud(player, opposingPlayer);
    let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    return activeSwitched;
}

export {turnRetreatActive}