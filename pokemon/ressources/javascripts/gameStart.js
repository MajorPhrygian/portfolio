const gameStart = () => {
    const phase = document.getElementById('phase');
    let title = document.createElement('h1');
    title.setAttribute('id','title');
    title.innerHTML = "POKEMON"
    
    let button = document.createElement('button');
    button.setAttribute('id','start-button');
    button.innerHTML = 'PRESS TO START';
    
    phase.appendChild(title);
    phase.appendChild(button);

    return new Promise((resolve) => {
        button.addEventListener('click', () => {
            resolve('Start');
        })
    })
}

export {gameStart};
