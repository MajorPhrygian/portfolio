import { continueButtonPromise, displayInTicker } from "./cardDisplay.js";
import { victory } from "./victory.js";

// If any of the pokemons in there are knocked out, it 
// checks for victory; calls the new active choser function; picks prizes
const knockedOutCheck = async (playerToCheck, otherPlayer, shouldRevealPrize) => {
    
    let knockedOutPokemons = playerToCheck.pokemonsToCheckIfDead.filter((pokemon) => pokemon.hpCurrent <= 0);

    if (knockedOutPokemons.length === 0) {
        playerToCheck.pokemonsToCheckIfDead = [];
        return;
    }
    
    // making the check
    for (const pokemon of knockedOutPokemons) {
        // Is the knocked out Pokemon in the active spot or on the bench?
        switch (pokemon.location) {
            case 'Active':
                playerToCheck.addToDiscard(pokemon);
                playerToCheck.active = null;
                break;

            case 'Bench':
                playerToCheck.addToDiscard(playerToCheck.extractCardOutOfBench(pokemon.id));
                break;
        }

        displayInTicker(`${pokemon.name} is knocked out!`);

        // Checking for no more Pokemons on the bench
        if ((!playerToCheck.active || playerToCheck.active === 'Empty') && playerToCheck.bench.length === 0) {
            await victory(otherPlayer, 'Empty bench');
        }

        // picking Prizes
        let numberOfPrizesToPick;
        // 1.2 Special case for EX pokemons
        if (pokemon.name === 'Chien-Pao' || pokemon.name === 'Lucario') {
            numberOfPrizesToPick = 2;
        } else { numberOfPrizesToPick = 1 };

        for (let prizes = 0; prizes < numberOfPrizesToPick; prizes++) {
            let prize = otherPlayer.lastPrizeToHand();
            
            // victory condition
            if (otherPlayer.prizes.length === 0) {
                await victory(otherPlayer, 'No more prizes');
            }

            // Depending on value of shouldDisplayPrize, display the card picked to the player
            if (shouldRevealPrize) {
                displayInTicker(`Your prize is: ${prize.name}.`);
            } else{
                displayInTicker(`Player ${otherPlayer.playerNumber} has picked a prize. It has been added to his hand.`);
            }
        }
    }
    
    // This OK button needs to be displayed only if there is a dead Pokemon
    await continueButtonPromise('Continue', 'ticker');
    playerToCheck.pokemonsToCheckIfDead = [];
}

export {knockedOutCheck}