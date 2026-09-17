document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const StartBtn = document.querySelector('#start-button');
    const RestartBtn = document.querySelector('#restart-button')
    let score = 0
    let highScore = 0
    let ScoreDesplay = document.querySelector('#score');
    let highScoreDesplay = document.querySelector('#highScore');
    let gameOverScreen = document.querySelector('#game-over');
    let pauseScreen = document.querySelector('#pause-screen');
    const width = 15;
    let timerId
    let difficulty = 1000
    let paused = false
    let gameOver = false
    if(localStorage.getItem("savedScore") != null){
        highScore = localStorage.getItem('savedScore')
        highScoreDesplay.innerHTML = localStorage.getItem('savedScore')
    }

    //Tetrominos

    //  --
    //  -
    //  -
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    //  --
    //   -
    //   -
    const nlTetromino = [
        [0, 1, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, 2],
        [1, width + 1, width * 2 + 1, width * 2 + 2],
        [width, width + 1, width + 2, width * 2]
    ]

    //  --
    // --
    const zTetromino = [
        [width * 2, width * 2 + 1, width + 1, width + 2],
        [0, width, width + 1, width * 2 + 1],
        [width * 2, width * 2 + 1, width + 1, width + 2],
        [0, width, width + 1, width * 2 + 1]
    ]

     //  --
    // --
    const nzTetromino = [
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [2, width + 2, width + 1, width * 2 + 1],
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [2, width + 2, width + 1, width * 2 + 1]
    ]

    //  -
    // ---
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1, width + 2],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    //  --
    //  --
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    //  -
    //  -
    //  -
    //  -
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    //  - -
    //  ---
    //  - -
    const xTetromino = [
        [0, 2, width, width + 1, width + 2, width * 2, width * 2 + 2],
        [0, 1, 2, width + 1, width * 2, width * 2 + 1, width * 2 + 2],
        [0, 2, width, width + 1, width + 2, width * 2, width * 2 + 2],
        [0, 1, 2, width + 1, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    //    -
    //   --
    //  --
    const fTetromino = [
        [2, width + 2, width + 1, width * 2 + 1, width * 2],
        [0, width, width + 1, width * 2 + 1, width * 2 + 2],
        [2, 1, width + 1, width, width * 2],
        [0, 1, width + 1, width + 2, width * 2 + 2]
    ]

    //  ---
    //  ---
    //  - -
    const buTetromino = [
        [0, 1, 2, width, width + 1, width + 2, width * 2, width * 2 + 2],
        [0, 1, 2, width + 1, width + 2, width * 2, width * 2 + 1, width * 2 + 2],
        [0, 2, width, width + 1, width + 2, width * 2, width *2 + 1, width * 2 + 2],
        [0, 1, 2, width, width + 1, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    //   -
    //  - -
    //    -
    const jTetromino = [
        [1, width, width + 2, width * 2 + 2],
        [width * 2, width * 2 + 1, width + 2, 1],
        [0, width, width * 2 + 1, width + 2],
        [1, 2, width, width * 2 + 1]
    ]

    //   -
    //  - -
    //  - 
    const njTetromino = [
        [1, width, width + 2, width * 2],
        [0, 1, width + 2, width * 2 + 1],
        [2, width, width + 2, width * 2 + 1],
        [1, width, width * 2 + 1, width * 2 + 2]
    ]

    //  
    //  -  -
    //   -- 
    const uTetromino = [
        [width, width * 2 + 1, width * 2 + 2, width + 3],
        [2, width + 1, width * 2 + 1, width * 3 + 2],
        [width * 2, width + 1, width + 2, width * 2 + 3],
        [1, width + 2, width * 2 + 2, width * 3 + 1]
    ]

    //   -
    //   -
    //   -
    //    - 
    const pTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 2],
        [width * 3, width * 2 + 1, width * 2 + 2, width * 2 + 3],
        [1, width + 2, width * 2 + 2, width * 3 + 2],
        [width * 2, width * 2 + 1, width * 2 + 2, width + 3]
    ]

    //All blocks
    const theTetrominos = [lTetromino, nlTetromino, zTetromino, nzTetromino, tTetromino, oTetromino, iTetromino, xTetromino, fTetromino, buTetromino, jTetromino, njTetromino, uTetromino, pTetromino]
    //Origional blocks only
    //const theTetrominos = [lTetromino, nlTetromino, zTetromino, nzTetromino, tTetromino, oTetromino, iTetromino]
    const colors = ['orange', 'blue', 'red', 'green', 'purple', 'yellow', 'aqua', 'darkmagenta', 'goldenrod', 'pink', 'darkgreen', 'darkred', 'grey', 'darkblue']

    let currentPosition = -24
    let pastPosition
    let currentRotation = 0
    let orientation
    //e=randomly select tetromino
    let random = Math.floor(Math.random()*theTetrominos.length)
    let current = theTetrominos[random][currentRotation]
    let removable = []
    let clearLines = []
    let offset = [0, 0]
    let applyScore = false

    function draw() {
        removable = []
        for (let i = 0; i < current.length; i+=1) {
            if (current[i] + currentPosition >= 0) {
                squares[currentPosition + current[i]].classList.add('tetromino')
                squares[currentPosition + current[i]].style.backgroundColor = colors[random]
                removable.push(current[i])
            }
        }
    }

    function undraw() {
        for (let i = 0; i < removable.length; i+=1) {
            squares[currentPosition + removable[i]].classList.remove('tetromino')
            squares[currentPosition + removable[i]].style.backgroundColor = 'black'
        }
    }

    //assign functions to keycodes
    function control(e) {
        if(!paused && !gameOver){
            if(e.keyCode === 37 || e.keyCode == 65) {
                moveLeft()
            } else if (e.keyCode === 38 || e.keyCode == 69){
                rotate()
            } else if (e.keyCode === 39 || e.keyCode == 68){
                moveRight()
            } else if (e.keyCode === 40 || e.keyCode == 83){
                moveDown()
            }
            else if (e.keyCode === 32){
                moveDown()
                moveDown()
                score += Math.ceil(score * 0.01)
                ScoreDesplay.innerHTML = score
                difficulty -= 0.5
            }
        }
        if(e.keyCode == 80){
            Pause()
        }
        if(e.keyCode == 82){
            Restart()
        }
    }
    document.addEventListener('keyup', control)

    //make the tetromino move down every second
    timerId = setInterval(moveDown, difficulty)

    function moveDown() {
        pastPosition = currentPosition
        freeze()
        if(gameOver)
            return
        undraw()
        currentPosition += width
        draw()
        console.log(score)
    }

    function freeze() {
        if(difficulty < 300)
            difficulty = 300
        clearInterval(timerId)
        timerId = null
        timerId = setInterval(moveDown, difficulty)
        if(removable.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            for(let i = 0; i < current.length; i+=1){
                if(current[i] + currentPosition < 0){
                    gameOver = true
                    gameOverScreen.style.visibility = 'visible'
                    clearInterval(timerId)
                    timerId = null
                    return
                }
            }
            score += 11.0
            difficulty -= 5
            ScoreDesplay.innerHTML = " " + score
            removable.forEach(index => squares[currentPosition + index].classList.add('taken'))
            random = Math.floor(Math.random()*theTetrominos.length)
            currentPosition = -24
            pastPosition = null
            orientation = null
            removable = []
            for (let i = 0; i < current.length; i+=1) {
                if (current[i] + currentPosition >= 0) {
                    removable.push(current[i])
                }
            }
            currentRotation = 0
            current = theTetrominos[random][currentRotation]
            addScore()
            checkScore()
            draw()
        }
    }

    //Movement to the left
    function moveLeft() {
        //const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        
        
        //if(!isAtLeftEdge) {
        undraw()
        currentPosition -= 1
        //}

        removable = []
        for (let i = 0; i < current.length; i+=1) {
            if (current[i] + currentPosition >= 0) {
                removable.push(current[i])
            }
        }

        if(removable.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }

        draw()

    }

     //Movement to the right
     function moveRight() {
        //const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        
        //if(!isAtRightEdge) {
        undraw()
        currentPosition += 1
        //}

        if(removable.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1
        }

        draw()
    }

    //Rotates tetromino
    function rotate() {
        undraw()
        let pastCurrent = current
        currentRotation++
        if(currentRotation >= 4){
            currentRotation = 0
        }
        if(orientation != null && orientation > CurrentMidPoint(current))
            currentPosition -= theTetrominos[random][0][orientation]
        else if(orientation != null && orientation < CurrentMidPoint(current))
            currentPosition += theTetrominos[random][0][orientation]
        orientation = Math.floor(Math.random() * theTetrominos[random][0].length)
        current = theTetrominos[random][currentRotation]
        if(orientation > CurrentMidPoint(current))
            currentPosition += theTetrominos[random][0][orientation]
        else if(orientation < CurrentMidPoint(current))
            currentPosition -= theTetrominos[random][0][orientation]
        
        for(let i = 0; i < current.length; i+=1){
            if(current[i] + currentPosition >= 0 && squares[current[i] + currentPosition].classList.contains('taken')){
                currentPosition -= width
                i = 0
            }
        }
        for(let i = 0; i < current.length; i++){
            if(currentPosition + current[i] > 314){
                currentPosition -= width
            }
        }
        draw()
    }

    function CurrentMidPoint(currentBlock){
        return GetHighestValue(currentBlock) - GetLowestValue(currentBlock)
    }
    //Finds lowest value in a blocks array (current)
    function GetLowestValue(currentBlock){
        let value = currentBlock[0]
        for(let i = 0; i < currentBlock.Length; i+=1){
            if(currentBlock[i] < value){
                value = currentBlock[i]
            }
        }
        return value
    }
    //Finds Highest value in a blocks array (current)
    function GetHighestValue(currentBlock){
        let value = currentBlock[0]
        for(let i = 0; i > currentBlock.Length; i+=1){
            if(currentBlock[i] < value){
                value = currentBlock[i]
            }
        }
        return value
    }

    StartBtn.addEventListener('click', () => {
        Pause()
    })

    RestartBtn.addEventListener('click', () => {
        Restart()
    })

    function Pause(){
        paused = !paused
        if(timerId){
            pauseScreen.style.visibility = 'visible'
            clearInterval(timerId)
            timerId = null
        } else{
            draw()
            pauseScreen.style.visibility = 'hidden'
            timerId = setInterval(moveDown, difficulty)
        }
    }

    function Restart(){
        for(let i = 0; i < squares.length - width; i+=1){
            squares[i].style.backgroundColor = 'black'
            squares[i].classList.remove('taken')
        }
        currentPosition = -24
        pastPosition = null
        currentRotation = 0
        //e=randomly select tetromino
        score = 0
        ScoreDesplay.innerHTML = score
        random = Math.floor(Math.random()*theTetrominos.length)
        current = theTetrominos[random][currentRotation]
        orientation = null
        removable = []
        clearLines = []
        offset = [0, 0]
        applyScore = false
        clearInterval(timerId)
        timerId = null
        paused = false
        gameOver = false
        difficulty = 1000
        pauseScreen.style.visibility = 'hidden'
        gameOverScreen.style.visibility = 'hidden'
        timerId = setInterval(moveDown, difficulty)
    }

    function addScore(){
        console.log(clearLines.length)
        for(let i = 0; i < clearLines.length; i++){
            const row = clearLines[i][0]
            if(row.every(index => squares[index].classList.contains('taken'))){
                applyScore = true
                score += 87
                difficulty -= 40
                ScoreDesplay.innerHTML = score
                row.forEach(index => {
                    squares[index].style.backgroundColor = 'black'
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(clearLines[i][1], width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
        if(applyScore){
            clearLines = []
            applyScore = false
        }
        
        if(score > highScore){
            highScore = score
            highScoreDesplay.innerHTML = highScore
            localStorage.setItem("savedScore", score)
        }
    }
    function checkScore(){

        for(let i = 0; i < 314; i += width){
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9, i+10, i+11, i+12, i+13, i+14]
            if(row.every(index => squares[index].classList.contains('taken'))){
                clearLines.push([row, i])
            }
        }
    }
})