import { clearHeader } from "./cardDisplay.js";
import { choosingBasicsToBench } from "./choosingBasicsToBench.js";

const turnBenchPokemon = async player => {
    //2. Put basics on the bench
    clearHeader();
    await choosingBasicsToBench(player);
};

export {turnBenchPokemon}