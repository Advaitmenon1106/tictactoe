const gameStackOperations = (()=>{
    const initialise = (arr, arr2)=>{
        for (i = 0; i<=3; i++){
            arr.push('X');
            arr.push('O');
        }
        arr.push('X');

        for (i = 0; i<3; i++){
            for (j = 0; j<3; j++){
                arr2[i][j];
            }
        }
    }
    const removeMove = (arr)=>{
        arr = arr.splice(0,1);
    }
    return {initialise, removeMove}
})();

const tttBoard = (()=>{
    const generate = ()=>{
        document.body.style.backgroundColor = 'black';
        let grid = document.createElement('div');
        grid.style.cssText = 'display: grid; width: fit-content; margin-left: 25%; margin-top: 1.5%; background-color: black';
        grid.style.gridTemplateRows = '300px 300px 300px';
        grid.style.gridTemplateColumns = '300px 300px 300px';
        grid.id = 'outerBox'
        document.body.appendChild(grid);
        for (i = 0; i<9; i++){
            let gridUnit = document.createElement('div');
            gridUnit.className = 'tttBoxes';
            gridUnit.style.cssText = 'height: 300px; width: 300px; border: 3px solid white; color: white; text-align: center';
            gridUnit.style.fontSize = '290px';
            grid.appendChild(gridUnit);
            gridUnit.style.cursor='pointer'
            gridUnit.id = i.toString();
            // gridUnit.addEventListener('mouseenter', ()=>{
            //     gridUnit.style.backgroundColor = 'silver';
            // })
        }

    };
    const reset = ()=>{
        gameStackOperations.initialise(moveStack);
        generate();
        gameplay.playATurn();
    }
    return {generate, reset};
    
})();

const gameplay = (()=>{
    const playATurn = (arr)=>{
        let boxes = document.getElementsByClassName('tttBoxes');
        for (i = 0; i<box.length; i++){
            boxes[i].addEventListener('click', (event)=>{
                if (event.target.markedOrNot==false){
                    event.target.style.color = 'white';
                    event.target.innerHTML = moveStack[0];
                    gameStackOperations.removeMove(moveStack);
                    event.target.markedOrNot=true;
                    if (moveStack[0] == 'O'){
                        arr[Math.floor(parseInt(event.target.id)/3)][parseInt(event.target.id)%3] = 1;//1, if character on the board is X
                    }
                    else if (moveStack[0] == 'X'){
                        arr[Math.floor(parseInt(event.target.id)/3)][parseInt(event.target.id)%3] = 2;//2, if character on the board is O
                    }
                }
                else{
                    return;
                }
            })
        }
    }
    const win = (adjMat)=>{
        //Code for the win condition
    }
    return {playATurn}
})()

let moveStack = [];
let adjacencyMatrix = [[], [], []];

tttBoard.generate();
gameStackOperations.initialise(moveStack, adjacencyMatrix);
let box = document.getElementsByClassName('tttBoxes');

for (i = 0; i<box.length; i++){
    Object.defineProperty(box[i], 'markedOrNot', {
        value: false,
        writable: true
    })
}

gameplay.playATurn(adjacencyMatrix);

/*let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', ()=>{
    for (i = 0; i<box.length; i++){
        box[i].innerHTML = null;
    }
})*/

//Strategy for 3 in a row: match indices of 2d array and id%3 of a grid unit