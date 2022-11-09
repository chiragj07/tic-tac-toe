// let cellElements = document.querySelectorAll('[data-cell]')
// let board = document.getElementById('board')
// const winningText = document.getElementById('winning-message')
// const results = document.getElementById('results')
// const CIRCLE_MARK= 'circle'
// const X_MARK = 'x'
// let isX
// function startGame(){
//     isX = true
//     winningText.innerText=""
//     results.classList.remove('show')
//     cellElements.forEach(cell=>{
//         cell.classList.remove(X_MARK)
//         cell.classList.remove(CIRCLE_MARK)
//         cell.removeEventListener('click',handleClick)
//         cell.addEventListener('click',handleClick, {once: true});
        
//     })
//     setBoardHoverClass()        
// }

// startGame()

// function handleClick(e){
//     console.log('clicked')
//     const cell = e.target
//     const currentMark = isX ? X_MARK : CIRCLE_MARK
//     markcell(cell, currentMark)
//     if(checkForWin(currentMark)){
//         const winner = currentMark == X_MARK ? `X's` : `O's`
//         message = `${winner} - Wins`
//         endGame(message)
//     }
//     else if(checkForDraw()){
//         endGame("match Drawn")
//     }
//     swapTurns()
//     setBoardHoverClass()
// }

// function markcell(cell, currentMark){
//     cell.classList.add(currentMark)

// }

// function swapTurns(){
//     isX = !isX
//     mark = isX ? X_MARK: CIRCLE_MARK
//     board.classList.add(mark) 
// }

// function setBoardHoverClass(){
//     board.classList.remove(X_MARK)
//     board.classList.remove(CIRCLE_MARK)
//     if(isX){
//         board.classList.add(X_MARK)
//     }
//     else{
//         board.classList.add(CIRCLE_MARK)
//     }
// }

// function checkForWin(currentMark){
//     const combinations = [
//         [0,1,2],[3,4,5],[6,7,8],
//         [0,3,6],[1,4,7],[2,5,8],
//         [0,4,8],[2,4,6]
//     ]

//     let ans = combinations.some(ele=> ele.every(e=>cellElements[e].classList.contains(currentMark)))
//     return ans;
// }

// function checkForDraw(){
//    const indexes = [...Array(9).keys()]
//    return indexes.every(cell => cellElements[cell].classList.contains(X_MARK) || cellElements[cell].classList.contains(CIRCLE_MARK))

// }

// function endGame(message){
//     winningText.innerText = message
//     results.classList.add('show')
//     const restartButt= document.getElementById('restart-button')
//     restartButt.addEventListener('click',startGame)
// }



const board = document.getElementById("board")
const winningMessage = document.getElementById("winning-message");
const results = document.getElementById("results");
const resBtn = document.getElementById("restart-button");
const children = board.children;
let isX= true;
function load(){
        isX= true
        resBtn.removeEventListener("click", handleClick)
        board.classList.remove("x")
        board.classList.remove("circle")
        board.classList.add("x");
        results.classList.remove("show")
        Array.from(children).forEach(item =>{
            item.classList.remove("x")
            item.classList.remove("circle")
        })
        board.addEventListener("click",handleCellClick);

}

function handleCellClick(e){
    //mark the cell
    mark(e.target)
    // check for win
    if(checkForWin()){
        showResults()
    }
    if(checkForDraw()){
        showResults(true)
    }
    console.log("yaha aagaya")
    //check for draw
    //change control
    changeControl()
}

function mark(ele){
        const classToAdd = isX ? "x":"circle";
        ele.classList.add(classToAdd); 
}

function changeControl(){
    isX =!isX;
    const classToAdd = isX ? "x":"circle";
    board.classList.remove("x")
    board.classList.remove("circle")
    board.classList.add(classToAdd);

}

function checkForWin(){
    const possibleWins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    const currClass = isX ? "x":"circle";

    let ans =possibleWins.some(item=>item.every((it)=>children[it-1].classList.contains(currClass)))
    return ans;

}

function checkForDraw(){
    return Array.from(children).every(item=> item.classList.contains("x") || item.classList.contains("circle") )
}

function showResults(draw =false){
        resBtn.addEventListener("click", handleClick)

        if(draw){
            winningMessage.innerText = "Match Drawn"
            results.classList.add("show")
            return;
        }
        const currClass = isX ? "X":"O";
        winningMessage.innerText = `${currClass} Wins`
        results.classList.add("show")
        return ;
}

function handleClick(){
    load();
}

load()


