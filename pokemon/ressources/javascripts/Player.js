 import { displayInTicker } from "./cardDisplay.js";
import { shuffleArray } from "./utilities.js";

class Player {
    constructor(playerNumber) {
        this._playerNumber = playerNumber;
        this._active = 'Empty';
        this._bench = [];
        this._deck = [];
        this._hand = [];
        this._prizes = [];
        this._discard = [];
        this._endOfTurnCallbackFunctions = [];
        this._pokemonsToCheckIfDead = [];
        this._turnPlayed = 0;
    }

    gameSetup(){
        // shuffleArray(this.deck);

        // Filling Hand
        this._hand = this._deck.splice(0, 7);
        this.hand.forEach((card) => {card.location = 'Hand';});

        // Filling Prizes
        this._prizes = this._deck.splice(0, 6);
        this.prizes.forEach((card) => {card.location = 'Prizes';});
    }

    get playerNumber() {
        return this._playerNumber;
    }

    get active() {
        return this._active;
    }

    set active(newActive) {
        if (newActive === null) {
            this._active = newActive;
        } else{
            this._active = newActive;
            this._active.location = 'Active';
        }
    }

    get bench() {
        return this._bench;
    }

    addToBench(pokemon) {
      if (pokemon.category === 'Pokemon' && this.bench.length < 5) {
          pokemon.location = 'Bench';
          this._bench.push(pokemon);
          pokemon.turnNumberWhenPlayed = this._turnPlayed;
      } else {displayInTicker('Only Pokemons can be benched. Limit is 5 max.')}
    }

    get deck() {
        return this._deck;
    }

    set deck (cardArray) {
        this._deck = [];
        cardArray.forEach(card => {
            card.location = "Deck";
            card.playerNumber = this.playerNumber;
            this._deck.push(card);
        });
    }

    get endOfTurnCallbackFunctions () {
        return this._endOfTurnCallbackFunctions;
    }

    set endOfTurnCallbackFunctions (functionArray) {
        this._endOfTurnCallbackFunctions = functionArray;
    }

    get pokemonsToCheckIfDead () {
        return this._pokemonsToCheckIfDead;
    }

    set pokemonsToCheckIfDead (pokemonArray) {
        this._pokemonsToCheckIfDead = pokemonArray;
    }

    get endOfTurnCallbackFunctions () {
        return this._endOfTurnCallbackFunctions;
    }

    get turnPlayed (){
        return this._turnPlayed;
    }

    incrementTurnPlayed () {
        this._turnPlayed += 1;
    }

    addToPokemonsToCheckIfDead (pokemon) {
        this._pokemonsToCheckIfDead.push(pokemon);
    }

    addCardToDeck(card) {
        card.location = 'Deck';
        this._deck.push(card);
    }

    get hand() {
        return this._hand;
    }

    // returns an array of all basics pokemon in hand. Does NOT remove them from hand. 
    get handBasics () {
        let basicsArray = [];
        for (let i = 0; i < this.hand.length; i++) {
            if(this.hand[i].category === 'Pokemon' && this.hand[i].evolution === 'Basic'){
                basicsArray.push(this.hand[i]);
            }; 
        }
        return basicsArray;
    }

    // returns an array of all pokemon in deck. Does NOT remove them from deck. 
    // Has an optional argument to only lookup in the first X cards
    deckPokemons(numberOfCardsToLookUp) {
        let pokemonsArray = [];
        
        // Checking for optional argument
        if (numberOfCardsToLookUp === undefined || numberOfCardsToLookUp > this.deck.length) {
            numberOfCardsToLookUp = this.deck.length;
        }

        for (let i = 0; i < numberOfCardsToLookUp; i++) {
            if(this.deck[i].category === 'Pokemon'){
                pokemonsArray.push(this.deck[i]);
            }; 
        }
        return pokemonsArray;
    }

    // returns an array of all supporter in deck. Does NOT remove them from deck. 
    // Has an optional argument to only lookup in the first X cards
    deckSupporters(numberOfCardsToLookUp) {
        let supportersArray = [];
        
        // Checking for optional argument
        if (numberOfCardsToLookUp === undefined) {
            numberOfCardsToLookUp = this.deck.length;
        }

        for (let i = 0; i < numberOfCardsToLookUp; i++) {
            if(this.deck[i].category === 'Supporter'){
                supportersArray.push(this.deck[i]);
            }; 
    }
    return supportersArray;
    }

    // returns an array of all basics pokemon in deck. Does NOT remove them from deck. 
    get deckBasics () {
        let basicsArray = [];
        for (let i = 0; i < this.deck.length; i++) {
            if(this.deck[i].category === 'Pokemon' && this.deck[i].evolution === 'Basic'){
                basicsArray.push(this.deck[i]);
            }; 
        }
        return basicsArray;
    }

    // returns an array of all level 1 & 2 pokemons in hand. Does NOT remove them from hand. 
    get handLevel1AndLevel2 () {
        let pokemonArray = [];
        for (let i = 0; i < this.hand.length; i++) {
            if(this.hand[i].category === 'Pokemon' && (this.hand[i].evolution === 'Level 1' || this.hand[i].evolution === 'Level 2')){
                pokemonArray.push(this.hand[i]);
            }; 
        }
        return pokemonArray;
    }

    // returns an array of all level 1 & 2 pokemons in deck. Does NOT remove them from the deck. 
    get deckLevel1AndLevel2 () {
        let pokemonArray = [];
        for (let i = 0; i < this.deck.length; i++) {
            if(this.deck[i].category === 'Pokemon' && (this.deck[i].evolution === 'Level 1' || this.deck[i].evolution === 'Level 2')){
                pokemonArray.push(this.deck[i]);
            }; 
        }
        return pokemonArray;
    }

    // returns an array of all energy cards in discard. Does NOT remove them from the discard. 
    get energiesFromDiscard () {
        let energyArray = [];
        for (let i = 0; i < this.discard.length; i++) {
            if(this.discard[i].category === 'Energy'){
                energyArray.push(this.discard[i]);
            }; 
        }
        return energyArray;
    }

    // returns an array of all energy cards in deck. Does NOT remove them from the deck. 
    get energiesFromDeck () {
        let energyArray = [];
        for (let i = 0; i < this.deck.length; i++) {
            if(this.deck[i].category === 'Energy'){
                energyArray.push(this.deck[i]);
            }; 
        }
        return energyArray;
    }

    // returns an array of all Supporter cards in discard. Does NOT remove them from the discard. 
    get supportersFromDiscard () {
        let supportersArray = [];
        for (let i = 0; i < this.discard.length; i++) {
            if(this.discard[i].category === 'Supporter'){
                supportersArray.push(this.discard[i]);
            }; 
        }
        return supportersArray;
    }

    addToHand(card) {
        card.location = 'Hand';
        this._hand.push(card);
    }

    get prizes() {
        return this._prizes;
    }

    lastPrizeToHand() {
        if (this._prizes.length === 0) {
            return;
        }
        const lastPrize = this._prizes.pop();
        this.addToHand(lastPrize);
        return lastPrize;
    }

    get discard() {
        return this._discard;
    }

    addToDiscard(card) {
        card.location = 'Discard';
        this._discard.push(card);
    }

    drawFromDeck (numberOfCards){
        if (this.deck.length < numberOfCards) {
            numberOfCards = this.deck.length;
        } 
        let drawnedCards = this.deck.splice(0, numberOfCards);
        drawnedCards.forEach(card => {
            this.addToHand(card);
        })

        return drawnedCards;
    }

    shuffleDeck () {
        let shuffledDeck = shuffleArray(this.deck);
        this._deck = [];
        this.deck = shuffledDeck;
    }

    isThereEnergyInHand () {
        let isThereEnergyInHand = false;

        this.hand.forEach(card => {
            if (card.category === 'Energy') {
                isThereEnergyInHand = true;
            }
        });

        return isThereEnergyInHand;
    }

    extractCardOutOfHand (id){
        for (let index = 0; index < this.hand.length; index++) {
            if (this.hand[index].id === id) {
                return this.hand.splice(index, 1)[0];    
            }
        }
    }

    extractCardOutOfBench (id){
        for (let index = 0; index < this.bench.length; index++) {
            if (this.bench[index].id === id) {
                return this.bench.splice(index, 1)[0];    
            }
        }
    }

    extractCardOutOfDeck (id){
        for (let index = 0; index < this.deck.length; index++) {
            if (this.deck[index].id === id) {
                return this.deck.splice(index, 1)[0];    
            }
        }
    }

    extractCardOutOfDiscard (id){
        for (let index = 0; index < this.discard.length; index++) {
            if (this.discard[index].id === id) {
                return this.discard.splice(index, 1)[0];    
            }
        }
    }

    addToEndOfTurnCallbackFunctions (callbackFunction) {
        this._endOfTurnCallbackFunctions.push(callbackFunction);
    }
}

export {Player};

