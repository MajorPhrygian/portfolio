import { clearHeader, clearMain, clearTicker, continueButtonPromise, displayHud, displayInTicker, displayPhase, returnCardsOfTypeInLocation, setEventListnersOnCards } from "./cardDisplay.js";
import { returnCardFromID } from "./utilities.js";

const turnPlayTrainer = async (player, opposingPlayer, supporterPlayed) => {
    // 0. Clear display & new display
    clearHeader();
    clearMain();
    displayPhase('*** Choose a Trainer card to use from your hand.***');
    displayHud(player, opposingPlayer);
    
    // 0. Create done button promise
    let continueButtonPromiseHolder = continueButtonPromise('Done', 'ticker');
    

    // 1. Get clickable html cards from hand
    let htmlTrainerCards = returnCardsOfTypeInLocation(`hand${player.playerNumber}`, 'trainerCard');
    
    // 2. Set event listeners promise
    let chosenHandCardID = setEventListnersOnCards(htmlTrainerCards).then((id)=>{
        chosenHandCardID = Number(id);
    });

    // 3. Promise race between Done and Trainer. If done, Return.
    let outcome = await Promise.race([continueButtonPromiseHolder, chosenHandCardID]);
    if (outcome === 'Clicked') {
        // 4.1 If Done, return resolved promise
        return supporterPlayed;
    }

    // 4. Retrive chosen Trainer
    let trainerCard = returnCardFromID(player.hand, chosenHandCardID);

    // 4.5 If Supporter, set supporterPlayed to true.
   
    if (trainerCard.category === 'Supporter') {
         // 4.5.1 Check if Supporter has already been played
        if (supporterPlayed === true) {
            clearTicker();
            displayInTicker('You can only use one Supporter per turn.')
            let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
            return supporterPlayed;
        }
        // 4.5.2 Can't play supporter on first turn
        if (player.turnPlayed === 0) {
            clearTicker();
            displayInTicker(`You cannot play a Supporter on your first turn.`)
            await continueButtonPromise('Return to Actions', 'ticker');
            return;
        }
        supporterPlayed = true;
    }

    // 5. Switch on trainer name. Case is trainer's power. If Supporter, set supporterPlayed to true.
    switch (trainerCard.name){
        case 'Youngster': await trainerCard.power(player, trainerCard); break;
        case 'Nemona': trainerCard.power(player); break;
        case 'Jacq': await trainerCard.power(player); break;
        case 'Energy Retrieval': await trainerCard.power(player); break;
        case 'Great Ball': await trainerCard.power(player); break;
        case 'Nest Ball': await trainerCard.power(player); break;
        case 'Pokegear 3.0': await trainerCard.power(player); break;
        case 'Switch': await trainerCard.power(player); break;
        case 'Pal Pad': await trainerCard.power(player); break;
        case 'Ultra Ball': await trainerCard.power(player, opposingPlayer); break;
        case 'Potion': await trainerCard.power(player, opposingPlayer); break;

        
    }

    // 5.1 Send trainer to discard
    player.addToDiscard(player.extractCardOutOfHand(trainerCard.id));
    


    // 6. Return

    return supporterPlayed;
}

export {turnPlayTrainer};