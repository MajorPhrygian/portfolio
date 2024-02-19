import { setEventListnersOnCards, returnCardsOfTypeInLocation, clearTicker, displayPhase, displayInTicker, clearMain, clearHeader, continueButtonPromise, displayHud } from "./cardDisplay.js";
import { jumpTo } from "./utilities.js";


const turnAttachingEnergies = async (player, opposingPlayer, attachEnergyIsDone) => {
    clearHeader();
    displayPhase('***Attaching Energy cards.***');

    if (attachEnergyIsDone) {
        displayInTicker('You can only attach one energy card per turn.');
        await continueButtonPromise('Go back to Actions', 'ticker');
        return attachEnergyIsDone;
    }

    if (!player.isThereEnergyInHand()) {
        displayInTicker('You have no energy card in hand.');
        await continueButtonPromise('Go back to Actions', 'ticker');
        return attachEnergyIsDone;
    }

    displayInTicker('Click on an energy card to select it. Then, click on a pokemon from your bench or on your active pokemon to give it the energy.');
    let continueButtonPromiseHolder = continueButtonPromise('Go back to Actions', 'ticker');

    // Getting energy card choice
    let htmlEnergyCards = returnCardsOfTypeInLocation(`hand${player.playerNumber}`, 'energyCard');
    let chosenEnergyCardID = setEventListnersOnCards(htmlEnergyCards).then((id)=>{
        chosenEnergyCardID = id;
    });
    
    // Waiting for either a Skip Step button click or an Energy Card pick.
    let outcome = await Promise.race([continueButtonPromiseHolder, chosenEnergyCardID]);
    if (outcome === 'Clicked') {
        return attachEnergyIsDone;
    }
    
    // Getting pokemon card choice
    let htmlPokemonActiveCard = returnCardsOfTypeInLocation(`active${player.playerNumber}`,'pokemonCard');
    let htmlPokemonBenchCards = returnCardsOfTypeInLocation(`bench${player.playerNumber}`,'pokemonCard');

    let chosenActivePokemonID;
    let chosenBenchPokemonID;
    
    let chosenActivePokemonPromise = setEventListnersOnCards(htmlPokemonActiveCard).then((id)=>{
        chosenActivePokemonID = id;
    });
    let chosenBenchPokemonPromise = setEventListnersOnCards(htmlPokemonBenchCards).then((id)=>{
        chosenBenchPokemonID = id;
    });
    

    // Waiting for either a Skip Step button click or a Bench Pokemon Card pick or an Active Pokemon Card pick.
    let outcome2 = await Promise.race([continueButtonPromiseHolder, chosenBenchPokemonPromise, chosenActivePokemonPromise]);
    if (outcome2 === 'Clicked') {
        return attachEnergyIsDone;
    }

    // Adding the energy to the Pokemon
    let pokemonName;
    let chosenPokemonID;
    chosenEnergyCardID = Number(chosenEnergyCardID);
    let energyCard = player.extractCardOutOfHand(chosenEnergyCardID);
    attachEnergyIsDone = true;

    // Case if chosen Pokemon is Active
    if (typeof chosenActivePokemonID === 'string') {
        chosenPokemonID = Number(chosenActivePokemonID);
        pokemonName = player.active.name;
        player.active.addEnergy(energyCard);
    } else {
        // Case if chosen Pokemon is from Bench
        chosenPokemonID = Number(chosenBenchPokemonID);
        player.bench.forEach(card => {
            if (card.id === chosenPokemonID) {
                pokemonName = card.name;
                card.addEnergy(energyCard);
            }
        });
    }

    // Displaying results

    jumpTo('header');
    clearTicker();
    clearMain();
    displayHud(player, opposingPlayer);
    displayInTicker(`Energy added to ${pokemonName}.`);
    await continueButtonPromise('Go back to Actions', 'ticker');
    attachEnergyIsDone = true;
    return attachEnergyIsDone;
}

export {turnAttachingEnergies}