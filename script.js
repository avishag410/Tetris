class boardHTMLElements {

    constructor(gameBoardElementId, blockClass, blockElementType = "div") {
        this.board = document.getElementById(gameBoardElementId)
        this.gameBoardElementId = gameBoardElementId
        this.blockElementType = blockElementType
        this.blockClass = blockClass 

        this.demoBlock = document.createElement(this.blockElementType) 
        this.demoBlock.classList.add(blockClass)
        
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
        //return document.getElementsByClassName(this.blockClass)[0].clientWidth
        return window.getComputedStyle(document.getElementById("demoBlock"))
    }

    get blockHeigthPx() {
        return document.getElementsByClassName(this.blockClass)[0].clientHeight
    }

    addBlock(block) {
        // this.board.appendChild(block)

    }

}



class boardBlocksGrid {
    constructor(boardHTMLElements) {
        // const board = document.getElementById("game_board")
        // const boardWidthPx = board.style.width
        // const boardHeigthPx = board.style.height
    
        // let block = document.createElement("div")
        // block.className = "block_shape" 
        // const blockWidthPx = block.style.width
        // const blockHeigthPx = block.style.height
        
        const boardWidthBlocks = boardHTMLElements.boardWidthPx() / boardHTMLElements.blockWidthPx()
        const boardHeigthBlocks = boardHTMLElements.boardHeigthPx() / boardHTMLElements.blockHeigthPx()
        this.boardBlocksGrid = [...Array(boardWidthBlocks)].map(e => Array(boardHeigthBlocks).fill(false));
    }

    addBlock(block, x, y) {
        this.boardBlocksGrid[x][y] = true
        // this.board.appendChild(block)
    }
    
    removeBlock(x, y) {
        this.boardBlocksGrid[x][y] = false
    }
    
    changeBlockPotision(block, oldX, oldY, newX, newY) {
        this.boardBlocksGrid[oldX][oldY] = false
        this.boardBlocksGrid[newX, newY] = true
    }
    
}

class Block {
    constructor(boardBlocksGrid) {
        
        // this.blockElem = document.createElement("div")
        // this.blockElem.className = blockStyle
        
        this.position = [0, 0]
        this.boardGrid = boardBlocksGrid
    }

    showBlock() {
        this.boardGrid.addBlock(this, this.position[0], this.position[1])
    }

    setPosition(x, y) {
        this.boardGrid.changeBlockPotision(this, this.position[0], this.position[1], x, y)
        this.position = [x, y]
    }

    moveLeft() {
        this.setPosition(this.position[0], this.position[1] + 1)
    }

    moveRight() {
        this.setPosition(this.position[0] + 1, this.position[1])
    }

    remove() {
        this.boardGrid.removeBlock(this.position[0], this.position[1])
    }
    
}

const createShapeI = (boardPosition) => {
    // i
    let i0 = createBlock()    
    let i1 = createBlock()
    let i2 = createBlock()
    let i3 = createBlock()

}

let elems = new boardHTMLElements("game_board", "block_shape")
console.log(elems.boardWidthPx)
console.log(elems.boardHeigthPx)
console.log(elems.blockWidthPx)
console.log(elems.blockHeigthPx)