const assert = chai.assert;

import { deck1 } from '../ressources/javascripts/decks.js';
import { Player } from '../ressources/javascripts/Player.js';
import {Card, Pokemon, Energy, Trainer, Supporter, Item, Youngster} from '../ressources/javascripts/cardClasses.js';
import { cardsExtractor, shuffleArray } from '../ressources/javascripts/utilities.js';



describe('Classes', () => {
    // describe('Card class', () => {
    //     const testCard = new Card('name', 'pokemon');
    //     let expectedCategory = 'pokemon';
    //     let expectedName = 'name';
    //     let expectedLocation = "Deck";
    
    //     let resultCategory = testCard._category;
    //     let resultName = testCard._name;
    //     let resultLocation = testCard._location;
    
    //     let resultGetCategory = testCard.category;
    //     let resultGetName = testCard.name;
    //     let resultGetPlayer = testCard.player;
    //     let resultGetLocation = testCard.location;
        
    
    
    //     describe('parameters', () => {
    //         it('has a category', () => {
    //             assert.ok(expectedCategory === resultCategory);
    //         });
    
    //         it('has a name', () => {
    //             assert.ok(expectedName === resultName);
    //         });
    
    //         it('has a location', () => {
    //             assert.ok(expectedLocation === resultLocation);
    //         });
    //     });
    
    //     describe('getters', () => {
    //         it('gets a category', () => {
    //             assert.ok(expectedCategory === resultGetCategory);
    //         });
    
    //         it('gets a name', () => {
    //             assert.ok(expectedName === resultGetName);
    //         });
    
    //         it('gets a player number', () => {
    //             testCard.player = 1;
                
    //             assert.strictEqual(testCard.player,1);
    //         });
    
    //         it('gets a location', () => {
    //             assert.ok(expectedLocation === resultGetLocation);
    //         });
    //     });
    
    //     describe('setters', () => {
    //         let expectedPlayer = 2;
    //         let outOfRangePlayer = 3;
    //         testCard.player = expectedPlayer;
    //         let resultPlayer = testCard.player;
    
    //         let expectedLocation = "Hand";
    //         testCard.location = expectedLocation;
            
    
    //         let resultLocation = testCard.location;
    
    
    //         it('sets a player', () => {
    //             assert.ok(expectedPlayer === resultPlayer);
    //         });
    
    //         it('rejects out of range player', () => {
    //             testCard.playerNumber = outOfRangePlayer;
                
    //             assert.ok(testCard.player !== outOfRangePlayer);
    //         });
    
    //         it('sets a location', () => {
    //             assert.ok(expectedLocation === resultLocation);
    //         });
    //     });
    // });
    
    describe('Pokemon class', () => {
        let testPokemon;
        let testEnergy;
        testID = '1';
        let test 
        before(() => {
            testID = '1';
            testPokemon = new Pokemon(testID, )
            testEnergy = new Energy('Water Energy', 'water');
        });
    
        describe('.getters', () => {
            
            it('gets a name', () => {
                assert.strictEqual(testPokemon.name, 'Marill');
            });
    
            it('gets a category', () => {
                assert.strictEqual(testPokemon.category, 'Pokemon');
            });
    
            it('gets .hpOriginal', () => {
                assert.strictEqual(testPokemon.hpOriginal, 70);
            });
    
            it('gets .hpCurrent', () => {
                assert.strictEqual(testPokemon.hpCurrent, 70);
            });
    
            it('gets .attacks', () => {
                assert.ok(typeof testPokemon.attacks === 'object');
            });
    
            it('gets .type', () => {
                assert.strictEqual(testPokemon.type, 'Water');
            });
    
            it('gets .alive', () => {
                assert.strictEqual(testPokemon.alive, true);
            });
    
            it('gets .evolution', () => {
                assert.strictEqual(testPokemon.evolution, 'Basic');
            });
    
            it('gets .weakness', () => {
                assert.strictEqual(testPokemon.weakness, 'Ex2');
            });
    
            it('gets .resistance', () => {
                assert.strictEqual(testPokemon.resistance, 'none');
            });
    
            it('gets .retreatCost', () => {
                assert.strictEqual(testPokemon.retreatCost, '1d');
            });
    
            it('gets .energies and .addEnergy()', () => {
                testPokemon.addEnergy(testEnergy);
    
                assert.strictEqual(testPokemon.energies[0], testEnergy);
    
                testPokemon._energies = [];
            });
        });
    
        describe('.setter', () => {
            
            it('sets .alive', () => {
                testPokemon.alive = false;
    
                assert.strictEqual(testPokemon.alive, false);
    
                testPokemon.alive = true;
            });
        });
    
        describe('.checkIsDead', () => {
           before(() => {
            testPokemon.hpCurrent = -20;
            testPokemon.checkIsDead();
           });
    
            it('sets .hpCurrent to 0', () => {
                
                assert.strictEqual(testPokemon.hpCurrent, 0);
            });
    
            it('sets .alive to false', () => {
                
                assert.strictEqual(testPokemon.alive, false);
            });
    
            it('returns true', () => {
                assert.strictEqual(testPokemon.checkIsDead(), true);
            });
    
            after(() => {
                testPokemon.hpCurrent = testPokemon.hpOriginal;
                testPokemon.alive = true;
            });
        });
    
        describe('.hpModifier', () => {
    
            beforeEach(() => {
                testPokemon.hpCurrent = testPokemon.hpOriginal;
            });
    
             it('augments .hpCurrent', () => {
                 
                testPokemon.hpModifier(20);
    
                 assert.strictEqual(testPokemon.hpCurrent, testPokemon.hpOriginal+20);
             })
    
             it('diminishes .hpCurrent', () => {
                 
                testPokemon.hpModifier(-20);
    
                assert.strictEqual(testPokemon.hpCurrent, testPokemon.hpOriginal-20);
             })
     
             after(() => {
                 testPokemon.hpCurrent = testPokemon.hpOriginal;
             });
         });
    
    });
    
    describe('Energy card class', () => {
        
        const testEnergy = new Energy ('Water Energy', 'Water')
    
    
        describe('.getters', () => {
    
            it('gets .type', () => {
                assert.strictEqual(testEnergy.type, 'Water');
            });
        });
    });
    
    describe('Trainer card class', () => {
       
        describe('.getters', () => {
            const testDescription = 'testDescription';   
                const testTrainer = new Trainer ('Trainer', testDescription); 
    
            it('gets .description', () => {
                assert.strictEqual(testTrainer.description, testDescription);
            });
        });
    });
    
    describe('Supporter card class', () => {
        const testDescription = 'testDescription';
        const testSupporter = new Supporter ('Trainer', testDescription);
    
        describe('.getters', () => {
            it('gets .name', () => {
                assert.strictEqual(testSupporter.name, "Trainer");
            });
    
            it('gets .description', () => {
                assert.strictEqual(testSupporter.description, testDescription);
            });
        });
    });
    
    describe('Item card class', () => {
        const testDescription = 'testDescription';
        const testItem = new Item ('Item', testDescription);
    
        describe('.getters', () => {
            it('gets .name', () => {
                assert.strictEqual(testItem.name, "Item");
            });
    
            it('gets .description', () => {
                assert.strictEqual(testItem.description, testDescription);
            });
        });
    });
    
    describe('Youngster class', () => {
        const testYoungster = new Youngster ();
    
        describe('.getters', () => {
            it('gets .name', () => {
                assert.strictEqual(testYoungster.name, "Youngster");
            });
    
            it('gets .description', () => {
                assert.strictEqual(testYoungster.description, 'Shuffle your hand into your deck. Then, draw 5 cards.');
            });
    
            it('gets .category', () => {
                assert.strictEqual(testYoungster.category, 'Supporter');
            });
        });
    });
    
    describe('Player class', () => {
        let testPlayer;
        before(()=>{
            testPlayer = new Player(1);
            testPlayer.deck = deck1;
        });
    
        describe('.gameSetup', () => {
            let initDeckSize;
            let remainingDeckSize;

            before(() => {
                initDeckSize = testPlayer.deck.length;
                testPlayer.gameSetup();
                remainingDeckSize = testPlayer.deck.length;}
            );
    
            it('fills hand', () => {
                assert.strictEqual(testPlayer.hand.length, 7);
            });
    
            it(`sets hand card's location`, () => {
                let randomIndex = Math.floor(Math.random()*7);
                assert.strictEqual(testPlayer.hand[randomIndex].location, 'Hand');
            });
    
            it('fills prizes', () => {
                assert.strictEqual(testPlayer.prizes.length, 6);
            });
    
            it(`sets prizes card's location`, () => {
                let randomIndex = Math.floor(Math.random()*6);
                assert.strictEqual(testPlayer.prizes[randomIndex].location, 'Prizes');
            });
    
            it('shortens the deck', () => {
                assert.ok(remainingDeckSize === initDeckSize - 13);
            });

            after(()=>{
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            })
            
        });
        
        describe('setter .active', () => {
           before(() => {
            let randomIndex = Math.floor(Math.random()*7);
            testPlayer.active = testPlayer.hand.splice(randomIndex,1)
           });
            
            it('sets new active', () => {
                assert.strictEqual(typeof testPlayer.active, 'object');
            });
    
            it(`sets card's location`, () => {
                assert.strictEqual(testPlayer.active.location, 'Active');
            });
    
            after(()=>{
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            })
        });
    
        describe('addToBench()', () => {
            let initialBenchSize;
            let testPokemon;
            before(() => {
                testPlayer.gameSetup();
                testPokemon = new Pokemon('Marill', 70, [{
                    energy: '1w1n',
                    name: 'Bubble Drain',
                    points: 20,
                    description: 'Heals 20 damage from this pokemon.'
                    }],
                    'Water', 'Basic', 'Ex2', 'none', "1d"
                );
                initialBenchSize = testPlayer.bench.length;
                testPlayer.addToBench(testPokemon);
            });
            
             
            it('add Pokemon to bench', () => {
                assert.ok(testPlayer.bench.length === initialBenchSize + 1)
            });
    
            it(`sets card location`, () => {
                assert.strictEqual(testPlayer.bench[0].location, 'Bench');
            });
    
            after(()=>{
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            })
        });
    
        describe(' setter .deck', () => {
            let initialDeckSize;
            let resultingDeckSize;
            before(() => {
                testPlayer = new Player(2);
                initialDeckSize = testPlayer.deck.length;
                testPlayer.deck = [{},{}];
                resultingDeckSize = testPlayer.deck.length;
            });
            
                
            it('adds cards to deck', () => {
                assert.ok(resultingDeckSize > initialDeckSize);
            });
    
            it(`sets card location`, () => {
                assert.strictEqual(testPlayer.deck[0].location, 'Deck');
            });
    
            it(`sets card playerNumber`, () => {
                assert.strictEqual(testPlayer.deck[0].playerNumber, 2);
            });
    
            after(()=>{
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            })
        });
        
        describe('getter handBasics', () => {
            let result;
            let initialHandSize;
            let resultingHandSize;
            before(() => {
                testPlayer = new Player(1);
                testPlayer._hand = [...deck1];
                initialHandSize = testPlayer.hand.length;
                result = testPlayer.handBasics;
                resultingHandSize = testPlayer.hand.length;
            });

            it('returns all basics', () => {
                assert.strictEqual(result.length, 8);
            });

            it('removes all basics from the hand', () => {
                assert.strictEqual(resultingHandSize, initialHandSize-8);
            });

            after(() => {
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            });
        });

        describe('lastPrizeToHand()', () => {
            let initialPrizeLength;
            before(()=>{
                testPlayer = new Player(2);
                testPlayer.deck = deck1;
                testPlayer.gameSetup();
                initialPrizeLength = testPlayer.prizes.length;
                testPlayer.lastPrizeToHand(); 
            });
    
            it('diminishes prize lenght by 1', () => {
                assert.strictEqual(initialPrizeLength-1, testPlayer.prizes.length);
            });
    
            it(`sets card location`, () => {
                let handLength = testPlayer.hand.length;
                assert.strictEqual(testPlayer.hand[handLength-1].location, 'Hand');
            });
           
            it('augments hand s lenght by 1', () => {
                assert.strictEqual(testPlayer.hand.length,8);
            });
    
            after(()=>{
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            })
        });
    
        describe('addToCard()', () => {
            let initDiscardLenght;
            before(() => {
                testPlayer = new Player(2);
                testPlayer.deck = deck1;
                testPlayer.gameSetup();
                initDiscardLenght = testPlayer.discard.length;
                testPlayer.addToDiscard({});
            });
           
            
            it('adds card to discard', () => {
                assert.strictEqual(testPlayer.discard.length, initDiscardLenght+1);
            });
    
            it(`sets card location`, () => {
                assert.strictEqual(testPlayer.discard[0].location, 'Discard');
            });

            after(() => {
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            });
        });
    
        describe('drawFromDeck()', () => {
            let initialDeckLength;
            let resultingDeckLength;
            beforeEach(() => {
                testPlayer = new Player(2);
                testPlayer.deck = deck1;
                initialDeckLength = testPlayer.deck.length;
                testPlayer.drawFromDeck(2);
                resultingDeckLength = testPlayer.deck.length;

            });
            
            it('adds card to hand', () => {
                assert.strictEqual(testPlayer.hand.length, 2);
            });
    
            it(`sets card location`, () => {
                assert.strictEqual(testPlayer.hand[0].location, 'Hand');
            });

            it('removes card from deck', () => {
                assert.strictEqual(resultingDeckLength, initialDeckLength-2);
            });

            after(()=>{
                testPlayer = new Player(1);
                testPlayer.deck = deck1;
            })
        });
    });
    
});


describe('Utilities', () => {
    let testPlayer;
    before(() => {
        testPlayer = new Player(1);
        testPlayer.deck = deck1;
    });
   
    describe('cardsExtractor()', ()=>{
        let name;
        let result;
        let intitialDeckLenght;
        let resultingDeckLenght;

        before(() => {
            name = ['Water Energy', 'Arctibax'];
            intitialDeckLenght = testPlayer.deck.length;
            result = cardsExtractor(name, testPlayer.deck);
            resultingDeckLenght = testPlayer.deck.length;
        });

        it('returns right number of cards', () => {
            assert.strictEqual(name.length, result.length);
        });

        it('removes the card from the original array', () => {
            assert.strictEqual(resultingDeckLenght, intitialDeckLenght-name.length);
        });
    })

    describe('shuffleArray()', () => {
        let randomIndex;
        before(() => {
            testPlayer.deck = shuffleArray(deck1);
            randomIndex = Math.floor(Math.random()*deck1.length);    
        });
        
        it('shuffles array (1/51 chance of randomly failing)', () => {
            assert.notEqual(testPlayer.deck[randomIndex], deck1[randomIndex]);
        });

        it('returns same length', () => {
            assert.strictEqual(testPlayer.deck.length, deck1.length);
        });
    });

    after(()=>{
        testPlayer = new Player(1);
        testPlayer.deck = deck1;
    })
});



mocha.run();