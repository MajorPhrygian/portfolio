import { addAndReturnContinueButton, clearHeader, clearMain, continueButtonPromise, displayH1InMain, displayHud, displayPhase, displayTurnOptions, setEventListnersOnCards } from "./cardDisplay.js";
import { turnAttachingEnergies } from "./turnAttachingEnergies.js";
import { turnBenchPokemon } from "./turnBenchPokemon.js";
import { turnEvolvePokemons } from "./turnEvolvePokemons.js";
import { turnPlayTrainer } from "./turnPlayTrainer.js";
import { turnRetreatActive } from "./turnRetreatActive.js";
import { turnUseAbilities } from "./turnUseAbilities.js";
import { turnAttack } from "./turnAttack.js";
import { knockedOutCheck } from "./knockedOutCheck.js";
import { turnDrawCard } from "./turnDrawCard.js";
import { victory } from "./victory.js";
import { choosingActive, choosingActiveTurn } from "./choosingActive.js";

const optionsPhase = async (player, opposingPlayer, isDone, supporterPlayed, activeSwitched, attachEnergyIsDone) => {
    clearMain();
    clearHeader();
    displayPhase('***TURN STEP #2: Choose any of these actions.***');
    displayTurnOptions();
    displayHud(player, opposingPlayer);
    

    let htmlTurnOptions = document.getElementsByClassName('option');
    let turnChoicePromise = setEventListnersOnCards(htmlTurnOptions);

    let doneButtonPromise = continueButtonPromise('Go to Attack phase','card-display');
    let outcome;
    await Promise.race([turnChoicePromise, doneButtonPromise]).then((resolved)=>{
        outcome = resolved;
    });
    if (outcome === 'Clicked') {
        isDone = true;
        return [isDone, supporterPlayed, activeSwitched];
    }

    switch (outcome){
        case 'optionBenchPokemon': await turnBenchPokemon(player, opposingPlayer,false); break;
        case 'optionEvolvePokemon': await turnEvolvePokemons(player, opposingPlayer) ; break;
        case 'optionAttachEnergy': attachEnergyIsDone = await turnAttachingEnergies(player, opposingPlayer, attachEnergyIsDone); break;
        case 'optionPlayTrainer': supporterPlayed = await turnPlayTrainer(player, opposingPlayer, supporterPlayed); break;
        case 'optionRetreatActive': activeSwitched =  await turnRetreatActive(player, opposingPlayer, activeSwitched) ; break;
        case 'optionUseAbilities': await turnUseAbilities(player) ; break;
    }
    return [isDone, supporterPlayed, activeSwitched, attachEnergyIsDone];
}

const turnManager = async (activePlayer, opposingPlayer) => {
    // STEP -1 : Display
    clearHeader();
    clearMain();
    displayH1InMain(`Turn Player ${activePlayer.playerNumber}`);
    await continueButtonPromise('Start', 'main');
    clearMain();

    // STEP 0: check that there is an active. If not, call function
    if (!activePlayer.active || activePlayer.active === 'Empty') {
        displayHud(activePlayer,opposingPlayer);
        await choosingActiveTurn(activePlayer,opposingPlayer);
    }

    
    // STEP 1: Draw a card
    displayHud(activePlayer, opposingPlayer);
    await turnDrawCard(activePlayer, opposingPlayer);
    clearHeader();
    
    // STEP 2: Options
    let optionsIsDone = false;
    let attachEnergyDone = false;
    let supporterPlayed = false;
    let activeSwitched = false;
    let returnArray;
    do {
        returnArray = await optionsPhase(activePlayer, opposingPlayer, optionsIsDone, supporterPlayed, activeSwitched, attachEnergyDone);
        optionsIsDone = returnArray[0];
        supporterPlayed = returnArray[1];
        activeSwitched = returnArray[2];
        attachEnergyDone = returnArray[3];
    } while (!optionsIsDone);

    // STEP 3: Attack
    let attackIsDone = false;
    do {
        attackIsDone = await turnAttack(activePlayer, opposingPlayer, attackIsDone)
    } while (!attackIsDone);
    
    

    // Step 4: Checking for knocked outs
    await knockedOutCheck(opposingPlayer, activePlayer, true);
    await knockedOutCheck(activePlayer, opposingPlayer, false);

    // STEP 5: Callbacks
    activePlayer.endOfTurnCallbackFunctions.forEach(callbackFunction => {
        callbackFunction();
    });

    // STEP LAST: increment the Player's turnPlayed
    activePlayer.incrementTurnPlayed();
}

export {turnManager};