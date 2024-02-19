import { turnManager } from "./turnManager.js";

const matchManager = async (player1, player2) => {
    do {
        await turnManager(player1,player2);
        await turnManager(player2,player1);
    } while (true);
}

export {matchManager}