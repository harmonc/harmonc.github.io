let board, l
let win = [0,0]
var t = 0
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

    l = min(canvas.width/19.0,canvas.height/19.0)
  
}

function draw(){
    if(t == 0){
        randomPlayer(board, true)
    }else{
        randomPlayer(board, false)
    }
    t = (t+1)%2
    drawBoard(board,l)
    checkGameOver(board)
}

function checkGameOver(board){
    let p = getBallPos(board)
    if(p.y <= 1 || p.y >= board.length - 2){
        if(p.y <= 1){
            win[0]++
        }else{
            win[1]++
        }
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[0].length; j++){
                board[i][j] = 0
            }
        }
        board[floor(board.length/2)][floor(board[0].length/2)] = 1
        console.log('P1:'+win[0]+', P2:'+win[1] + ", P1 Win %:" + win[0]/(win[0]+win[1]))
    }
}

function randomPlayer(board, top){
    let p = getBallPos(board)
    let row = p.y + floor(random(0,7)) * (top?-1:1)
    let col = p.x + floor(random(-5,6))
    if(random(1)<.5){
        longestJump(board,p.y,p.x, top)
    }else{
        if(inBounds(board,col,row) && board[row][col] == 0){
            board[row][col] = 2
        }
    }
}

function randomPlayer2(board, top){
    let p = getBallPos(board)
    let row = p.y + 1 * (top?-1:1)
    let col = p.x
    if(random(1)<.5){
        longestJump(board,p.y,p.x, top)
    }else{
        if(inBounds(board,col,row) && board[row][col] == 0){
            board[row][col] = 2
        }
    }
}

function randomPlayer3(board, top){
    let p = getBallPos(board)
    let row = p.y + 1 * (top?-1:1)
    let col = p.x + floor(random(-1,2))
    if(random(1)<.5){
        longestJump(board,p.y,p.x, top)
    }else{
        if(inBounds(board,col,row) && board[row][col] == 0){
            board[row][col] = 2
        }
    }
}

function getBallPos(board){
    var result = createVector(-1,-1)
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] == 1){
                result = createVector(j,i)
            }
        }
    }
    return result
}

function longestJump(board, row, col, top){
    let s
    if(top){
        s = -1
    }else{
        s = 1
    }
    let dir = [[1,0],[1,1*s],[0,1*s],[-1,1*s],[-1,0]]
    let spots = []
    let ds = []
    for(let i = 0; i < dir.length; i++){
        let s = jumpDir(board, col, row, dir[i][0],dir[i][1],0)
        if(s[0]!=-1){
            spots.push(s)
            ds.push(dir[i])
        }
    }

    let max, maxDir, d
    if(spots.length > 0){
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
        let r = row
        let c = col
        while(r != max[1] || c != max[0]){
            board[r][c] = 0
            r += maxDir[1]
            c += maxDir[0]
        }
        board[max[1]][max[0]] = 1
    }

}

function jumpDir(board, x, y, dx, dy,count){
    let pX = x + dx
    let pY = y + dy
    if(!inBounds(board,pX,pY)){
        return [-1,-1]
    }
    else if(board[pY][pX] == 0 && count == 0){
        return [-1,-1]
    }else if(board[pY][pX] == 2){
        return jumpDir(board,pX,pY, dx, dy, count + 1)
    }else{
        return [pX, pY]
    }
}

function inBounds(board, x, y){
    return y>=0 && y < board.length && x>=0 && x < board[y].length
}

function drawBoard(board, l){
    background(245)
    push()
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
    pop()
}