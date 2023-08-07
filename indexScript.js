let botOption = document.getElementById('bot');
let multiplayerOption = document.getElementById('multiplayer');
let optionsBox = document.getElementsByClassName('options')[0];
let descriptionBox = document.getElementById('desc')

botOption.addEventListener('mouseenter', ()=>{
    descriptionBox.innerHTML = '[Incomplete Feature] Click on this if you want to play against a bot/AI.';
    //debugger
    botOption.addEventListener('mouseleave', ()=>{
        //debugger
        descriptionBox.innerHTML = '';
    })
    botOption.addEventListener('click', ()=>{
        window.open('gameAI.html');
    })
})

multiplayerOption.addEventListener('mouseenter', ()=>{
    descriptionBox.innerHTML = 'Click on this if you want to play against a two player, turn based TicTacToe.';
    //debugger
    multiplayerOption.addEventListener('mouseleave', ()=>{
        //debugger
        descriptionBox.innerHTML = '';
    })
    multiplayerOption.addEventListener('click', ()=>{
        window.open('./ttt2v2/game1v1.html');
    })
})

botOption.addEventListener('mousedown', ()=>{
    botOption.style.filter = 'drop-shadow(2px 2px 2px white)'
    botOption.addEventListener('mouseup', ()=>{
        botOption.style.filter = 'drop-shadow(2px 2px 2px black)'
    })
})

multiplayerOption.addEventListener('mousedown', ()=>{
    multiplayerOption.style.filter = 'drop-shadow(2px 2px 2px white)'
    multiplayerOption.addEventListener('mouseup', ()=>{
        multiplayerOption.style.filter = 'drop-shadow(2px 2px 2px black)'
    })
})