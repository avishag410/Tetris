class boardHTMLElements {

    constructor(gameBoardElementId, blockClass, blockElementType = "div") {
        this.board = document.getElementById(gameBoardElementId)
        this.gameBoardElementId = gameBoardElementId
        this.blockElementType = blockElementType
        this.blockClass = blockClass 
        this.rowBlocksNum = 13
        this.colBlockNum = 15
    }

    createBlockElement() {
        let block = document.createElement(this.blockElementType) 
        block.style.className = this.blockClass
        return block
    }

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
        console.log(`x: ${x} y: ${y} this.blockWidthPx: ${this.blockWidthPx}`)
        block.style.left = x * this.blockWidthPx + 'px'
        block.style.top = y * this.blockHeigthPx + 'px'


    }

    addBlock(x, y) {
        let blockElem = document.createElement("div")
        blockElem.className = this.blockClass
        
        this.board.appendChild(blockElem)
        this.moveBlock(blockElem, x, y)

        return blockElem
    }

    removeBlock(block) {
        this.board.removeChild(block)
    }

}



class boardBlocksGrid {
    constructor(boardHTMLElements) {
        const boardWidthBlocks = boardHTMLElements.boardWidthPx / boardHTMLElements.blockWidthPx
        const boardHeigthBlocks = boardHTMLElements.boardHeigthPx / boardHTMLElements.blockHeigthPx
        this.boardBlocksGrid = [...Array(boardWidthBlocks)].map(e => Array(boardHeigthBlocks).fill({isFilled: false, block: null}));
        this.htmlBoard = boardHTMLElements
    }

    addBlock(x, y) {
        
        this.boardBlocksGrid[x][y] = true
        // return this.htmlBoard.addBlock(x, y)
    }
    
    removeBlock(x, y) {
        this.boardBlocksGrid[x][y] = false
    }
    
    /* Check if we can move block from old pos to new pos, and move it */
    changeBlockPotision(block, oldX, oldY, newX, newY) {

        // check that block doesnt exceed board limits
        if(newX >= boardHTMLElements.boardWidthBlocks ||
            newX < 0 ||
             newY >= boardHTMLElements.boardHeigthBlocks ||
             newY < 0) 
            return false
            
        this.boardBlocksGrid[oldX][oldY] = false
        this.boardBlocksGrid[newX][newY] = true
        this.htmlBoard.moveBlock(block, newX, newY)

        return true
    }
    
}

class Block {
    constructor(boardBlocksGrid, x = 0, y = 0) {
        this.position = [x, y]
        this.boardGrid = boardBlocksGrid
        this.blockHTMLElem = null
    }

    showBlock() {
        this.blockHTMLElem = this.boardGrid.addBlock(this.position[0], this.position[1])
    }

    setPosition(x, y) {
        if(this.blockHTMLElem !== null) {
            if(this.boardGrid.changeBlockPotision(this.blockHTMLElem,
                 this.position[0], this.position[1], x, y))
                this.position = [x, y]
        }
    }

    moveLeft() {
        this.setPosition(this.position[0] - 1, this.position[1])
    }

    moveRight() {
        this.setPosition(this.position[0] + 1, this.position[1])
    }

    moveUp() {
        this.setPosition(this.position[0], this.position[1] - 1)
    }

    moveDown() {
        this.setPosition(this.position[0], this.position[1] + 1)
    }

    remove() {
        this.boardGrid.removeBlock(this.position[0], this.position[1])
    }
    
}


let elems = new boardHTMLElements("game_board", "block_shape")
let grid = new boardBlocksGrid(elems)
let block = new Block(grid, 0, 0)
block.showBlock()
// block.setPosition(1,1)
block.moveLeft()
block.moveDown()