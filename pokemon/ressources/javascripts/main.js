import {Player} from "/ressources/javascripts/Player.js";
import { setupPhase } from "./setupPhase.js";
import { clearMain, displayHud, clearHeader} from "./cardDisplay.js";
import { matchManager } from "./matchManager.js";
// import { Baxcalibur, Energy, Squawkabilly } from "./cardClasses.js";
 


const main = async () => {
    await setupPhase(player1,player2);
    clearMain();
    clearHeader();
    displayHud(player1, player2);

    // FOR TESTS
    // player2.active = new Squawkabilly(1000);
    // player1.active = new Baxcalibur(1001);
    // player2.active.addEnergy(new Energy(143, 'Fighting Energy', 'f'));
    // player2.active.addEnergy(new Energy(143, 'Fighting Energy', 'f'));
    // player2.active.addEnergy(new Energy(143, 'Fighting Energy', 'f'));
    // player1.active.addEnergy(new Energy(143, 'Water Energy', 'w'));
    // player1.active.addEnergy(new Energy(143, 'Water Energy', 'w'));
    // player1.active.addEnergy(new Energy(143, 'Water Energy', 'w'));
    // player1._prizes = [];
    // player2.addToBench(new Squawkabilly(1002));
    // player1._deck = [];
    // player2.addToHand(new Potion(388));
    // player2.addToHand(new Potion(388));
    // player2.addToHand(new Potion(388));
    // player1.active = new Chien_Pao(1000);
    // player1.active.addEnergy(new Energy(143, 'Water Energy', 'w'));
    // player1.active.addEnergy(new Energy(143, 'Water Energy', 'w'));
    // player1._hand = [];
    // player1.addToHand(new Arctibax(1292));
    // player1.hand[0].addEnergy(new Energy(143, 'Water Energy', 'w'));
    // player1.hand[0].addEnergy(new Energy(143, 'Water Energy', 'w'));

    matchManager(player1,player2)
}


// Keeping this commented for now as it is super annoying
window.onbeforeunload = function () {
    return "Data will be lost if you leave the page, are you sure?";
};

let player1 = new Player(1);
let player2 = new Player(2);
main();






