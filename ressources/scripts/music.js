let title = document.getElementById('title');

document.getElementById('nav-code').onmouseover = function (){
    title.innerHTML = 'Code';
}

document.getElementById('nav-code').onmouseleave = function (){
    title.innerHTML = 'Music';
}

document.getElementById('nav-home').onmouseover = function (){
    title.innerHTML = 'Home';
}

document.getElementById('nav-home').onmouseleave = function (){
    title.innerHTML = 'Music';
}

document.getElementById('nav-videogames').onmouseover = function (){
    title.innerHTML = 'Video Games';
}

document.getElementById('nav-videogames').onmouseleave = function (){
    title.innerHTML = 'Music';
}

document.getElementById('nav-readings').onmouseover = function (){
    title.innerHTML = 'Readings';
}

document.getElementById('nav-readings').onmouseleave = function (){
    title.innerHTML = 'Music';
}