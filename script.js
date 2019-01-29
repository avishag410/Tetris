class boardHTMLElements {

    constructor(gameBoardElementId = "game_board") {
        this.board = document.getElementById(gameBoardElementId)
        this.gameBoardElementId = gameBoardElementId
         
        this.rowBlocksNum = 13
        this.colBlockNum = 15
    }

    // createBlockElement() {
    //     let block = document.createElement(this.blockElementType) 
    //     block.style.className = this.blockClass
    //     return block
    // }

    get boardWidthPx() {
        return document.getElementsByClassName(this.gameBoardElementId)[0].clientWidth
    }

    get boardHeigthPx() {
        return document.getElementsByClassName(this.gameBoardElementId)[0].clientHeight
    }

    get blockWidthPx() {
        return this.boardWidthPx/this.rowBlocksNum
    }

    get blockHeigthPx() {
        return this.boardHeigthPx/this.colBlockNum
    }

    moveBlock(block, x, y) {
        console.log(`x: ${x} y: ${y} `)
        block.blockElem.style.left = x * this.blockWidthPx + 'px'
        block.blockElem.style.top = y * this.blockHeigthPx + 'px'
    }

    addBlock(block) {
        this.board.appendChild(block.blockElem)
    }

    removeBlock(block) {
        this.board.removeChild(block.blockElem)
    }

}



class boardBlocksGrid {
    constructor(boardHTMLElements) {
        const boardWidthBlocks = boardHTMLElements.boardWidthPx / boardHTMLElements.blockWidthPx
        const boardHeigthBlocks = boardHTMLElements.boardHeigthPx / boardHTMLElements.blockHeigthPx
        this.boardBlocksGrid = [...Array(boardWidthBlocks)].map(e => Array(boardHeigthBlocks).fill(null));
        this.htmlBoard = boardHTMLElements
    }

    canIMoveTo(x, y) {
        if(x >= this.htmlBoard.rowBlocksNum ||
            x < 0 ||
             y >= this.htmlBoard.colBlockNum ||
             y < 0) 
            return false
        else
            return true
    }
    
    addBlock(x = 0, y = 0) {
        let block = new Block()
        this.htmlBoard.addBlock(block)
        this.boardBlocksGrid[0][0] = block
        
        this.moveBlock(block, 0, 0, x, y)

        return block
    }

    removeBlock(x, y) {
        if(this.canIMoveTo(x, y) && 
            this.boardBlocksGrid[x][y] !== null) {

            this.htmlBoard.removeBlock(this.boardBlocksGrid[x][y]) 
            this.boardBlocksGrid[x][y] = null
        }
    }
    
    /* Check if we can move block from old pos to new pos, and move it */
    moveBlock(block, oldX, oldY, newX, newY) {

        // check that block doesnt exceed board limits
        if(this.canIMoveTo(newX, newY)) {
            this.boardBlocksGrid[oldX][oldY] = null
            this.boardBlocksGrid[newX][newY] = block
            this.htmlBoard.moveBlock(block, newX, newY)

            return true
        }
        return false
    }
    
    checkFullRow() {

    }
}

class Block {
    constructor(blockClass = "block_shape", blockElementType = "div") {
        this.blockElem = document.createElement(blockElementType)
        this.blockElem.className = blockClass
    }
}

class Shape {
    constructor(boardGrid) {
        this.boardGrid = boardGrid
        
        const blocksPerShape = 4
        this.shapeBlocks = new Array(blocksPerShape).fill({block:null, pos:{x:0, y:0}})

        // create new block for each element in shapeBlocks
        // change only .block
        for(let i = 0, newBlock, backupPosition; i < blocksPerShape; i++){
            backupPosition = this.shapeBlocks[i].pos
            newBlock = this.boardGrid.addBlock()
            this.shapeBlocks[i] = {block: newBlock, pos: backupPosition}
        }
        
    }

    // use as an annonymous !!
    canIMoveShapeTo(newPosArr) {
        const reduceAcc = (accMoves, newPos) => {
            return accMoves && this.boardGrid.canIMoveTo(newPos.x, newPos.y) 
        }

        return newPosArr.reduce(reduceAcc, true)
    }

    setPosition(newPosArr) {
        
        // copy pos element from newPosArr into pos in shapeBlocks
        // change only .pos
        for(let i = 0, currBlock; i < this.shapeBlocks.length; i++) {
            currBlock = this.shapeBlocks[i]
            
            this.boardGrid.moveBlock(currBlock.block, currBlock.pos.x, currBlock.pos.y,
                newPosArr[i].x, newPosArr[i].y)

            const copyBlockElem = currBlock.block 
            this.shapeBlocks[i] = {block: copyBlockElem, pos: newPosArr[i]} 
        }
    }

    move(direction){
        switch(direction){
            case 'R':
                let newPosArr = this.shapeBlocks.map((shapeBlock) => {return {x: shapeBlock.pos.x + 1, y: shapeBlock.pos.y}})
                if(canIMoveShapeTo(newPosArr))
                     setPosition(newPosArr)

                break;
            default:
                return false
        }

    }
}


let elems = new boardHTMLElements()
let grid = new boardBlocksGrid(elems)

let s = new Shape(grid)
s.setPosition([{x:4, y:4}, {x:5, y:5}, {x:6, y:6}, {x:7, y:7}])
// s.move('R')










