var board = [];
var GRID_SIZE = 15;
var SQUARE_SIZE = 40;
var active_cells = [];
var done = false;
class Cell{
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.dead = false;
	}
}

function setup() {
	noStroke();
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
	for(var i = 0; i < GRID_SIZE; i++){
		var row = []
		for(var j = 0; j < GRID_SIZE; j++){
			row.push(false);
			rect(j*SQUARE_SIZE,i*SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);
		}
		board.push(row);
	}
	var cell = new Cell(Math.floor(random(1,GRID_SIZE-1)),Math.floor(random(1,GRID_SIZE-1)));
	board[cell.row][cell.col] = true;
	active_cells.push(cell);
	drawBoard();
}

function draw(){
	while(!done){
		done = grow();
	}
}

function mousePressed(){
	console.log(active_cells.length);
}

function drawBoard(){
	for(var i = 0; i < GRID_SIZE; i++){
		for(var j = 0; j < GRID_SIZE; j++){
			if(board[i][j]){
				fill(0);
			}else{
				fill(255);
			}
			rect(j*SQUARE_SIZE,i*SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function grow(){
	  if (!allCellsDead()) {
    var r = Math.floor(random(active_cells.length));
    while (active_cells[r].dead) {
      r = (r+1)%active_cells.length;
    }
    var row = active_cells[r].row;
    var col = active_cells[r].col;
    var dir = Math.floor(random(5));
    while (!cellOpen(row, col, dir)) {
      dir = (dir+1)%5;
    }
    var newCell = null;
    switch(dir) {
    case 0:
      newCell = new Cell(row, col+1);
      break;
    case 1:
      newCell = new Cell(row+1, col);
      break;
    case 2:
      newCell = new Cell(row, col-1);
      break;
    case 3:
      newCell = new Cell(row-1, col);
      break;
    default:
      break;
    }
    active_cells.push(newCell);
    if (newCell!=null) {
      board[newCell.row][newCell.col]=true;
	  fill(0);
	  rect(newCell.col*SQUARE_SIZE,newCell.row*SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);
    }
    updateCellStatus();
  }
  return allCellsDead();
}

function allCellsDead(){
	return activeCount()==0;
}

function activeCount(){
	var count = 0;
	for(var i = 0; i < active_cells.length; i++){
		var cell = active_cells[i];
		if(!cell.dead){
			count++;
		}
	}
	return count;
}

function updateCellStatus() {
	var active = activeCount();
	var to_remove = [];
	for (var i = 0; i < active_cells.length;i++) {
		var cell = active_cells[i];
		if(!isCellAlive(cell)){
			cell.dead = true;
			to_remove.push(i)
		}
		if (!cell.dead) {
			if (active > 1 && random(1)<.1) {
				cell.dead = true;
				active = activeCount();
			}
		}
	}
  for(var i = to_remove.length-1; i >= 0; i--){
	  active_cells.splice(to_remove[i],1);
  }
  

  
  active = activeCount();
  if (active == 0) {
    for (var i = 0; i < active_cells.length;i++) {
		cell = active_cells[i];
      cell.dead = !isCellAlive(cell);
    }
  }
}

function cellOpen(row, col, dir) {
	var result = false;
	switch(dir) {
		case 0:
			result = canGrow(row, col+1, dir);
			break;
		case 1:
			result = canGrow(row+1, col, dir);
			break;
		case 2:
			result = canGrow(row, col-1, dir);
			break;
		case 3:
			result = canGrow(row-1, col, dir);
			break;
  }
  return result;
}

function isCellAlive(cell) {
  var row = cell.row;
  var col = cell.col;
  return validSquare(row, col+1, 0) || validSquare(row+1, col, 1)
    || validSquare(row, col-1, 2) || validSquare(row-1, col, 3);
}

function canGrow(row, col, dir){
	var result = false;
	switch(dir){
		case 0:
			result = checkTiles(row-1, col, row+1, col+1);
			break;
		case 1:
			result = checkTiles(row, col-1, row+1, col+1);
			break;
		  case 2:
			result = checkTiles(row-1, col-1, row+1, col);
			break;
		  case 3:
			result = checkTiles(row-1, col-1, row, col+1);
			break;
		default:
			result = false;
	}
	return result;
}

function checkTiles(rowTop, colLeft, rowBottom, colRight){
	var result = true;
	for (var row = rowTop; row <= rowBottom; row++) {
		for (var col = colLeft; col <= colRight; col++) {
			if (!onBoard(row, col)) {
				result = false;
			} else if (board[row][col]) {
				result = false;
			}
		}
	}
  return result;
}

function validSquare(row, col, dir){
	var result = false;
	if(onBoard(row,col) && !board[row][col]){
		result = canGrow(row, col, dir);
	}
	return result;
}

function onBoard(row, col){
	return row >=0 && row < GRID_SIZE && col >=0 && col < GRID_SIZE;
}