var board = [];
var GRID_SIZE = 10;
var SQUARE_SIZE = 50;
class Cell{
	constructor(row, col) {
		this.row = height;
		this.col = width;
		this.dead = false;
	}
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
	for(var i = 0; i < GRID_SIZE; i++){
		var row = []
		for(var j = 0; j < GRID_SIZE; j++){
			if(random(1)>.5){
				row.push(false);
			}
			else{
				row.push(true);
			}
			rect(j*SQUARE_SIZE,i*SQUARE_SIZE,SQUARE_SIZE,SQUARE_SIZE);
		}
		board.push(row);
	}
	console.log(board);
}

function draw(){
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

