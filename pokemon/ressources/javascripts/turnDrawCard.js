import { displayPhase, displayInTicker, clearHeader, continueButtonPromise, displayCardArrayInHeader } from "./cardDisplay.js";
import { victory } from "./victory.js";


const turnDrawCard = async (player, opposingPlayer) => {
    // 1. Pick a card
    clearHeader();
    displayPhase('***TURN STEP #1: Picking a card.***');
    await continueButtonPromise('Draw a card','header');
    if (player.deck.length === 0) {
        await victory(opposingPlayer, 'Empty deck');
        return;
    }
    let drawnedCard = player.drawFromDeck(1);
    displayInTicker(`You picked ${drawnedCard[0].name}`);
    displayCardArrayInHeader(drawnedCard, 'drawn');
    await continueButtonPromise('Ok','header');
};


export {turnDrawCard};