// The checking of the attach energy requirement and the attack itself 
// must be two seperate functions because the attack object cannot access 
// the parent pokemon energy values

import { clearHeader, clearMain, clearTicker, continueButtonPromise, displayHud, displayInTicker, displayPhase, returnCardsOfTypeInLocation, setEventListnersOnCards } from "./cardDisplay.js";
import { returnIndexFromID } from "./utilities.js";
import { victory } from "./victory.js";

const turnAttack = async (activePlayer, opposingPlayer, attackIsDone) => {

    // 1. Setup HUD
    clearHeader();
    clearMain();
    displayPhase('*** Choose an attack from your active Pokemon.***');
    displayHud(activePlayer, opposingPlayer);

    // 1.1 Exception for Player 1's first turn
    if (activePlayer.playerNumber === 1 && activePlayer.turnPlayed === 0) {
        displayInTicker('The first player cannot attack on its first turn.');
        await continueButtonPromise('End turn', 'ticker');
        attackIsDone = true;
        return attackIsDone;
    }

    // 1.5 Setup continue Button promise
    let continueButtonPromiseHolder = continueButtonPromise('Skip step', 'ticker');

    // 2.Setup event listener promises on active's attacks
    let HTMLAttacks = returnCardsOfTypeInLocation(`active${activePlayer.playerNumber}`, 'card-attack');
    
    // 2.5 Add mouse hover on attacks
    for (const attack of HTMLAttacks) {
        attack.classList.add('hoverActiveAttack');
    }

    let chosenAttackID = setEventListnersOnCards(HTMLAttacks);

    // 3. Promise Race between attack click and continue button
    chosenAttackID = await Promise.race([continueButtonPromiseHolder, chosenAttackID]);
    if (chosenAttackID === 'Clicked') {
        attackIsDone = true;
        return attackIsDone;
    }
    chosenAttackID = Number(chosenAttackID);

    // 3.5 Removing :hover on attacks
    for (const attack of HTMLAttacks) {
        attack.classList.remove('hoverActiveAttack');
    }
    
    // 3.6 Retieving index from ID
    const attackIndex = returnIndexFromID(activePlayer.active.attacks, chosenAttackID);

    // 4 execute attack effect(opposingPlayer, activePlayer, thisPokemon)
    // 4.1 Checking that the pokemon can attack
    if (!activePlayer.active.canAttack){
        clearTicker();
        displayInTicker(`${activePlayer.active.name} cannot attack on this turn.`)
        await continueButtonPromise('Continue', 'ticker');
        return attackIsDone;
    }


    // 4.2 Checking energy requirements
    let energyRequirementBool = activePlayer.active.checkEnergies(activePlayer.active.attacks[attackIndex].energy);
    if (!energyRequirementBool){
        clearTicker();
        displayInTicker(`${activePlayer.active.name} does not have enough energy for ${activePlayer.active.attacks[attackIndex].name}.`)
        await continueButtonPromise('Continue', 'ticker');
        return attackIsDone;
    }

    // 4.3 Checking if Attack is enabled
    if (!activePlayer.active.attacks[attackIndex].enabled){
        clearTicker();
        displayInTicker(`${activePlayer.active.attacks[attackIndex].name} is not available for this turn.`)
        await continueButtonPromise('Continue', 'ticker');
        return attackIsDone;
    }

    // 4.3 Applying Attack effect 
    clearTicker();
    await activePlayer.active.attacks[attackIndex].effect(opposingPlayer, activePlayer, activePlayer.active);
    attackIsDone = true;
    await continueButtonPromise('Continue', 'ticker');
    

    // 5. Put mouse hover the way it was
    for (const attack of HTMLAttacks) {
        attack.classList.remove('hoverActiveAttack');
    }

    return attackIsDone;
}




export {turnAttack}