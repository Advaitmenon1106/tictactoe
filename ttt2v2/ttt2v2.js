const gameStackOperations = (()=>{
    const initialise = (arr)=>{
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
        let grid = document.createElement('div');
        grid.style.cssText = 'display: grid; width: fit-content; margin-left: 25%; margin-top: 2%; background-color: black';
        grid.style.gridTemplateRows = '300px 300px 300px';
        grid.style.gridTemplateColumns = '300px 300px 300px';
        document.body.appendChild(grid);
        for (i = 0; i<9; i++){
            let gridUnit = document.createElement('div');
            gridUnit.className = 'tttBoxes';
            gridUnit.style.cssText = 'height: 300px; width: 300px; border: 3px solid white; color: white; text-align: center';
            gridUnit.style.fontSize = '290px';
            grid.appendChild(gridUnit);
        }
    };
    return {generate};
    
})();

let moveStack = [];

window.onload = ()=>{
    tttBoard.generate();
    gameStackOperations.initialise(moveStack);
}

let box = document.getElementsByClassName('tttBoxes');
// Object.defineProperty(box[0]) -> continue by adding a marked or not property