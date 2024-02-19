import {clearCardDisplay, clearMain, clearTicker, continueButtonPromise, displayOpposingPlayeryHud, displayCardArrayInHeader, displayHud, displayInTicker, returnCardsOfTypeInLocation, setEventListnersOnCards } from "./cardDisplay.js";
import { coinToss, returnCardFromID, returnIndexFromID, formatEnergyRequirementToArray, jumpTo } from "./utilities.js";

class Card {
    constructor (id, name, category){
        this._name = name;
        this._category = category;
        this._playerNumber;
        this._location = "Deck";
        this._id = id;
    }

    get id () {
        return this._id;
    }

    get category () {
        return this._category;
    }

    get name () {
        return this._name;
    }

    get playerNumber () {
        return this._playerNumber;
    }

    set playerNumber (newPlayer) {
        if (newPlayer === 1 || newPlayer === 2) {
            this._playerNumber = newPlayer;
        } else {return RangeError}
    }

    get location () {
        return this._location;
    }

    set location (newLocation) {
       if (typeof newLocation === 'string' ) {
         this._location = newLocation;
       } else {return TypeError}
    }
}


class Pokemon extends Card {
    constructor (id, name, hpOriginal, type, evolution, weakness, resistance, retreatCost, evolvesFrom) {
        super(id, name, 'Pokemon');
        this._hpOriginal = hpOriginal;
        this._hpCurrent = hpOriginal;
        this._attacks;
        this._ability = null;
        this._type = type;
        this._alive = true;
        this._evolution = evolution;
        this._weakness = weakness;
        this._resistance = resistance;
        this._retreatCost = retreatCost;
        this._energies = [];
        this._energyAmount = 0;
        // this._colorlessEnergies = 0;
        // this._waterEnergies = 0;
        // this._fightingEnergies = 0;
        this._evolvesFrom = evolvesFrom;
        this._isInvincible = false;
        this._canAttack = true;
        this._turnNumberWhenPlayed;
    }

    get hpOriginal () {
        return this._hpOriginal;
    }

    get hpCurrent () {
        return this._hpCurrent;
    }

    set hpCurrent (newHP) {
        this._hpCurrent = newHP;
    }

    get attacks () {
        return this._attacks;
    }

    get ability () {
        return this._ability;
    }

    get type () {
        return this._type;
    }

    get alive () {
        return this._alive;
    }

    set alive (value) {
        this._alive = value;
    }

    get evolution () {
        return this._evolution;
    }

    get weakness () {
        return this._weakness;
    }

    get resistance () {
        return this._resistance;
    }

    get retreatCost () {
        return this._retreatCost;
    }

    get energies () {
        return this._energies;let retreatCost = chosenCard1.retreatCost;
    }

    get energyAmount () {
        return this._energyAmount;
    }

    set energyAmount (newAmount) {
        this._energyAmount = newAmount;
    }

    modifyEnergyAmount (increment) {
        this._energyAmount += increment;
        if (this._energyAmount < 0) {
            this._energyAmount = 0;
        }
    }

    // get colorlessEnergies () {
    //     return this._colorlessEnergies;
    // }

    // set colorlessEnergies (variation) {
    //     this._colorlessEnergies += variation;
    // }

    // get waterEnergies () {
    //     return this._waterEnergies;
    // }

    // set waterEnergies (newValue) {
    //     this._waterEnergies = newValue;
    // }

    // get fightingEnergies () {
    //     return this._fightingEnergies;
    // }

    // set fightingEnergies (variation) {
    //     this._fightingEnergies += variation;
    // }

    get evolvesFrom () {
        return this._evolvesFrom;
    }

    get isInvincible () {
        return this._isInvincible;
    }

    set isInvincible (bool) {
        this._isInvincible = bool;
    }

    get canAttack () {
        return this._canAttack;
    }

    set canAttack (bool) {
        this._canAttack = bool;
    }

    get turnNumberWhenPlayed (){
        return this._turnNumberWhenPlayed;
    }

    set turnNumberWhenPlayed (turnNumber){
        this._turnNumberWhenPlayed = turnNumber;
    } 

    addEnergy (energy) {
        energy.location = `Pokemon ID${this.id}`;
        this._energies.push(energy);
        this.modifyEnergyAmount(1);
        // switch (energy.type){
        //     case 'w': this._waterEnergies += 1; break;
        //     case 'c': this._colorlessEnergies += 1; break;
        //     case 'f': this._fightingEnergies += 1; break;
        // }
    }

    // This method validates the energy requirement of an attack against the attached energies
    checkEnergies (attackRequirement){
        // let requirementArray = formatEnergyRequirementToArray(attackRequirement);

        // Checking for requirements : Total number of energies
        let validated = true;
        // let totalEnergiesNeeded = 0;
        if (this._energyAmount < attackRequirement) {
            validated = false;
        }
        
        return validated;
    }

    // This method removes the specific retreat energy cost and adjusts energy counts
    payRetreatCost () {
        this.payEnergyCost(this.retreatCost);
    }

    // This method removes paid energy cost and adjusts energy counts
    // As well, it returns the cards to be sent to the discard at the Player level
    payEnergyCost (energyCost) {
        let toDiscardArray = [];

        // removing cards
        let cardToDiscard = this.energies.splice(0, energyCost);
        toDiscardArray.push(cardToDiscard);
        
        // adjusting energy amount
        this.modifyEnergyAmount(-energyCost);

        return toDiscardArray;
    }

    checkIsDead (){
        if(this.hpCurrent <= 0){
            this.alive = false;
            this.hpCurrent = 0;
            return true;
        };
    }

    hpModifier (value){
        if (this.isInvincible && value <= 0) {
            displayInTicker('This Pokemon is currently invincible.')
            return;
        }
        
        if(typeof value === 'number'){
            this.hpCurrent += value;
        }

        if (this.hpCurrent > this.hpOriginal) {
            this.hpCurrent = this.hpOriginal
        }

        if (this.hpCurrent < 0) {
            this.hpCurrent = 0;
        }
    }
}

// ***DECK 1 POKEMON***

class Chien_Pao extends Pokemon {
    constructor (id){
        super(id, 'Chien-Pao EX', 220, 'Water', 'Basic', 'Mx2', "", 2, '---');
        this._ability = {
            name: 'Shivery Chill',
            description: 'Once during your turn, if this Pokemon is in the Active Spot, you may choose up to 2 Basic Water Energy card from your Deck, and put them into your hand.',
            id: 2,
            turnNumberWhenPlayed: -1,
            async effect(activePlayer, opposingPlayer, thisPokemon){
                // Checking if already used during turn
                if (thisPokemon.ability.turnNumberWhenPlayed === activePlayer.turnPlayed) {
                    clearTicker();
                    displayInTicker(`${this.name} can only be used once per turn.`);
                    let continueButtonPromiseHolder = await continueButtonPromise('Go back to Actions', 'ticker');
                    return;
                }

                // Checking if Chien-Pao is in the Active spot.
                if (thisPokemon.location !== 'Active') {
                    clearTicker();
                    displayInTicker(`${this.name} can only be used when Chien-Pao is in the Active spot.`);
                    let continueButtonPromiseHolder = await continueButtonPromise('Go back to Actions', 'ticker');
                    return;
                }


                // Mostly copied from energyRetrieval()
                let deckEnergies = activePlayer.energiesFromDeck;
                switch (true){
                    case deckEnergies.length >= 3: {
                        // clearTicker();
                        displayInTicker('Put up to 2 energy cards from your deck into your hand.')

                        // Getting and displaying array of energies in discard
                        displayCardArrayInHeader(deckEnergies, 'card-display');
                        let htmlEnergyCards = returnCardsOfTypeInLocation('card-display', 'energyCard');
                        
                        // Waiting for selection
                        let chosenEnergyID1 = await setEventListnersOnCards(htmlEnergyCards);
                        let chosenEnergyID2 = await setEventListnersOnCards(htmlEnergyCards);

                        chosenEnergyID1 = Number(chosenEnergyID1);
                        chosenEnergyID2 = Number(chosenEnergyID2);
                        
                        // Adding chosen cards to hand
                        let chosenCard1 = activePlayer.extractCardOutOfDeck(chosenEnergyID1);
                        let chosenCard2 = activePlayer.extractCardOutOfDeck(chosenEnergyID2); 

                        activePlayer.addToHand(chosenCard1);
                        activePlayer.addToHand(chosenCard2);

                        clearTicker();
                        clearCardDisplay();
                        clearMain()
                        displayHud(activePlayer, opposingPlayer);
                        displayInTicker(`Adding ${chosenCard1.name} and ${chosenCard2.name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 2: {
                        // Adding chosen pokemons to hand
                        deckEnergies.forEach(card => {
                            activePlayer.addToHand(activePlayer.extractCardOutOfDeck(card.id));
                        });

                        // Display
                        clearTicker();
                        displayInTicker(`Adding ${deckEnergies[0].name} and ${deckEnergies[1].name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 1: {
                        // Adding chosen pokemons to hand
                        activePlayer.addToHand(activePlayer.extractCardOutOfDeck(deckEnergies[0].id));

                        // Display
                        clearTicker();
                        displayInTicker(`Adding ${deckEnergies[0].name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 0: {
                        // Display
                        clearTicker();
                        displayInTicker('You do not have any energy card in your deck.');
                        break;
                    }
                }
                this.turnNumberWhenPlayed = activePlayer.turnPlayed;
                let continueButtonPromiseHolder = await continueButtonPromise('Go back to Actions', 'ticker');
            }
        },
        this._attacks = [{
            name: "Hail Blade",
            energy: 2,
            points: 60,
            description: 'You may discard any amount of water energy from your Pokemon. This attack does 60 damage for each card your discarded in this way.',
            enabled: true,
            id: 1,

            async effect(opposingPlayer, activePlayer, thisPokemon){
                let totalPoints = 0;
                let numberOfEnergiesToSpend;

                // Getting Input
                clearTicker();
                const ticker = document.getElementById('ticker');
                const htmlForm = `<label for="amount">How many energies would you like to spend?</label>
                <input type="number" name="amount" id="amount">`;
                ticker.innerHTML = htmlForm;
                await continueButtonPromise('OK', 'ticker');
                numberOfEnergiesToSpend = Number(document.getElementById('amount').value);

                // limiting numberOfEnergiesToSpend to the number of water energies available
                if (numberOfEnergiesToSpend > activePlayer.active.waterEnergies) {
                    numberOfEnergiesToSpend = activePlayer.active.waterEnergies;
                }

                // Removing used energies
                // The payEnergyCost() is Pokemon function, not a Player function. 
                // It need to be used with addToDiscard
                let cardsToDiscard = activePlayer.active.payEnergyCost(numberOfEnergiesToSpend);
                cardsToDiscard.forEach(card => {
                    activePlayer.addToDiscard(card);
                });



                totalPoints = numberOfEnergiesToSpend*this.points;
                clearTicker();
                opposingPlayer.active.hpModifier(-totalPoints);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${totalPoints} points damage to ${opposingPlayer.active.name}.`)
                clearMain();
                displayHud(activePlayer, opposingPlayer);
            }
        }]
    }
}

class Bruxish extends Pokemon {
    constructor (id){
        super(id, 'Bruxish', 100, 'Water', 'Basic', 'Ex2', "", 1, '---');
        this._attacks = [{
            name: "Vivid Charge",
            energy: 1,
            points: 0,
            description: 'Search your deck for up to three basic energy cards, reveal them, and put them into your hand. Then, shuffle your deck.',
            enabled: true,
            id: 2,
            
            async effect(opposingPlayer, activePlayer, thisPokemon){
                let deckEnergies = activePlayer.energiesFromDeck;
                switch (true){
                    case deckEnergies.length >= 4: {
                        displayInTicker('Put 3 energy cards from your deck into your hand.')

                        // Getting and displaying array of energies in discard
                        displayCardArrayInHeader(deckEnergies, 'card-display');
                        let htmlEnergyCards = returnCardsOfTypeInLocation('card-display', 'energyCard');
                        
                        // Waiting for selection
                        let chosenEnergyID1 = await setEventListnersOnCards(htmlEnergyCards);
                        let chosenEnergyID2 = await setEventListnersOnCards(htmlEnergyCards);
                        let chosenEnergyID3 = await setEventListnersOnCards(htmlEnergyCards);

                        chosenEnergyID1 = Number(chosenEnergyID1);
                        chosenEnergyID2 = Number(chosenEnergyID2);
                        chosenEnergyID3 = Number(chosenEnergyID3);
                        
                        // Adding chosen cards to hand
                        let chosenCard1 = activePlayer.extractCardOutOfDeck(chosenEnergyID1);
                        let chosenCard2 = activePlayer.extractCardOutOfDeck(chosenEnergyID2); 
                        let chosenCard3 = activePlayer.extractCardOutOfDeck(chosenEnergyID3); 

                        activePlayer.addToHand(chosenCard1);
                        activePlayer.addToHand(chosenCard2);
                        activePlayer.addToHand(chosenCard3);

                        clearTicker();
                        displayInTicker(`Adding ${chosenCard1.name}, ${chosenCard2.name} and ${chosenCard3.name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 3: {
                        // Adding chosen energies to hand
                        deckEnergies.forEach(card => {
                            activePlayer.addToHand(activePlayer.extractCardOutOfDeck(card.id));
                        });

                        // Display
                        clearTicker();
                        displayInTicker(`Adding ${deckEnergies[0].name}, ${deckEnergies[1].name} and ${deckEnergies[2].name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 2: {
                        // Adding chosen energies to hand
                        deckEnergies.forEach(card => {
                            activePlayer.addToHand(activePlayer.extractCardOutOfDeck(card.id));
                        });

                        // Display
                        clearTicker();
                        displayInTicker(`Adding ${deckEnergies[0].name} and ${deckEnergies[1].name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 1: {
                        // Adding chosen pokemons to hand
                        activePlayer.addToHand(activePlayer.extractCardOutOfDeck(deckEnergies[0].id));

                        // Display
                        clearTicker();
                        displayInTicker(`Adding ${deckEnergies[0].name} to your hand.`);
                        break;
                    }
                    case deckEnergies.length === 0: {
                        // Display
                        clearTicker();
                        displayInTicker('You do not have any energy card in your deck.');
                        break;
                    }
                }
                let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
            }
        },
        {
            name: "Wave Splash",
            energy: 1,
            points: 60,
            description: '',
            enabled: true,
            id: 3,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                clearTicker();
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            }
        },
    ];
    }
}

class Buizel extends Pokemon {
    constructor (id){
        super(id, 'Buizel', 70, 'Water', 'Basic', 'Ex2', "", 1, '---');
        this._attacks = [{
            name: "Rain Splash",
            energy: 1,
            points: 10,
            description: '',
            enabled: true,
            id: 4,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                clearTicker();
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        },
        {
            name: "Razor Fin",
            energy: 2,
            points: 20,
            description: '',
            enabled: true,
            id: 6,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                clearTicker();
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            }
        },
    ];
    }
}

class Floatzel extends Pokemon {
    constructor (id){
        super(id, 'Floatzel', 120, 'Water', 'Level 1', 'Ex2', "", 1, 'Buizel');
        this._attacks = [{
            name: "Hydro Pump",
            energy: 2,
            points: 50,
            description: 'This attack does 20 more damage for each Water Energy attached to this Pokemon.',
            enabled: true,
            id: 8,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                const totalPoints = this.points + 20 * activePlayer.active.energyAmount;
                clearTicker();
                opposingPlayer.active.hpModifier(-totalPoints);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${totalPoints} points damage to ${opposingPlayer.active.name}.`)
            }
        }];
    }
}

class Frigibax extends Pokemon {
    constructor (id){
        super(id, 'Frigibax', 60, 'Water', 'Basic', 'Mx2', "", 1);
        this._attacks = [{
            name: "Tackle",
            energy: 2,
            points: 30,
            description: '',
            enabled: true,
            id: 10,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                clearTicker();
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        }];
    }
}

class Arctibax extends Pokemon {
    constructor (id){
        super(id, 'Arctibax', 90, 'Water', 'Level 1', 'Mx2', "", 2, 'Frigibax');
        this._attacks = [{
            name: "Sharp Fin",
            energy: 2,
            points: 40,
            description: '',
            enabled: true,
            id: 15,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                clearTicker();
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
            },
            {
            name: "Frost Smash",
            energy: 3,
            points: 80,
            description: '',
            enabled: true,
            id: 20,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
            }
        ];
    }
}

class Baxcalibur extends Pokemon {
    constructor (id){
        super(id, 'Baxcalibur', 160, 'Water', 'Level 2', 'Mx2', "", 2, 'Arctibax');
        this._ability = {
            name: 'Super Cold',
            description: 'As often as you like during your turn, you may attach a Basic Water Energy card from your hand to 1 of your Pokemons.',
            id: 1,
            turnNumberWhenPlayed: -1,
            async effect(activePlayer, opposingPlayer){
                clearTicker();
                // Mostly copied from turnAttachEnergy()
                if (!activePlayer.isThereEnergyInHand()) {
                    displayInTicker('You have no energy card in hand.');
                    await continueButtonPromise('Go back to Actions', 'ticker');
                    return;
                }
            
                displayInTicker('Click on an energy card to select it. Then, click on a pokemon from your bench or on your active pokemon to give it the energy.');
                let continueButtonPromiseHolder = continueButtonPromise('Go back to Actions', 'ticker');
            
                // Getting energy card choice
                let htmlEnergyCards = returnCardsOfTypeInLocation(`hand${activePlayer.playerNumber}`, 'energyCard');
                let chosenEnergyCardID = setEventListnersOnCards(htmlEnergyCards).then((id)=>{
                    chosenEnergyCardID = id;
                });
                
                // Waiting for either a Skip Step button click or an Energy Card pick.
                let outcome = await Promise.race([continueButtonPromiseHolder, chosenEnergyCardID]);
                if (outcome === 'Clicked') {
                    return;
                }
                
                // Getting pokemon card choice
                let htmlPokemonActiveCard = returnCardsOfTypeInLocation(`active${activePlayer.playerNumber}`,'pokemonCard');
                let htmlPokemonBenchCards = returnCardsOfTypeInLocation(`bench${activePlayer.playerNumber}`,'pokemonCard');
            
                let chosenActivePokemonID;
                let chosenBenchPokemonID;
                
                let chosenActivePokemonPromise = setEventListnersOnCards(htmlPokemonActiveCard).then((id)=>{
                    chosenActivePokemonID = id;
                });
                let chosenBenchPokemonPromise = setEventListnersOnCards(htmlPokemonBenchCards).then((id)=>{
                    chosenBenchPokemonID = id;
                });
                
            
                // Waiting for either a Skip Step button click or a Bench Pokemon Card pick or an Active Pokemon Card pick.
                let outcome2 = await Promise.race([continueButtonPromiseHolder, chosenBenchPokemonPromise, chosenActivePokemonPromise]);
                if (outcome2 === 'Clicked') {
                    return;
                }
            
                // Adding the energy to the Pokemon
                let pokemonName;
                let chosenPokemonID;
                chosenEnergyCardID = Number(chosenEnergyCardID);
                let energyCard = activePlayer.extractCardOutOfHand(chosenEnergyCardID);
            
                // Case if chosen Pokemon is Active
                if (typeof chosenActivePokemonID === 'string') {
                    chosenPokemonID = Number(chosenActivePokemonID);
                    pokemonName = activePlayer.active.name;
                    activePlayer.active.addEnergy(energyCard);
                } else {
                    // Case if chosen Pokemon is from Bench
                    chosenPokemonID = Number(chosenBenchPokemonID);
                    activePlayer.bench.forEach(card => {
                        if (card.id === chosenPokemonID) {
                            pokemonName = card.name;
                            card.addEnergy(energyCard);
                        }
                    });
                }
            
                // Displaying results
                jumpTo('header');
                clearTicker();
                clearMain();
                displayHud(activePlayer, opposingPlayer);
                displayInTicker(`Energy added to ${pokemonName}.`);
                await continueButtonPromise('Go back to Actions', 'ticker');
                return;
            }
        }
        this._attacks = [{
            name: "Buster Tail",
            energy: 3,
            points: 130,
            description: '',
            enabled: true,
            id: 30,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        }]
    }
}

class Delibird extends Pokemon {
    constructor (id){
        super(id, 'Delibird', 90, 'Water', 'Basic', 'Mx2', "", 1, '---');
        this._attacks = [{
            name: "Double Draw",
            energy: 1,
            points: 0,
            description: 'Draw 2 cards.',
            enabled: true,
            id: 33,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                let drawnedCards = activePlayer.drawFromDeck(2);
                clearTicker();
                drawnedCards.forEach(card => {
                    displayInTicker(`You have picked ${card.name}.`)
                });
            },
            },
            {
            name: "Ice Wing",
            energy: 2,
            points: 30,
            description: '',
            enabled: true,
            id: 37,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
            }
        ];
    }
}

class Marill extends Pokemon {
    constructor (id){
        super(id, 'Marill', 70, 'Water', 'Basic', 'Ex2', "", 1, '---');
        this._attacks = [{
            name: "Bubble Drain",
            energy: 2,
            points: 20,
            description: 'Heals 20 damage from this pokemon.',
            enabled: true,
            id: 40,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                let healHP = activePlayer.active.hpOriginal - activePlayer.active.hpCurrent;
                if (healHP > 20){
                    healHP = 20;
                } 
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                activePlayer.active.hpModifier(healHP);
                displayInTicker(`${thisPokemon.name} has healed ${healHP} points and inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
                clearMain();
                displayHud(activePlayer, opposingPlayer);
            },
        }];
    }
}

class Azumarill extends Pokemon {
    constructor (id){
        super(id, 'Azumarill', 120, 'Water', 'Level 1', 'Mx2', "", 1, 'Marill');
        this._attacks = [{
            name: "Bubble Drain",
            energy: 2,
            points: 50,
            description: 'Heals 30 damage from this Pokemon.',
            enabled: true,
            id: 45,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                let healHP = activePlayer.active.hpOriginal - activePlayer.active.hpCurrent;
                if (healHP > 30){
                    healHP = 30;
                } 
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                activePlayer.active.hpModifier(healHP);
                displayInTicker(`${thisPokemon.name} has healed ${healHP} points and inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
                clearMain();
                displayHud(activePlayer, opposingPlayer);
            },
            },
            {
            name: "Slam",
            energy: 3,
            points: 100,
            description: 'Flip 2 coins. This attack does 100 damage for each heads.',
            enabled: true,
            id: 50,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                const coin1 = coinToss();
                const coin2 = coinToss();
                let totalPoints = 0;
                if (coin1 === 'Head') {
                    totalPoints += this.points;
                }
                if (coin2 === 'Head') {
                    totalPoints += this.points;
                }
                opposingPlayer.active.hpModifier(-totalPoints);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${totalPoints} points damage to ${opposingPlayer.active.name}.`)
            },
            }
        ];
    }
}

// ***DECK 2 POKEMON***

class Cyclizar extends Pokemon {
    constructor (id){
        super(id, 'Cyclizar', 110, 'Colorless', 'Basic', 'Fx2', "", 0, '---');
        this._attacks = [{
            name: "Touring",
            energy: 1,
            points: 0,
            description: 'Draw 2 cards.',
            enabled: true,
            id: 133,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                let drawnedCards = activePlayer.drawFromDeck(2);
                clearTicker();
                drawnedCards.forEach(card => {
                    displayInTicker(`You have picked ${card.name}.`)
                });
            },
            },
            {
            name: "Speed Attack",
            energy: 3,
            points: 100,
            description: '',
            enabled: true,
            id: 137,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
            }
        ];
    }
}

class Koraidon extends Pokemon {
    constructor (id){
        super(id, 'Koraidon', 130, 'Fighting', 'Basic', 'Fx2', "", 2, '---');
        this._attacks = [
        {
            name: "Claw Slash",
            energy: 3,
            points: 70,
            description: '',
            enabled: true,
            id: 140,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        },
        {
            name: "Rampaging Fang",
            energy: 4,
            points: 190,
            description: 'Discard 3 Energy from this Pokemon.',
            enabled: true,
            id: 141,

            effect(opposingPlayer, activePlayer, thisPokemon){
                let numberOfEnergiesToSpend = 3;

                // Removing used energies
                // The payEnergyCost() is Pokemon function, not a Player function. 
                // It need to be used with addToDiscard
                let cardsToDiscard = activePlayer.active.payEnergyCost(numberOfEnergiesToSpend);
                cardsToDiscard.forEach(card => {
                    activePlayer.addToDiscard(card);
                });

                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                clearTicker();
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
                clearMain();
                displayHud(activePlayer, opposingPlayer);
            }
        }
        ];
    }
}

class Lechonk extends Pokemon {
    constructor (id){
        super(id, 'Lechonk', 60, 'Colorless', 'Basic', 'Fx2', "", 1, '---');
        this._attacks = [{
            name: "Collect",
            energy: 1,
            points: 0,
            description: 'Draw a card.',
            enabled: true,
            id: 142,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                let drawnedCards = activePlayer.drawFromDeck(1);
                clearTicker();
                drawnedCards.forEach(card => {
                    displayInTicker(`You have picked ${card.name}.`)
                });
            },
            },
            {
            name: "Tackle",
            energy: 3,
            points: 30,
            description: '',
            enabled: true,
            id: 143,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
            }
        ];
    }
}

class Oinkologne extends Pokemon {
    constructor (id){
        super(id, 'Oinkologne', 120, 'Colorless', 'Level 1', 'Fx2', "", 2, 'Lechonk');
        this._attacks = [
        {
            name: "Ram",
            energy: 2,
            points: 50,
            description: '',
            enabled: true,
            id: 145,
            
            effect(opposingPlayer, activePlayer, thisPokemon){
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        },
        {
            name: "Leg Stomp",
            energy: 3,
            points: 130,
            description: `Flip a coin. If tails, during your next turn, this Pokemon can't attack.`,
            enabled: true,
            id: 146,

            effect(opposingPlayer, activePlayer, thisPokemon){
                // Fipping coin, switching Enabled, and adding callback function
                if (coinToss() === 'Tail') {
                    thisPokemon.canAttack = false;
                    let turnWhenDisabled = activePlayer.turnPlayed;
                    let callBackFunction = ()=>{
                        if (activePlayer.turnPlayed === turnWhenDisabled + 1) {
                            thisPokemon.canAttack = true;
                        }        
                    };
                    activePlayer.addToEndOfTurnCallbackFunctions(callBackFunction);
                    displayInTicker(`Got a tail. ${thisPokemon.name} won't be able to attack on next turn.`)
                }


                // Ordinary attack
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            }
        }
        ];
    }
}

class Mankey extends Pokemon {
    constructor(id) {
        super(id, 'Mankey', 60, 'Fighting', 'Basic', 'Px2', "", 1, '---');
        this._attacks = [{
            name: "Monkey Beatdown",
            energy: 1,
            points: 30,
            description: 'This Pokemon also does 10 damage to itself.',
            enabled: true,
            id: 147,

            effect(opposingPlayer, activePlayer, thisPokemon) {
                opposingPlayer.active.hpModifier(-this.points);
                thisPokemon.hpModifier(-10);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                activePlayer.addToPokemonsToCheckIfDead(thisPokemon);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} damage to ${opposingPlayer.active.name}, and inflicted 10 damage to itself.`)
            },
        }
        ];
    }
}

class Primeape extends Pokemon {
    constructor(id) {
        super(id, 'Primeape', 90, 'Fighting', 'Level 1', 'Px2', "", 1, 'Mankey');
        this._attacks = [{
            name: "Raging Punch",
            energy: 1,
            points: 70,
            description: 'This Pokemon also does 20 damage to itself.',
            enabled: true,
            id: 148,

            effect(opposingPlayer, activePlayer, thisPokemon) {
                opposingPlayer.active.hpModifier(-this.points);
                thisPokemon.hpModifier(-20);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                activePlayer.addToPokemonsToCheckIfDead(thisPokemon);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} damage to ${opposingPlayer.active.name}, and inflicted 20 damage to itself.`)
            },
        }
        ];
    }
}

class Annihilape extends Pokemon {
    constructor(id) {
        super(id, 'Annihilape', 140, 'Fighting', 'Level 2', 'Px2', "", 2, 'Primeape');
        this._attacks = [
            {
            name: "Rage Fist",
            energy: 1,
            points: 70,
            description: 'This attack does 70 damage for each Prize card your opponent has taken.',
            enabled: true,
            id: 149,

            effect(opposingPlayer, activePlayer, thisPokemon) {
                let totalPoints = this.points * (6 - opposingPlayer.prizes.length);
                opposingPlayer.active.hpModifier(-totalPoints);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${totalPoints} points damage to ${opposingPlayer.active.name}.`)
            },
            },
            {
                name: "Dynamite Punch",
                energy: 2,
                points: 170,
                description: 'This Pokemon also does 50 damage to itself.',
                enabled: true,
                id: 150,

                effect(opposingPlayer, activePlayer, thisPokemon) {
                    opposingPlayer.active.hpModifier(-this.points);
                    thisPokemon.hpModifier(-50);
                    opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                    activePlayer.addToPokemonsToCheckIfDead(thisPokemon);
                    displayInTicker(`${thisPokemon.name} has inflicted ${this.points} damage to ${opposingPlayer.active.name}, and inflicted 50 damage to itself.`)
                },
            }
        ];
    }
}

class Meditite extends Pokemon {
    constructor(id) {
        super(id, 'Meditite', 60, 'Fighting', 'Basic', 'Px2', "", 1, '---');
        this._attacks = [{
            name: "Feint",
            energy: 1,
            points: 10,
            description: '',
            enabled: true,
            id: 151,

            effect(opposingPlayer, activePlayer, thisPokemon) {
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                clearTicker();
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        }];
    }
}

class Medicham extends Pokemon {
    constructor(id) {
        super(id, 'Medicham', 90, 'Fighting', 'Level 1', 'Px2', "", 1, 'Meditite');
        this._attacks = [{
            name: "Acu-Punch-Ture",
            energy: 1,
            points: 30,
            description: `Choose 1 of your opponent's Active Pokemon's attacks. During your opponent's next turn, this Pokemon can't use that attack.`,
            enabled: true,
            id: 152,

            async effect(opposingPlayer, activePlayer, thisPokemon) {
                clearTicker();
                
                // Getting the chosen attack to disable and disabling
                let attacks = opposingPlayer.active.attacks;
                let attack;
                let attackIndex;
                
                // Case if only one attack 
                if (attacks.length === 1) {
                    // Disabling the only attack
                    attackIndex = 0;
                    attack = attacks[attackIndex];
                    clearTicker();
                    displayInTicker(`Disabling your opponent's active Pokemon's only attack: ${attack.name}.`);
                    attack.enabled = false;
                    // Setting up Callback function to re-enable the attack
                    let turnWhenDisabled = opposingPlayer.turnPlayed;
                    let callBackFunction = () => {
                        if (opposingPlayer.turnPlayed === turnWhenDisabled) {
                            attack.enabled = true;
                        }
                    };
                }
                // case if 2 attacks
                else if (attacks.length === 2) {
                    clearTicker();
                    displayInTicker('Choose which attack you want to disable:');
                    displayCardArrayInHeader([opposingPlayer.active]);

                    // 2.Setup event listener promises on active's attacks
                    let HTMLAttacks = returnCardsOfTypeInLocation('card-display', 'card-attack');

                    // 2.5 Add mouse hover on attacks
                    for (const attack of HTMLAttacks) {
                        attack.classList.add('hoverActiveAttack');
                    }

                    let chosenAttackID = await setEventListnersOnCards(HTMLAttacks);
                    chosenAttackID = Number(chosenAttackID);
                    // 3.5 Removing :hover on attacks
                    for (const attack of HTMLAttacks) {
                        attack.classList.remove('hoverActiveAttack');
                    }

                    // 3.6 Retieving index from ID
                    attackIndex = returnIndexFromID(opposingPlayer.active.attacks, chosenAttackID);
                    attack = attacks[attackIndex];

                    // disabling the attack
                    clearTicker();
                    displayInTicker(`Disabling ${opposingPlayer.active.name}'s ${attacks[attackIndex].name}.`);
                    attack.enabled = false;
                }

                // Setting up Callback function to re-enable the attack
                let turnWhenDisabled = opposingPlayer.turnPlayed;
                let callBackFunction = () => {
                    if (opposingPlayer.turnPlayed === turnWhenDisabled) {
                        attack.enabled = true;
                    }
                };
                opposingPlayer.addToEndOfTurnCallbackFunctions(callBackFunction);

                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`)
            },
        },
            {
                name: "Kick Shot",
                energy: 1,
                points: 90,
                description: `Flip a coin. If tails, this attack does nothing`,
                enabled: true,
                id: 153,

                effect(opposingPlayer, activePlayer, thisPokemon) {
                    let totalPoints = this.points;
                    if (coinToss() === 'Tail') {
                        totalPoints = 0
                    }
                    opposingPlayer.active.hpModifier(-totalPoints);
                    opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                    clearTicker();
                    displayInTicker(`${thisPokemon.name} has inflicted ${totalPoints} points damage to ${opposingPlayer.active.name}.`);
                },
            }
    ];
    }
}

class Riolu extends Pokemon {
    constructor(id) {
        super(id, 'Riolu', 70, 'Fighting', 'Basic', 'Px2', "", 1, '---');
        this._attacks = [{
            name: "Jab",
            energy: 1,
            points: 10,
            description: ``,
            enabled: true,
            id: 153,

            async effect(opposingPlayer, activePlayer, thisPokemon) {
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                clearTicker();
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
            }
        },
        {
            name: "Low Kick",
            energy: 2,
            points: 20,
            description: ``,
            enabled: true,
            id: 154,

            effect(opposingPlayer, activePlayer, thisPokemon) {
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                clearTicker();
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
            },
        }
        ];
    }
}

class Lucario extends Pokemon {
    constructor(id) {
        super(id, 'Lucario EX', 260, 'Fighting', 'Level 1', 'Px2', "", 2, 'Riolu');
        this._attacks = [{
            name: "Low Sweep",
            energy: 2,
            points: 60,
            description: ``,
            enabled: true,
            id: 155,

            async effect(opposingPlayer, activePlayer, thisPokemon) {
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                clearTicker();
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
            }
        },
        {
            name: "Aura Sphere",
            energy: 3,
            points: 160,
            description: `This attack also does 50 damage to one of your opponent's Benched Pokemon.`,
            enabled: true,
            id: 156,

            async effect(opposingPlayer, activePlayer, thisPokemon) {
                // main attack
                opposingPlayer.active.hpModifier(-this.points);
                opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);

                // Bench Pokemon attack
                switch(true){
                    case opposingPlayer.bench.length === 0: 
                        displayInTicker('Your opponent has an empty Bench.'); 
                        break;
                    case opposingPlayer.bench.length === 1: 
                        opposingPlayer.bench[0].hpModifier(-50);
                        opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.bench[0]);
                        displayInTicker(`${thisPokemon.name} has inflicted 50 points damage to ${opposingPlayer.bench[0].name}.`); 
                        break;
                    case opposingPlayer.bench.length >= 2:
                        clearTicker();
                        displayOpposingPlayeryHud(activePlayer, opposingPlayer);
                        displayInTicker(`Choose which of your opponent's benched Pokemon will get the 50 damage:`)
                        let htmlBenchCards = returnCardsOfTypeInLocation(`bench${ opposingPlayer.playerNumber }`, 'pokemonCard');
                        let cardID = await setEventListnersOnCards(htmlBenchCards);
                        clearTicker();
                        clearMain()
                        displayHud(activePlayer, opposingPlayer);
                        cardID = Number(cardID);
                        let chosenPokemon = returnCardFromID(opposingPlayer.bench, cardID);
                        chosenPokemon.hpModifier(-50);
                        opposingPlayer.addToPokemonsToCheckIfDead(chosenPokemon);
                        displayInTicker(`${thisPokemon.name} has inflicted 50 points damage to ${chosenPokemon.name}.`); 
                        break;
                }
                // clearTicker();
                displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
            },
        }
        ];
    }
}

class Squawkabilly extends Pokemon {
    constructor(id) {
        super(id, 'Squawkabilly', 70, 'Colorless', 'Basic', 'Ex2', "F-30", 1, '---');
        this._attacks = [{
            name: "Call For Family",
            energy: 1,
            points: 0,
            description: `Search your deck for up to 2 Basic Pokemons and put them onto your Bench.`,
            enabled: true,
            id: 157,

            async effect(opposingPlayer, activePlayer, thisPokemon) {
                let deckBasicPokemons = activePlayer.deckBasics;
                let availableBenchSpaces = 5 - activePlayer.bench.length;
                switch (true) {
                    case availableBenchSpaces === 0: 
                        displayInTicker('No space left on the bench.');
                        return;
                    case availableBenchSpaces === 1 && deckBasicPokemons.length >= 1:
                        displayInTicker('Choose 1 basic Pokemon:')

                        // Getting and displaying array of basic pokemon in deck
                        displayCardArrayInHeader(deckBasicPokemons, 'card-display');
                        let htmlPokemonCards = returnCardsOfTypeInLocation('card-display', 'pokemonCard');

                        // Waiting for selection
                        let chosenPokemonID1 = await setEventListnersOnCards(htmlPokemonCards);

                        chosenPokemonID1 = Number(chosenPokemonID1);

                        // Adding chosen cards to bench
                        let chosenCard1 = activePlayer.extractCardOutOfDeck(chosenPokemonID1);
                        activePlayer.shuffleDeck();

                        activePlayer.addToBench(chosenCard1);

                        clearTicker();
                        displayInTicker(`Adding ${chosenCard1.name} to your Bench.`);
                        break;
                
                    case availableBenchSpaces === 1 && deckBasicPokemons.length === 1: 
                        // Adding chosen pokemons to bench
                        activePlayer.addToBench(activePlayer.extractCardOutOfDeck(deckBasicPokemons[0].id));

                        // Display
                        clearTicker();
                        displayInTicker(`Adding ${deckBasicPokemons[0].name} to your Bench.`);
                        break;
                    case availableBenchSpaces === 1 && deckBasicPokemons.length === 0:
                        // Display
                        clearTicker();
                        displayInTicker('You do not have any Basic Pokemon in your deck.');
                        break;
                    case availableBenchSpaces >= 2:
                        switch (true) {
                            case deckBasicPokemons.length >= 3: {
                                displayInTicker('Choose up to 2 basic Pokemons:')

                                // Getting and displaying array of basic pokemon in deck
                                displayCardArrayInHeader(deckBasicPokemons, 'card-display');
                                let htmlPokemonCards = returnCardsOfTypeInLocation('card-display', 'pokemonCard');

                                // Waiting for selection
                                let chosenPokemonID1 = await setEventListnersOnCards(htmlPokemonCards);
                                let chosenPokemonID2 = await setEventListnersOnCards(htmlPokemonCards);

                                chosenPokemonID1 = Number(chosenPokemonID1);
                                chosenPokemonID2 = Number(chosenPokemonID2);

                                // Adding chosen cards to bench
                                let chosenCard1 = activePlayer.extractCardOutOfDeck(chosenPokemonID1);
                                let chosenCard2 = activePlayer.extractCardOutOfDeck(chosenPokemonID2);
                                activePlayer.shuffleDeck();

                                activePlayer.addToBench(chosenCard1);
                                activePlayer.addToBench(chosenCard2);

                                clearTicker();
                                displayInTicker(`Adding ${chosenCard1.name} and ${chosenCard2.name} to your Bench.`);
                                break;
                            }
                            case deckBasicPokemons.length === 2: {
                                // Adding chosen pokemon to bench
                                deckBasicPokemons.forEach(card => {
                                    activePlayer.addToBench(activePlayer.extractCardOutOfDeck(card.id));
                                });

                                // Display
                                clearTicker();
                                displayInTicker(`Adding ${deckBasicPokemons[0].name} and ${deckBasicPokemons[2].name} to your Bench.`);
                                break;
                            }
                            case deckBasicPokemons.length === 1: {
                                // Adding chosen pokemons to bench
                                activePlayer.addToBench(activePlayer.extractCardOutOfDeck(deckBasicPokemons[0].id));

                                // Display
                                clearTicker();
                                displayInTicker(`Adding ${deckBasicPokemons[0].name} to your Bench.`);
                                break;
                            }
                            case deckBasicPokemons.length === 0: {
                                // Display
                                clearTicker();
                                displayInTicker('You do not have any Basic Pokemon in your deck.');
                                break;
                            }
                        }
                        break;
                    };
                }
            },
        {
            name: "Fly",
            energy: 2,
            points: 60,
            description: `Flip a coin. If tails, this attack does nothing. If heads, during your opponent's next turn, this Pokemon is invincible.`,
            enabled: true,
            id: 158,

            async effect(opposingPlayer, activePlayer, thisPokemon) {
                let coinTossResult = coinToss();
                switch (coinTossResult) {
                    case 'Tail':
                        clearTicker();
                        displayInTicker('You got Tails. This attack does nothing.');
                        break;
                    case 'Head':
                        clearTicker();
                        opposingPlayer.active.hpModifier(-this.points);
                        opposingPlayer.addToPokemonsToCheckIfDead(opposingPlayer.active);
                        displayInTicker('You got Heads. Squawkabilly will be invincible for the next turn.');
                        displayInTicker(`${thisPokemon.name} has inflicted ${this.points} points damage to ${opposingPlayer.active.name}.`);
                        thisPokemon.isInvincible = true;
                        let turnWhenDisabled = activePlayer.turnPlayed;
                        let callBackFunction = () => {
                            if (activePlayer.turnPlayed === turnWhenDisabled + 1) {
                                thisPokemon.isInvincible = false;
                            }
                        };
                        opposingPlayer.addToEndOfTurnCallbackFunctions(callBackFunction); 
                }
            },
        }
        ];
    }
}

// *** ENERGY AND TRAINER CARDS ***

class Energy extends Card {
    constructor (id, name, type) {
        super(id, name, 'Energy');
        // this._type = type;
        this._location = 'Deck';
    }

    // get type () {
    //     return this._type;
    // }    
};

class Trainer extends Card {
    constructor (id, name, description){
        super(id, name, 'Trainer');
        this._description = description;
        this._location = 'Deck';
    }

    get description () {
        return this._description;
    }
}

class Supporter extends Trainer {
    constructor (id, name, description){
        super(id, name, description);
        this._category = 'Supporter';
    }
}

class Item extends Trainer {
    constructor (id, name, description){
        super(id, name, description);
        this._category = 'Item';
    }
}

class Youngster extends Supporter {
    constructor (id){
        super(id, 'Youngster', 'Shuffle your hand into your deck. Then, draw 5 cards.');
    }

    async power (player, youngster) {
        player.hand.forEach(card => {
            player.addCardToDeck(card);
        });
        player._hand = [];
        player.addToHand(youngster);
        player.shuffleDeck();
        player.drawFromDeck(5);

        clearTicker();
        displayInTicker('Your hand will be renewed.')
        let continueButtonPromiseHolder = await continueButtonPromise('Go back to Actions', 'ticker');
    }
}

class Nemona extends Supporter {
    constructor (id){
        super(id, 'Nemona', 'Draw 3 cards.');
    }

    async power (player) {
        let drawnedCards = player.drawFromDeck(3);
        displayInTicker(`You picked ${drawnedCards[0].name}, ${drawnedCards[1].name} and ${drawnedCards[2].name}.`)
        let continueButtonPromiseHolder = await continueButtonPromise('Go back to Actions', 'ticker');
    }
}

class Jacq extends Supporter {
    constructor (id){
        super(id, 'Jacq', 'Search your deck for up to 2 Evolution Pokemon, and put them into your hand.');
    }

   async power (player) {
        let deckEvolutionPokemons = player.deckLevel1AndLevel2;
        switch (true){
            case deckEvolutionPokemons.length >= 3: {
                displayInTicker('Choose 2 cards to put in your hand.')
                displayCardArrayInHeader(deckEvolutionPokemons, 'card-display');
                let htmlPokemonCards = returnCardsOfTypeInLocation('card-display', 'pokemonCard');
                
                let chosenPokemonID1 = await setEventListnersOnCards(htmlPokemonCards);
                let chosenPokemonID2 = await setEventListnersOnCards(htmlPokemonCards);

                chosenPokemonID1 = Number(chosenPokemonID1);
                chosenPokemonID2 = Number(chosenPokemonID2);
                
                // Adding chosen pokemons to hand
                let chosenPokemon1 = player.extractCardOutOfDeck(chosenPokemonID1);
                let chosenPokemon2 = player.extractCardOutOfDeck(chosenPokemonID2); 
                player.shuffleDeck();

                player.addToHand(chosenPokemon1);
                player.addToHand(chosenPokemon2);

                clearTicker();
                displayInTicker(`Adding ${chosenPokemon1.name} and ${chosenPokemon2.name} to your hand.`);
                break;
            }
            case deckEvolutionPokemons.length === 2: {
                // Adding chosen pokemons to hand
                deckEvolutionPokemons.forEach(card => {
                    player.addToHand(player.extractCardOutOfDeck(card.id));
                });

                // Display
                clearTicker();
                displayInTicker(`Adding ${deckEvolutionPokemons[0].name} and ${deckEvolutionPokemons[1].name} to your hand.`);
                break;
            }
            case deckEvolutionPokemons.length === 1: {
                // Adding chosen pokemons to hand
                player.addToHand(player.extractCardOutOfDeck(deckEvolutionPokemons[0].id));

                // Display
                clearTicker();
                displayInTicker(`Adding ${deckEvolutionPokemons[0].name} to your hand.`);
                break;
            }
            case deckEvolutionPokemons.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any evolution Pokemon in your deck.');
                break;
            }
        }

        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class EnergyRetrieval extends Item {
    constructor (id){
        super(id, 'Energy Retrieval', 'Put up to 2 Basic Energy cards from your discard pile into your hand.');
    }

    async power (player) {
        let discardEnergies = player.energiesFromDiscard;
        switch (true){
            case discardEnergies.length >= 3: {
                displayInTicker('Put up to 2 energy cards from your discard into your hand.')

                // Getting and displaying array of energies in discard
                displayCardArrayInHeader(discardEnergies, 'card-display');
                let htmlEnergyCards = returnCardsOfTypeInLocation('card-display', 'energyCard');
                
                // Waiting for selection
                let chosenEnergyID1 = await setEventListnersOnCards(htmlEnergyCards);
                let chosenEnergyID2 = await setEventListnersOnCards(htmlEnergyCards);

                chosenEnergyID1 = Number(chosenEnergyID1);
                chosenEnergyID2 = Number(chosenEnergyID2);
                
                // Adding chosen cards to hand
                let chosenCard1 = player.extractCardOutOfDiscard(chosenEnergyID1);
                let chosenCard2 = player.extractCardOutOfDiscard(chosenEnergyID2); 

                player.addToHand(chosenCard1);
                player.addToHand(chosenCard2);

                clearTicker();
                displayInTicker(`Adding ${chosenCard1.name} and ${chosenCard2.name} to your hand.`);
                break;
            }
            case discardEnergies.length === 2: {
                // Adding chosen pokemons to hand
                discardEnergies.forEach(card => {
                    player.addToHand(player.extractCardOutOfDiscard(card.id));
                });

                // Display
                clearTicker();
                displayInTicker(`Adding ${discardEnergies[0].name} and ${discardEnergies[1].name} to your hand.`);
                break;
            }
            case discardEnergies.length === 1: {
                // Adding chosen pokemons to hand
                player.addToHand(player.extractCardOutOfDiscard(discardEnergies[0].id));

                // Display
                clearTicker();
                displayInTicker(`Adding ${discardEnergies[0].name} to your hand.`);
                break;
            }
            case discardEnergies.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any energy card in your discard.');
                break;
            }
        }
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class GreatBall extends Item {
    constructor (id){
        super(id, 'Great Ball', 'Look at the top 7 cards from your deck. You may reveal a Pokemon you find there and put it into your hand. Shuffle the ohher cards back into the deck.');
    }

    async power (player) {
        let deckPokemons = player.deckPokemons(7);
        switch (true){
            case deckPokemons.length >= 2: {
                displayInTicker('Choose 1 pokemon to put into your hand.')

                // Getting and displaying array of energies in discard
                displayCardArrayInHeader(deckPokemons, 'card-display');
                let htmlPokemonsCards = returnCardsOfTypeInLocation('card-display', 'pokemonCard');
                
                // Waiting for selection
                let chosenPokemonID = await setEventListnersOnCards(htmlPokemonsCards);

                chosenPokemonID = Number(chosenPokemonID);
                
                // Adding chosen cards to hand
                let chosenCard1 = player.extractCardOutOfDeck(chosenPokemonID);
                player.shuffleDeck();

                player.addToHand(chosenCard1);

                clearTicker();
                displayInTicker(`Adding ${chosenCard1.name} to your hand.`);
                break;
            }
            case deckPokemons.length === 1: {
                // Adding chosen pokemons to hand
                player.addToHand(player.extractCardOutOfDeck(deckPokemons[0].id));

                // Display
                clearTicker();
                displayInTicker(`Adding ${deckPokemons[0].name} to your hand.`);
                break;
            }
            case deckPokemons.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any pokemon card in your first 7 deck cards.');
                break;
            }
        }
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class NestBall extends Item {
    constructor (id){
        super(id, 'Nest Ball', 'Search your deck for a basic Pokemon put it onto your hand.');
    }

    async power (player) {
        let deckBasics = player.deckBasics;
        switch (true){
            case deckBasics.length >= 2: {
                displayInTicker('Choose 1 basic pokemon from your deck to put into your hand.')

                // Getting and displaying array of energies in discard
                displayCardArrayInHeader(deckBasics, 'card-display');
                let htmlPokemonsCards = returnCardsOfTypeInLocation('card-display', 'pokemonCard');
                
                // Waiting for selection
                let chosenPokemonID = await setEventListnersOnCards(htmlPokemonsCards);

                chosenPokemonID = Number(chosenPokemonID);
                
                // Adding chosen cards to hand
                let chosenCard1 = player.extractCardOutOfDeck(chosenPokemonID);
                player.shuffleDeck();

                player.addToHand(chosenCard1);
                

                clearTicker();
                displayInTicker(`Adding ${chosenCard1.name} to your hand.`);
                break;
            }
            case deckBasics.length === 1: {
                // Adding chosen pokemons to hand
                player.addToHand(player.extractCardOutOfDeck(deckBasics[0].id));

                // Display
                clearTicker();
                displayInTicker(`Adding ${deckBasics[0].name} to your hand.`);
                break;
            }
            case deckBasics.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any Basic Pokemon card in your deck.');
                break;
            }
        }
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class Pokegear extends Item {
    constructor (id){
        super(id, 'Pokegear 3.0', 'Look at the top 7 cards from your deck. You may reveal a Supporter card you find there and put it into your hand. Shuffle the ohher cards back into the deck.');
    }

    async power (player) {
        let deckSupporters = player.deckSupporters(7);
        switch (true){
            case deckSupporters.length >= 2: {
                clearTicker();
                displayInTicker('Choose 1 Supporter from your deck to put into your hand.')

                // Getting and displaying array of energies in discard
                displayCardArrayInHeader(deckSupporters, 'card-display');
                let htmlSupporterCards = returnCardsOfTypeInLocation('card-display', 'trainerCard');
                
                // Waiting for selection
                let chosenSupporterID = await setEventListnersOnCards(htmlSupporterCards);

                chosenSupporterID = Number(chosenSupporterID);
                
                // Adding chosen cards to hand
                let chosenCard1 = player.extractCardOutOfDeck(chosenSupporterID);
                player.shuffleDeck();

                player.addToHand(chosenCard1);

                clearTicker();
                displayInTicker(`Adding ${chosenCard1.name} to your hand.`);
                break;
            }
            case deckSupporters.length === 1: {
                // Adding chosen pokemons to hand
                player.addToHand(player.extractCardOutOfDeck(deckSupporters[0].id));

                // Display
                clearTicker();
                displayInTicker(`Adding ${deckSupporters[0].name} to your hand.`);
                break;
            }
            case deckSupporters.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any Trainer card in your first 7 deck cards.');
                break;
            }
        }
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class Switch extends Item {
    constructor (id){
        super(id, 'Switch', 'Switch your active Pokemon with one of your Benched Pokemon.');
    }

    async power (player) {
        switch (true){
            case player.bench.length >= 2: {
                displayInTicker('Choose your new active from the bench.')

                // Getting pokemon on bench
                let htmlPokemonCards = returnCardsOfTypeInLocation(`bench${ player.playerNumber }`, 'pokemonCard');
                
                // Waiting for selection
                let chosenPokemonID = await setEventListnersOnCards(htmlPokemonCards);

                chosenPokemonID = Number(chosenPokemonID);
                
                // Switching active and displaying
                let chosenCard1 = player.extractCardOutOfBench(chosenPokemonID);
                clearTicker();
                displayInTicker(`Sending ${player.active.name} to bench.`);
                player.addToBench(player.active);
                player.active = chosenCard1;
                displayInTicker(`${chosenCard1.name} is your new active.`);
                break;
            }
            case player.bench.length === 1: {
               // Switching active and displaying
               let chosenCard1 = player.extractCardOutOfBench(player.bench[0].id);
               clearTicker();
               displayInTicker(`Sending ${player.active.name} to bench.`);
               player.addToBench(player.active);
               player.active = chosenCard1;
               displayInTicker(`${chosenCard1.name} is your new active.`);
               break;
            }
            case player.bench.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You cannot switch active because your bench is empty.');
                break;
            }
        }
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class PalPad extends Item {
    constructor (id){
        super(id, 'Pal Pad', 'Shuffle 2 Supporter cards from your discard pile into your deck.');
    }

    async power (player) {
        let discardSupporters = player.supportersFromDiscard;
        switch (true){
            case discardSupporters.length >= 3: {
                displayInTicker('Shuffle 2 supporter cards from your discard into your deck.')

                // Getting and displaying array of energies in discard
                displayCardArrayInHeader(discardSupporters, 'card-display');
                let htmlSupporterCards = returnCardsOfTypeInLocation('card-display', 'trainerCard');
                
                // Waiting for selection
                let chosenSupporterID1 = await setEventListnersOnCards(htmlSupporterCards);
                let chosenSupporterID2 = await setEventListnersOnCards(htmlSupporterCards);

                chosenSupporterID1 = Number(chosenSupporterID1);
                chosenSupporterID2 = Number(chosenSupporterID2);
                
                // Shuffling chosen cards in deck
                let chosenCard1 = player.extractCardOutOfDiscard(chosenSupporterID1);
                let chosenCard2 = player.extractCardOutOfDiscard(chosenSupporterID2); 
                
                player.addCardToDeck(chosenCard1);
                player.addCardToDeck(chosenCard2);
                player.shuffleDeck();

                clearTicker();
                displayInTicker(`Shuffling ${chosenCard1.name} and ${chosenCard2.name} in your deck.`);
                break;
            }
            case discardSupporters.length === 2: {
                // Adding chosen supporter to deck and shuffling
                discardSupporters.forEach(card => {
                    player.addCardToDeck(player.extractCardOutOfDiscard(card.id));
                });
                player.shuffleDeck();

                // Display
                clearTicker();
                displayInTicker(`Shuffling ${discardSupporters[0].name} and ${discardSupporters[1].name} in your deck.`);
                break;
            }
            case discardSupporters.length === 1: {
                // Adding chosen supporter to deck and shuffling
                player.addCardToDeck(player.extractCardOutOfDiscard(discardSupporters[0].id));
                player.shuffleDeck();

                // Display
                clearTicker();
                displayInTicker(`Shuffling ${discardSupporters[0].name} in your deck.`);
                break;
            }
            case discardSupporters.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any supporter card in your discard.');
                break;
            }
        }
        let continueButtonPromiseHolder = await continueButtonPromise('OK', 'ticker');
    }
}

class Potion extends Item {
    constructor (id){
        super(id, 'Potion', 'Heal 30 damage from one of your Pokemon.');
    }

    async power (player, opposingPlayer) {
         // 0. Clear display & new display
        clearTicker();
        displayInTicker('Choose which Pokemon to heal.')
        
        // 3. Create a Done promise and a Chosen Evolution promise
        let continueButtonPromiseHolder = continueButtonPromise('Go Back to Actions', 'ticker');

        /// 5. Get the array of all basics and level 1 pokemons on bench and in active
        let htmlPokemonBenchCards = returnCardsOfTypeInLocation(`bench${player.playerNumber}`, 'pokemonCard');
        let htmlPokemonActiveCard = returnCardsOfTypeInLocation(`active${player.playerNumber}`, 'pokemonCard');
        let chosenActivePokemonID;
        let chosenBenchPokemonID;

        // 6. Set eventlisteners on them
        let chosenActivePokemonPromise = setEventListnersOnCards(htmlPokemonActiveCard).then((id)=>{
            chosenActivePokemonID = Number(id);
        });
        let chosenBenchPokemonPromise = setEventListnersOnCards(htmlPokemonBenchCards).then((id)=>{
            chosenBenchPokemonID = Number(id);
        });

        // 7. Promise.race : Done or Chosen
        let outcome2 = await Promise.race([continueButtonPromiseHolder, chosenBenchPokemonPromise, chosenActivePokemonPromise]);
        if (outcome2 === 'Clicked') {
            // 7.1 If Done, return resolved promise
            return null;
        }

         //8.2 Find the pokemon
        let pokemonLocation = 'bench'; 
        let pokemonCard = returnCardFromID(player.bench, chosenBenchPokemonID);
        if (pokemonCard === null) {
            pokemonCard = player.active;
            pokemonLocation = 'active';
        }

        // Heal pokemon
        pokemonCard.hpModifier(30);
        clearTicker();
        displayInTicker(`${pokemonCard.name} has been healed.`);
        clearMain();
        displayHud(player, opposingPlayer);
        continueButtonPromiseHolder = await continueButtonPromise('Ok', 'ticker');
    }
}

class UltraBall extends Item {
    constructor (id){
        super(id, 'Ultra Ball', 'You can only use this card if you discard two other cards from your hand. Search your deck for a Pokemon and put it onto your hand.');
    }

    async power (player, opposingPlayer) {
        // Choosing the two cards to discard
        clearTicker();
        displayInTicker('Choose the two cards from your hand that you want to discard.')

        let continueButtonPromiseHolder = continueButtonPromise('Return to Actions', 'ticker');

        // removing the Utra ball card so that it can't be chosen
        let ultraBallCard = player.extractCardOutOfHand(this.id);
        clearMain();
        displayHud(player, opposingPlayer);

        // Getting the html cards
        let htmlCards = returnCardsOfTypeInLocation(`hand${player.playerNumber}`, 'card');
        
        // Waiting for selection
        let chosenCardID1 = setEventListnersOnCards(htmlCards);

        let outcome = await Promise.race([continueButtonPromiseHolder, chosenCardID1]);
        if (outcome === 'Clicked') {
            player.addToHand(ultraBallCard);
            return;
        }

        chosenCardID1 = outcome;

        let chosenCardID2 = setEventListnersOnCards(htmlCards);

        outcome = await Promise.race([continueButtonPromiseHolder, chosenCardID2]);
        if (outcome === 'Clicked') {
            player.addToHand(ultraBallCard);
            return;
        }
        chosenCardID2 = outcome;

        chosenCardID1 = Number(chosenCardID1);
        chosenCardID2 = Number(chosenCardID2);

        // Choosing the pokemon
        let deckPokemons = player.deckPokemons(60);
        clearTicker();
        switch (true){
            case deckPokemons.length >= 2: {
                displayInTicker('Choose 1 pokemon from your deck to put into your hand.')

                // Getting and displaying array of energies in discard
                displayCardArrayInHeader(deckPokemons, 'card-display');
                let htmlPokemonsCards = returnCardsOfTypeInLocation('card-display', 'pokemonCard');
                
                // Waiting for selection
                let chosenPokemonID = await setEventListnersOnCards(htmlPokemonsCards);

                chosenPokemonID = Number(chosenPokemonID);
                
                // Adding chosen cards to hand
                let chosenCard1 = player.extractCardOutOfDeck(chosenPokemonID);
                player.shuffleDeck();

                player.addToHand(chosenCard1);

                clearTicker();
                displayInTicker(`Adding ${chosenCard1.name} to your hand.`);
                break;
            }
            case deckPokemons.length === 1: {
                // Adding chosen pokemons to hand
                player.addToHand(player.extractCardOutOfDeck(deckPokemons[0].id));

                // Display
                clearTicker();
                displayInTicker(`Adding ${deckPokemons[0].name} to your hand.`);
                break;
            }
            case deckPokemons.length === 0: {
                // Display
                clearTicker();
                displayInTicker('You do not have any basic pokemon card in your deck.');
                break;
            }
        }
        player.addToDiscard(player.extractCardOutOfHand(chosenCardID1));
        player.addToDiscard(player.extractCardOutOfHand(chosenCardID2));
        player.addToHand(ultraBallCard);
        await continueButtonPromise('OK', 'ticker');
    }
}

export {Squawkabilly, Lucario, Riolu, Meditite, Medicham, Annihilape, Mankey, Primeape, Potion, UltraBall, Lechonk, Oinkologne, Cyclizar, Koraidon, Azumarill, Bruxish, Delibird, Buizel, Floatzel, Marill, Arctibax, Baxcalibur, Card, Pokemon, Frigibax, Chien_Pao, Energy, Trainer, Supporter, Item, Youngster, Nemona, Jacq, EnergyRetrieval, GreatBall, NestBall, Pokegear, Switch, PalPad};