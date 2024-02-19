import {gameStart} from "/ressources/javascripts/gameStart.js";
import {displayDeckChoices} from "/ressources/javascripts/deckChooser.js";
import {choosingBasicsToBench} from "/ressources/javascripts/choosingBasicsToBench.js";
import {choosingActive} from "/ressources/javascripts/choosingActive.js";
import { clearHeader } from "./cardDisplay.js";

export const setupPhase = async (player1, player2) => {
    await gameStart();
    await displayDeckChoices(player1,player2);
    await choosingActive(player1, player2);
    clearHeader();
    await choosingBasicsToBench(player1, player2, true);
    await choosingActive(player2, player1);
    clearHeader();
    await choosingBasicsToBench(player2, player1, true);
}