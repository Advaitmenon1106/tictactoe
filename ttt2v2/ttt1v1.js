const gameStackOperations = (()=>{
    const initialise = (arr, arr2)=>{
        for (i = 0; i<=3; i++){
            arr.push('X');
            arr.push('O');
        }
        arr.push('X');
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
            gridUnit.style.cssText = 'height: 300px; width: 300px; border: 3px solid white; color: white; text-align: center; font-size: 290px';
            grid.appendChild(gridUnit);
            gridUnit.style.cursor='pointer';
            gridUnit.id = i.toString();
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

    const threeInARow = (adjMat, event)=>{
        count = 0;
        let value = adjMat[Math.floor(parseInt(event.target.id)/3)][0]
        for (i = 0; i<3; i++){
            if(adjMat[Math.floor(parseInt(event.target.id)/3)][i]==value && adjMat[Math.floor(parseInt(event.target.id)/3)][i]>0){
                count = count+1;
                if (count == 3){
                    console.log('you win');
                    return true;
                }
            }
            else{
                count = 0; // Immediate reset
            }
        }
    }

    const threeInAColumn = (adjMat, event)=>{
        count = 0;
        let value = adjMat[0][Math.floor(parseInt(event.target.id)%3)]
        for (i = 0; i<3; i++){
            if(adjMat[i][(parseInt(event.target.id)%3)]==value && adjMat[i][(parseInt(event.target.id)%3)]>0){
                count = count+1;
                if (count == 3){
                    console.log('you win(col)');
                    return true;
                }
            }
            else{
                count = 0;
            }
        }
    }

    const diagonalWin = (adjMat)=>{
        if ((adjMat[0][0]+adjMat[1][1]+adjMat[2][2]) % 3 == 0){ // X's are 1, O's are 2, a combination of three would get 
            return true;
        }
        else if ((adjMat[0][2] + adjMat[1][1] + adjMat[2][0])% 3 == 0){
            return true;
        }
        else{
            return false;
        }
    }

    const tie = (moves)=>{
        if (moves.length ==  0){
            return true
        }
        else{
            return false;
        }
    }

    const playATurn = (arr)=>{
        let boxes = document.getElementsByClassName('tttBoxes');
        let result = document.createElement('div');
        result.style.cssText = 
        `
        color: white;
        font-size: 25px;
        margin-top: 2%;
        text-align: center;
        `
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

                    // Checking for win conditions as soon as a box is marked:-

                    if (diagonalWin(adjacencyMatrix)){
                        console.log('won');
                        result.innerHTML = 'won';

                        setTimeout(function(){
                            window.location.reload();
                        }, 5000);

                    }
                    
                    else if (threeInARow(adjacencyMatrix, event)){
                        console.log('won');
                        setTimeout(function(){
                            window.location.reload();
                        }, 5000);
                    }
                    else if (threeInAColumn(adjacencyMatrix, event)){
                        console.log('won');
                        
                        setTimeout(function(){
                            window.location.reload();
                        }, 5000);                
                    }
                    else if (tie(moveStack)){
                        console.log('Tied');
                        setTimeout(function(){
                            window.location.reload();
                        }, 5000); 
                    }
                }
                else{
                    return;
                }
            })
        }
    }

    return {playATurn};
})()

// Global code:-

let moveStack = [];
let adjacencyMatrix = [[], [], []];

tttBoard.generate();
gameStackOperations.initialise(moveStack, adjacencyMatrix);
let box = document.getElementsByClassName('tttBoxes');

for (i = 0; i<box.length; i++){
    Object.defineProperty(box[i], 'markedOrNot', {
        value: false, // Boxes by default are unmarked, thus value is false on board initialisation; this helps avoid duplicate marks on double tapping marked boxes
        writable: true
    });
}
gameplay.playATurn(adjacencyMatrix);

/*let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', ()=>{
    for (i = 0; i<box.length; i++){
        box[i].innerHTML = null;
    }
}) [This bridge needs to be crossed later]*/ 