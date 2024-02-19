import { clearHeader, clearMain, clearTicker, continueButtonPromise, displayHud, displayInTicker, displayPhase, returnCardsOfTypeInLocation, setEventListnersOnAbilities, setEventListnersOnCards } from "./cardDisplay.js";
import { returnCardFromID, returnIndexFromID } from "./utilities.js";

const turnUseAbilities = async (activePlayer, opposingPlayer) => {
    clearHeader();
    clearMain();
    displayPhase('*** Choose an ability from your active or benched Pokemons. ***');
    displayHud(activePlayer, opposingPlayer);

    // 1.5 Setup continue Button promise
    let continueButtonPromiseHolder = continueButtonPromise('Go back to Actions', 'ticker');

    // 2.Setup event listener promises on abilities
    let HTMLActiveAbility = returnCardsOfTypeInLocation(`active${activePlayer.playerNumber}`, 'card-ability');
    let HTMLBenchAbility = returnCardsOfTypeInLocation(`bench${activePlayer.playerNumber}`, 'card-ability');

    // 2.5 Add mouse hover on active ability
    for (const ability of HTMLActiveAbility) {
        ability.classList.add('hoverActiveAbility');
    }

    // 2.5.1 Add mouse hover on bench ability
    for (const ability of HTMLBenchAbility) {
        ability.classList.add('hoverActiveAbility');
    }

    let chosenActiveAbility = setEventListnersOnAbilities(HTMLActiveAbility);
    let chosenBenchAbility = setEventListnersOnAbilities(HTMLBenchAbility);

    // 3. Promise Race between active ability click, bench ability click, and continue button
    let chosenHTMLAbility = await Promise.race([continueButtonPromiseHolder, chosenActiveAbility, chosenBenchAbility]);
    if (chosenHTMLAbility === 'Clicked') {
        return;
    }

    let HTMLAttackContainer = chosenHTMLAbility.parentElement;
    let HTMLCard = HTMLAttackContainer.parentElement;
    let chosenPokemonID = Number(HTMLCard.id);

    // 3.5 Removing :hover on abilities
    for (const ability of HTMLActiveAbility) {
        ability.classList.remove('hoverActiveAbility');
    }

    for (const ability of HTMLBenchAbility) {
        ability.classList.remove('hoverActiveAbility');
    }

    // Finding out which Pokemon owns the Ability
    let chosenPokemon;
    if (activePlayer.active.id === chosenPokemonID) {
        chosenPokemon = activePlayer.active;
    } else {
        chosenPokemon = returnCardFromID(activePlayer.bench, chosenPokemonID);
    }

    // 4.3 Applying Ability effect 
    await chosenPokemon.ability.effect(activePlayer, opposingPlayer, chosenPokemon);
    // await continueButtonPromise('Go back to Actions', 'ticker');
    
    // 5. Put mouse hover the way it was
    for (const ability of HTMLActiveAbility) {
        ability.classList.remove('hoverActiveAttack');
    }

    for (const ability of HTMLBenchAbility) {
        ability.classList.remove('hoverActiveAttack');
    }

    return;
}

export {turnUseAbilities}