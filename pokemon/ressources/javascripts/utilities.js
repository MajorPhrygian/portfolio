const cardsExtractor = (names, cards) => {
    let resultCards = [];

    for (let name = 0; name < names.length; name++) {
        for(let card = 0; card < cards.length; card++){
            if (cards[card].name === names[name]) {
                resultCards.push(cards.splice(card, 1)[0]);
                // going to next name as to not extract all cards with same name. I should have created IDs or unique names.
                name += 1; 
                card = 0;
            }
        };
    }

    return resultCards;
}

function shuffleArray(array) {
    // create a copy of the array so that the original array is not mutated
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const returnCardFromID = (cardArray, id)=>{
    for (let index = 0; index < cardArray.length; index++) {
        if (cardArray[index].id === id) {
            return cardArray[index];
        }
    }
    return null;   
};

const formatEnergyRequirementToArray = (energyRequirementString) => {
    let requirementArray = [];

    // Case if there is only 1 type of energy requirement
    if (energyRequirementString.length === 2 ) {
        requirementArray.push(energyRequirementString);
    }
    
    // Case if there is 2 type of energy requirement
    if (energyRequirementString.length === 4 ) {
        requirementArray.push(energyRequirementString.substring(0, 2));
        requirementArray.push(energyRequirementString.substring(2));
    }

    return requirementArray;
}

const returnIndexFromID = (cardArray, id)=>{
    for (let index = 0; index < cardArray.length; index++) {
        if (cardArray[index].id === id) {
            return index;
        }
    }
    return null;   
};

const coinToss = () => {
    const possibilies = ['Head', 'Tail'];
    let randomIndex = Math.floor(Math.random()*2)
    return possibilies[randomIndex];
}

// a function to jump in the webpage
function jumpTo(anchor_id){
    var url = location.href;               //Saving URL without hash.
    location.href = "#"+anchor_id;                 //Navigate to the target element.
    history.replaceState(null,null,url);   //method modifies the current history entry.
}

    

export {jumpTo, coinToss, returnIndexFromID, formatEnergyRequirementToArray, returnCardFromID, cardsExtractor, shuffleArray};