import { clearHeader, clearTicker, displayInTicker } from "./cardDisplay.js";

// Causes : 'Empty bench', 'No more prizes', 'Empty deck'
const victory = async (winner, reason) => {
    // clearHeader();
    let loserPlayerNumber = 1;
    if (winner.playerNumber === 1) {
        loserPlayerNumber = 2;
    }
    switch (reason) {
        case 'Empty bench':
            displayInTicker(`Player ${loserPlayerNumber} has no more Pokemon on the Bench to fill the active spot.`)
            break;
        case 'No more prizes':
            displayInTicker(`Player ${winner.playerNumber} has picked all his prizes.`);
            break;
        case 'Empty deck':
            displayInTicker(`Player ${loserPlayerNumber} has an empty deck and cannot draw a card.`);
            break;
    }
    displayInTicker(`Player ${winner.playerNumber} is the WINNER!!!`)
    displayInTicker(`Reload the page to start a new game.`)
    return await neverEndingPromise();
    // return returnValue;
}

const neverEndingPromise = ()=>{
    return new Promise((resolve) =>{
        if (true === false) {
                resolve('patate');
        }
    });
};

export {victory};