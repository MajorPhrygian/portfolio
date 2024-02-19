import { jumpTo } from "./utilities.js";

const createPokemonCardDisplay = (card, number) => {
    let displayCard = document.createElement('div');
    displayCard.setAttribute('id',`${card.id}`);
    displayCard.setAttribute('class',`card card${number} pokemonCard`);

    let htmlCardContent = `
        <div id="card-header">
            <div id="name">${card.name}</div>
            <div id="evolution">${card.evolution}</div>
            <div id="hp">${card.hpCurrent + '/' + card.hpOriginal}</div>
            <div id="type">${card.type}</div>
        </div>
        <div id="card-energies">
            <div>${card.energyAmount} Energies</div>
        </div>

        <div id='attack-container'>

        </div>

        <div id="card-footer">
            <div id="evolves-from">Evolves from: ${card.evolvesFrom}</div>
            <div id="retreat-cost">Retreat cost: ${card.retreatCost} Energy</div>
        </div>
    `;
    displayCard.innerHTML = htmlCardContent; 

    let x = 1;
    let htmlAttackContent;
    
    let attackContainer = displayCard.querySelector('#attack-container');
    
    // Ability
    if (card.ability !== null) {
        let htmlAbilityContent = document.createElement('div');
        htmlAbilityContent.setAttribute('class', 'card-ability');
        htmlAbilityContent.setAttribute('id', `${card.ability.id}`);
        htmlAbilityContent.innerHTML = `
            <div id="ability-header">
                <div id="ability-label" class='attack-energy'>Ability</div>
                <div id="ability-name" class='attack-name'>${card.ability.name}</div>
                <div></div>
            </div>
            <div id="ability-description" class='ability-description'>
            ${card.ability.description}
            </div>
        `;
        attackContainer.append(htmlAbilityContent);
    }

    // Attacks
    card.attacks.forEach(attack => {
        htmlAttackContent = document.createElement('div');
        htmlAttackContent.setAttribute('class', 'card-attack');
        htmlAttackContent.setAttribute('id', `${attack.id}`);
        htmlAttackContent.innerHTML = `
            <div id="attack-header">
                <div id="attack-energy" class='attack-energy${x}'>${attack.energy} Energy</div>
                <div id="attack-name" class='attack-name${x}'>${attack.name}</div>
                <div id="attack-points" class='attack-points${x}'>${attack.points}</div>
            </div>
            <div id="attack-description" class='attack-description${x}'>
            ${attack.description}
            </div>
        `;
        attackContainer.append(htmlAttackContent);
        x += 1;
    });

    // background color
    let backgroundColor = 'rgb(228, 226, 226)';
    switch (card.type) {
        case 'Water':
            backgroundColor = 'rgb(189, 205, 214)';
            break;
        case 'Fighting':
            backgroundColor = 'rgb(249, 224, 187)';
            break;
        case 'Colorless':
            backgroundColor = 'rgb(249, 224, 187)';
            break;
    }
    displayCard.style.backgroundColor = backgroundColor;

    return displayCard;
}
 
const createEnergyCardDisplay = (card, number) => {
    let displayCard = document.createElement('div');
    displayCard.setAttribute('class',`card card${number} energyCard`);
    displayCard.setAttribute('id',`${card.id}`);
   
    displayCard.innerHTML = `
        <div id="card-header">
            <div id="name">${card.name}</div>
        </div>
    `;

    // background color
    let backgroundColor = 'rgb(228, 226, 226)';
    switch (card.name) {
        case 'Water Energy':
            backgroundColor = 'rgb(96, 150, 180)';
            break;
        case 'Fighting Energy':
            backgroundColor = 'rgb(195, 129, 84)';
            break;
    }
    displayCard.style.backgroundColor = backgroundColor;

    return displayCard;
}
 
const createTrainerCardDisplay = (card, number) => {
    let displayCard = document.createElement('div');
    displayCard.setAttribute('class',`card card${number} trainerCard`);
    displayCard.setAttribute('id',`${card.id}`);

    displayCard.innerHTML = `
        <div id="card-header">
            <div id="name">${card.name}</div>
            <div id="category">${card.category}</div>
        </div>

        <div id='trainerDescription'>
            ${card.description}
        </div>
    `;
    
    // background color
    let backgroundColor;
    switch (card.category) {
        case 'Supporter':
            backgroundColor = 'rgb(174, 201, 212)';
            break;
        case 'Item':
            backgroundColor = 'rgb(147, 191, 207)';
            break;
    }
    displayCard.style.backgroundColor = backgroundColor;

    return displayCard;
}

const createDisplayCardArray = (cardArray, id) => {
    let x = 1;
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class','card-countainer');
    cardContainer.setAttribute('id',`${id}`);

    cardArray.forEach(card => {
        switch(card.category){
            case 'Energy': cardContainer.append(createEnergyCardDisplay(card, x)); break;
            case 'Pokemon': cardContainer.append(createPokemonCardDisplay(card, x)); break;
            case 'Item': cardContainer.append(createTrainerCardDisplay(card, x)); break;
            case 'Supporter': cardContainer.append(createTrainerCardDisplay(card, x)); break;
        }
        x += 1;
    });
    return cardContainer;
}

const displayCardArrayInHeader = (cardArray, id) => {
    let header = document.getElementById('card-display')
    let htmlCardArray = createDisplayCardArray(cardArray, id);
    header.append(htmlCardArray);
}

const displayActive = (player) => {
    if (player.active === null) {
        return;
    }

    const main = document.getElementById('main');

    let title = document.createElement('h2');
    title.setAttribute('id', `activeHeader${player.playerNumber}`);
    title.innerHTML = `Active`;
    title.style.textAlign = 'center';

    let cardArray = createDisplayCardArray([player.active], `active${player.playerNumber}`);

    main.append(title);
    main.append(cardArray);
}

const displayBench = (player) => {
    const main = document.getElementById('main');

    let title = document.createElement('h2');
    title.setAttribute('id', `benchHeader${player.playerNumber}`);
    title.innerHTML = `Bench`;
    title.style.textAlign = 'center';

    let cardArray = createDisplayCardArray(player.bench, `bench${player.playerNumber}`);

    main.append(title);
    main.append(cardArray);
}

const displayHand = (player) => {
    const main = document.getElementById('main');
    
    let title = document.createElement('h2');
    title.setAttribute('id', `handHeader${player.playerNumber}`);
    title.innerHTML = `Hand`;
    title.style.textAlign = 'center';

    let cardArray = createDisplayCardArray(player.hand, `hand${player.playerNumber}`);

    main.append(title);
    main.append(cardArray);
}

const displayNumberOfPrizesLeft = (player) => {
    const matHeader = document.getElementById(`mat-header${player.playerNumber}`);
    let html = document.createElement('h3');
    html.setAttribute('id','prizes-deck');

    html.innerHTML = `${player.prizes.length} Prizes left, ${player.deck.length} cards left in Deck, and ${player.discard.length} cards in Discard.`;

    matHeader.append(html);
};

// Used to display the button that a player uses to see the opponent's setup
const displayOpposingPlayerButton = (activePlayer, opposingPlayer) => {
    let button = addAndReturnContinueButton(`See your opponent's cards`,`mat-header${activePlayer.playerNumber}`);
    button.addEventListener('click', ()=>{displayOpposingPlayeryHud(activePlayer, opposingPlayer)});

};

// Used to display the button that a player uses to see the opponent's setup
const displayActivePlayerButton = (activePlayer, opposingPlayer) => {
    let button = addAndReturnContinueButton(`See your cards`,`mat-header${opposingPlayer.playerNumber}`);
    button.addEventListener('mousedown', ()=>{unHidePlayerHud(activePlayer, opposingPlayer)});

};

const displayActivePlayer = (player) => {
    const matHeader = document.getElementById(`mat-header${player.playerNumber}`);
    let html = document.createElement('h2');
    html.setAttribute('id','activePlayer');

    html.innerHTML = `Player ${player.playerNumber}`;

    matHeader.append(html);
};

const createMatHeaderDiv = (activePlayer) => {
    const main = document.getElementById('main');
    let html = document.createElement('div');
    html.setAttribute('id',`mat-header${activePlayer.playerNumber}`);

    main.prepend(html);
};

const displayHud = (activePlayer, opposingPlayer) => {
    clearMain();
    document.getElementById('header').style.borderBottom = 'black 1px solid';
    createMatHeaderDiv(activePlayer);
    displayActivePlayer(activePlayer);
    displayOpposingPlayerButton(activePlayer, opposingPlayer);
    displayNumberOfPrizesLeft(activePlayer);
    displayActive(activePlayer);
    displayBench(activePlayer);
    displayHand(activePlayer);
}

const displayOpposingPlayeryHud = (activePlayer, opposingPlayer) => {
    // clearMain();
    document.getElementById(`mat-header${activePlayer.playerNumber}`).style.display = 'none';
    document.getElementById(`activeHeader${activePlayer.playerNumber}`).style.display = 'none';
    document.getElementById(`active${activePlayer.playerNumber}`).style.display = 'none';
    document.getElementById(`benchHeader${activePlayer.playerNumber}`).style.display = 'none';
    document.getElementById(`bench${activePlayer.playerNumber}`).style.display = 'none';
    document.getElementById(`handHeader${activePlayer.playerNumber}`).style.display = 'none';
    document.getElementById(`hand${activePlayer.playerNumber}`).style.display = 'none';

    document.getElementById('header').style.borderBottom = 'black 1px solid';
    createMatHeaderDiv(opposingPlayer);
    displayActivePlayer(opposingPlayer);
    displayActivePlayerButton(activePlayer, opposingPlayer);
    displayNumberOfPrizesLeft(opposingPlayer);
    displayActive(opposingPlayer);
    displayBench(opposingPlayer);
}

const unHidePlayerHud = (activePlayer, opposingPlayer)=>{
    // Removing the opposing player visual elements
    document.getElementById(`mat-header${opposingPlayer.playerNumber}`).remove();
    document.getElementById(`activeHeader${opposingPlayer.playerNumber}`).remove();
    document.getElementById(`active${opposingPlayer.playerNumber}`).remove();
    document.getElementById(`benchHeader${opposingPlayer.playerNumber}`).remove();
    document.getElementById(`bench${opposingPlayer.playerNumber}`).remove();

    // Un-hiding the active player elements
    document.getElementById(`mat-header${activePlayer.playerNumber}`).style.display = 'flex';
    document.getElementById(`activeHeader${activePlayer.playerNumber}`).style.display = 'block';
    document.getElementById(`active${activePlayer.playerNumber}`).style.display = 'flex';
    document.getElementById(`benchHeader${activePlayer.playerNumber}`).style.display = 'block';
    document.getElementById(`bench${activePlayer.playerNumber}`).style.display = 'flex';
    document.getElementById(`handHeader${activePlayer.playerNumber}`).style.display = 'block';
    document.getElementById(`hand${activePlayer.playerNumber}`).style.display = 'flex';
}

const displayInTicker = (message) => {
    const ticker = document.getElementById('ticker');
    let html = document.createElement('p');
    html.setAttribute('class','ticker');

    html.innerHTML = `${message}`;

    ticker.append(html);

    jumpTo('header');
};

const displayH1InMain = (message) => {
    const ticker = document.getElementById('main');
    let html = document.createElement('h1');
    html.setAttribute('class','h1');
    html.style.textAlign = 'center';

    html.innerHTML = `${message}`;

    ticker.append(html);

    jumpTo('main');
};


const displayTurnOptions = ()=>{
    let container = document.getElementById('options');

    let optionBenchPokemon = document.createElement('div');
    let optionEvolvePokemon = document.createElement('div');
    let optionAttachEnergy = document.createElement('div');
    let optionPlayTrainer = document.createElement('div');
    let optionRetreatActive = document.createElement('div');
    let optionUseAbilities = document.createElement('div');

    optionBenchPokemon.setAttribute('class', 'option');
    optionEvolvePokemon.setAttribute('class', 'option');
    optionAttachEnergy.setAttribute('class', 'option');
    optionPlayTrainer.setAttribute('class', 'option');
    optionRetreatActive.setAttribute('class', 'option');
    optionUseAbilities.setAttribute('class', 'option');

    optionBenchPokemon.setAttribute('id', 'optionBenchPokemon');
    optionEvolvePokemon.setAttribute('id', 'optionEvolvePokemon');
    optionAttachEnergy.setAttribute('id', 'optionAttachEnergy');
    optionPlayTrainer.setAttribute('id', 'optionPlayTrainer');
    optionRetreatActive.setAttribute('id', 'optionRetreatActive');
    optionUseAbilities.setAttribute('id', 'optionUseAbilities');

    optionBenchPokemon.innerHTML = 'Bench Pokemons';
    optionEvolvePokemon.innerHTML = 'Evolve Pokemons';
    optionAttachEnergy.innerHTML = 'Attach Energy';
    optionPlayTrainer.innerHTML = 'Play Trainer';
    optionRetreatActive.innerHTML = 'Retreat Active Pokemon';
    optionUseAbilities.innerHTML = 'Use Abilities';

    container.append(optionBenchPokemon);
    container.append(optionEvolvePokemon);
    container.append(optionAttachEnergy);
    container.append(optionPlayTrainer);
    container.append(optionRetreatActive);
    container.append(optionUseAbilities);
}

const clearOptions = () => {
    document.getElementById('options').innerHTML = '';
};

const clearTicker = () => {
    document.getElementById('ticker').innerHTML = '';
};

const displayPhase = (message) => {
    const phase = document.getElementById('phase');
    phase.innerHTML = `${message}`;
};

const clearPhase = () => {
    document.getElementById('phase').innerHTML = '';
};

const clearCardDisplay = () => {
    document.getElementById('card-display').innerHTML = '';
};

const clearHeader = () => {
    clearPhase();
    clearTicker();
    clearCardDisplay();
    clearOptions();
};

const clearBody = ()=>{
    let body = document.getElementById('body');
    body.innerHTML = '';
}

const clearMain = ()=>{
    let body = document.getElementById('main');
    body.innerHTML = '';
}

const addAndReturnContinueButton = (customText, location)=>{
    if (!customText) {customText = 'Continue';}
    if (!location) {location = 'body';}

    let htmlLocation = document.getElementById(location);
    let continueButton = document.createElement('button');
    continueButton.style.marginTop = "10px";
    continueButton.innerHTML = customText;
    htmlLocation.append(continueButton);
    return continueButton;
}

const continueButtonPromise = (customText, location)=>{
    if (!customText) {
        customText = 'Continue';
    }
    return new Promise((resolve)=>{
        let continueButton = addAndReturnContinueButton(customText, location);
        continueButton.addEventListener('click', ()=>{
            continueButton.style.display = 'none';
            resolve('Clicked');
        });
    })
}

const cardChoicePromise = ()=>{
    let cardChoices = document.getElementsByClassName('card');
    return new Promise((resolve) => {
        // setting event listeners + functions
        for(let index = 0; index<cardChoices.length; index++) {
            cardChoices[index].addEventListener('click',()=>{
                // retrieving the name from the chosen HTML card
                let activeChoice = cardChoices[index];
                let activeChoiceName = activeChoice.querySelector('#name').innerHTML;
                resolve(activeChoiceName);
            })
        };
    });
}

const cardsChoicePromise = async (location)=>{
    if(!location){location = 'main'};

    let parentElement = document.getElementById(location);
    let cardChoices = parentElement.getElementsByClassName('card');
    let choicesName = [];

    // setting event listeners + functions
    for(let index = 0; index<cardChoices.length; index++) {
        cardChoices[index].addEventListener('click',()=>{
            // retrieving the name from the chosen HTML card
            cardChoices[index].style.border = 'black 1px solid';
            let activeChoice = cardChoices[index];
            let activeChoiceName = activeChoice.querySelector('#name').innerHTML;
            choicesName.push(activeChoiceName);
        })
    };
    await continueButtonPromise();
    return choicesName;
}

// This function returns all cards of # "id", in the container "location."
const returnCardsOfTypeInLocation = (location, typeID) => {
    
    let parentElement = document.getElementById(location);
    let cards = parentElement.getElementsByClassName(`${typeID}`);
    return cards;
}

// This function set event listeners on its cards html element input. 
// Then, it waits for click andit gives the chosen a black border and returns its card ID. 
const setEventListnersOnCards = (cards) => {
    return new Promise((resolve) => {   
        for(let x = 0; x < cards.length; x++) {
            cards[x].addEventListener('click',()=>{
                // retrieving the id from the chosen HTML card
                cards[x].style.border = 'black 2px solid';
                resolve(cards[x].id);
            })
        };
    });
}

// This function is a variant of the setEventListeersOnCards().
// It was created for the turnUseAbilities() funtion.
// The difference is 
const setEventListnersOnAbilities = (abilities) => {
    return new Promise((resolve) => {   
        for(let x = 0; x < abilities.length; x++) {
            abilities[x].addEventListener('click',()=>{
                // retrieving the name from the chosen HTML card
                abilities[x].style.border = 'black 1px solid';
                resolve(abilities[x]);
            })
        };
    });
}



export {displayH1InMain, clearCardDisplay, setEventListnersOnAbilities, displayOpposingPlayeryHud, displayOpposingPlayerButton, clearOptions, displayTurnOptions, displayCardArrayInHeader, returnCardsOfTypeInLocation, setEventListnersOnCards, createMatHeaderDiv, createPokemonCardDisplay, createEnergyCardDisplay, createTrainerCardDisplay, createDisplayCardArray, displayInTicker, clearBody, addAndReturnContinueButton, continueButtonPromise, cardsChoicePromise, cardChoicePromise, displayActive, displayBench, displayHand, displayNumberOfPrizesLeft, displayActivePlayer, displayHud, displayPhase, clearMain, clearHeader, clearPhase, clearTicker};