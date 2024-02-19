// This is the part of the turn where player can evolve a pokemon

import { clearHeader, clearMain, clearTicker, continueButtonPromise, displayHud, displayInTicker, displayPhase, returnCardsOfTypeInLocation, setEventListnersOnCards } from "./cardDisplay.js";
import { returnCardFromID } from "./utilities.js";

const turnEvolvePokemons = async (player, opposingPlayer)=>{;
    // 0. Clear display & new display
    clearHeader();
    clearMain();
    displayPhase('*** Choose a Level 1 or Level 2 Pokemon from your hand.***');
    displayHud(player, opposingPlayer);
    
    // 1. Check if it is the first turn. You can't evolve on first turn
    if (player.turnPlayed === 0) {
        displayInTicker(`You cannot evolve a Pokemon on your first turn.`)
        await continueButtonPromise('Return to Actions', 'ticker');
        return;
    }

    // 2. Get html hand pokemon
    let htmlPokemonHandCards = returnCardsOfTypeInLocation(`hand${player.playerNumber}`, 'pokemonCard');

    // 3. Create a Done promise and a Chosen Evolution promise
    let continueButtonPromiseHolder = continueButtonPromise('Go Back to Actions', 'ticker');
    let chosenHandCardID = setEventListnersOnCards(htmlPokemonHandCards).then((id)=>{
        chosenHandCardID = Number(id);
    });

    // 4. Promise.race : Done or Chosen
    let outcome = await Promise.race([continueButtonPromiseHolder, chosenHandCardID]);
    if (outcome === 'Clicked') {
        // 4.1 If Done, return resolved promise
        return null;
    }
        
    // 5. Get the array of all basics and level 1 pokemons on bench and in active
    let htmlPokemonBenchCards = returnCardsOfTypeInLocation(`bench${player.playerNumber}`, 'pokemonCard');
    let htmlPokemonActiveCard = returnCardsOfTypeInLocation(`active${player.playerNumber}`, 'pokemonCard');
    let chosenActivePokemonID;
    let chosenBenchPokemonID;

    // 6. Set eventlisteners on them
    let chosenActivePokemonPromise = setEventListnersOnCards(htmlPokemonActiveCard).then((id)=>{
        chosenActivePokemonID = Number(id);
    });
    let chosenBenchPokemonPromise = setEventListnersOnCards(htmlPokemonBenchCards).then((id)=>{
        chosenBenchPokemonID = Number(id);
    });

    // 7. Promise.race : Done or Chosen
    let outcome2 = await Promise.race([continueButtonPromiseHolder, chosenBenchPokemonPromise, chosenActivePokemonPromise]);
    if (outcome2 === 'Clicked') {
        // 7.1 If Done, return resolved promise
        return null;
    }
    
    // 8.1 Find the evolver
    let evolverCard = returnCardFromID(player.hand, chosenHandCardID);
    
    //8.2 Find the evolved
    let evolvedLocation = 'bench'; 
    let evolvedCard = returnCardFromID(player.bench, chosenBenchPokemonID);
    if (evolvedCard === null) {
        evolvedCard = player.active;
        evolvedLocation = 'active';
    }

    // 8.3 Check if the evolved Pokemon is not on its first turn into play. 
    if (evolvedCard.turnNumberWhenPlayed === player.turnPlayed) {
        clearTicker()
        displayInTicker(`${evolvedCard.name} cannot evolve on its first turn in play.`)
        await continueButtonPromise('Return to Actions', 'ticker');
        return;
    }

    // 8.4 Check both chosen pokemons for compatibility
    if (evolvedCard.name !== evolverCard.evolvesFrom) {
        // 8.4.1 If incompatibe, reset;
        clearTicker();
        displayInTicker(`${evolverCard.name} does not evolve from ${evolvedCard.name}.`)
        await continueButtonPromise('Return to Actions', 'ticker');
        return;
    } 

    // 9. Apply HP loss to higher pokemon
    let hpLoss = evolvedCard.hpOriginal - evolvedCard.hpCurrent;
    evolverCard.hpModifier(-hpLoss);

    // 10. Transfer energies from lower to higer pokemon
    let transferEnergies = evolvedCard.energies;
    transferEnergies.forEach(energy => {
        evolverCard.addEnergy(energy);
    });

    // 10.5 Update turnNumberWhenPlayed value of the evolver Pokemon to refect it is new in play
    evolverCard.turnNumberWhenPlayed = player.turnPlayed;

    // 11. Extract higher pokemon and replace lower with it 
    if (evolvedLocation === 'active') {
        player.active = player.extractCardOutOfHand(evolverCard.id);
    } else{
        player.extractCardOutOfBench(evolvedCard.id);
        player.addToBench(player.extractCardOutOfHand(evolverCard.id));
    }


    // 11.5 Display
    clearMain();
    displayHud(player, opposingPlayer);
    clearTicker();
    displayInTicker(`${evolvedCard.name} has evolved into ${evolverCard.name}.`)
    await continueButtonPromise('Return to Actions', 'ticker');

    // 12. Return resolved promise
    return;
}
export {turnEvolvePokemons};