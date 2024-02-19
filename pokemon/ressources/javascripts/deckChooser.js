import { clearHeader } from "./cardDisplay.js";
import { shuffleArray } from "./utilities.js";
import {deck1, deck2} from "/ressources/javascripts/decks.js";

const displayDeckChoices = async (player1, player2) => {
    clearHeader();
    const body = document.getElementById('body');
    let html = document.createElement('div');
    html.setAttribute('id','deck-choice');

    // Randomly choosing the player to pick
    let playerNumberToPick = Math.floor(Math.random()*2+1);
    let playerToPick;
    let otherPlayer;
    switch (playerNumberToPick) {
        case 1:
            playerToPick = player1;
            otherPlayer = player2;
            break;
    
        case 2:
            playerToPick = player2;
            otherPlayer = player1;
            break;
    }

    const title = document.createElement('h1');
    title.innerHTML = `Player ${playerToPick.playerNumber}, choose your deck`;


    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    button1.innerHTML = 'Chien-Pao Water Deck'
    button2.innerHTML = 'Lucario Fighting Deck'
    button1.setAttribute('id','chien-pao-deck');
    button2.setAttribute('id','lucario-deck');
    button1.setAttribute('class', 'deck-button');
    button2.setAttribute('class', 'deck-button');
  

    html.appendChild(title);
    html.appendChild(button1);
    html.appendChild(button2);
   
    body.prepend(html);

    return new Promise((resolve) => {
        button1.addEventListener('click', function () {
            playerToPick.deck = shuffleArray(deck1);
            otherPlayer.deck = shuffleArray(deck2);
            playerToPick.gameSetup();
            otherPlayer.gameSetup();
            body.removeChild(html);
            resolve();
        });
        button2.addEventListener('click', function () {
            otherPlayer.deck = shuffleArray(deck1);
            playerToPick.deck = shuffleArray(deck2);
            otherPlayer.gameSetup();
            playerToPick.gameSetup();
            body.removeChild(html);
            resolve();
        });
    });
};

export {displayDeckChoices};


