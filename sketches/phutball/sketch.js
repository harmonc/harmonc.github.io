let board, l
function setup(){
    createCanvas(innerWidth,innerHeight)
    background(245)


    board = []
    for(let i = 0; i < 19; i++){
        let row = []
        for(let j = 0; j < 19; j++){
            row.push(0)
        }
        board.push(row)
    }
    board[9][9] = 1
    board[10][9] = 2

    l = min(canvas.width/19.0,canvas.height/19.0)
  
    drawBoard(board, l)

}

function draw(){
    background(245)
    drawBoard(board,l)
    randomPlayer(board)
}

function randomPlayer(board){
    let row = floor(random(board.length))
    let col = floor(random(board[0].length))
    if(board[row][col] == 0){
        board[row][col] = 2
    }else if(board[row][col] == 1){
        longestJump(board,row,col)
    }
}

function longestJump(board, row, col){
    console.log(board)
    let dir = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]]
    let spots = []
    let ds = []
    for(let i = 0; i < dir.length; i++){
        let s = jumpDir(board, col, row, dir[i][0],dir[i][1],0)
        if(s[0]!=-1){
            spots.push(s)
            ds.push(dir[i])
        }
    }
    console.log('spots')
    console.log(spots)
    let max, maxDir, d
    if(spots.length > 0){
        console.log("hi")
        max = spots[0]
        maxDir = ds[0]
        d = dist(max[0],max[1],col,row)
        for(let i = 1; i < spots.length; i++){
            let d2 = dist(spots[i][0],spots[i][1],col,row)
            if(d2 > d){
                max = spots[i]
                d = d2
                maxDir = ds[i]
            }
        }
    }
    while(row != max[0]){
        board[row][col] = 0
        row += maxDir[0]
        col += maxDir[1]
    }
    board[max[1]][max[0]] = 1
}

function jumpDir(board, x, y, dx, dy,count){
    let pX = x + dx
    let pY = y + dy
    if(!inBounds(board,pX,pY)){
        console.log('out of bounds')
        return [-1,-1]
    }
    else if(board[pY][pX] == 0 && count == 0){
        console.log('nothing to jump')
        return [-1,-1]
    }else if(board[pY][pX] == 2){
        console.log('jump')
        return jumpDir(board,pX,pY, dx, dy, count + 1)
    }else{
        console.log('landed')
        return [pX, pY]
    }
}

function inBounds(board, x, y){
    return y>=0 && y < board.length && x>=0 && x < board[y].length
}

function drawBoard(board, l){
    translate(canvas.width/2.0, canvas.height/2.0)
    strokeWeight(2)
    stroke(150)
    for(let i = -9; i<= 9; i++){
        line(i*l,-9*l,i*l,9*l)
        line(-9*l,i*l,9*l,i*l)
    }
        stroke(0)
    strokeWeight(2)
    for(let i = -9; i<= 9; i++){
        for(let j = -9; j <= 9; j++){
            if(board[i+9][j+9]==1){
                fill(255)
                ellipse(j*l,i*l,l*.9,l*.9)
            }else if(board[i+9][j+9]==2){
                fill(0)
                ellipse(j*l,i*l,l*.9,l*.9)
            }
        }
    }
}