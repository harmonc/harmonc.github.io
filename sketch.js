var canvas;
var size;
var w;
var h;
var grid;
var snake;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  size = 10;
  w = int(window.innerWidth / size) + 1;
  h = int(window.innerHeight / size) + 1;
  grid = [];
  for (var i = 0; i < h; i++) {
    var row = [];
    for (var j = 0; j < w; j++) {
      row.push(false);
    }
    console.log(row);
    grid.push(row);
  }
  console.log(grid);
  snake = new Snake(int(random(grid[0].length)), int(random(grid.length)));
  console.log(snake.xPos);
  console.log(snake.yPos);
  grid[snake.yPos][snake.xPos] = true;
  background(12);
}

function draw() {

  var moved = snake.move(grid);
  if (!moved) {
    snake = respawn();
  }
}

function respawn() {
  var result = null;
  var totalSpots = grid[0].length * grid.length;
  var startPos = int(random(totalSpots));
  var pos = startPos;
  var xPos = int(pos % grid[0].length);
  var yPos = int(pos / grid[0].length);

  var done = false;
  while (!validPostion(xPos, yPos) && !done) {
    pos = (pos + 1) % totalSpots;
    xPos = int(pos % grid[0].length);
    yPos = int(pos / grid[0].length);
    if (startPos==pos){
      done = true;
    }
  }
  if(!done){
    grid[yPos][xPos] = true;
    result = new Snake(xPos,yPos);
  }
  return result;
}

function validPostion(x, y){
  return !gridValue(x,y) && !gridValue(x+1,y) && !gridValue(x-1,y) && !gridValue(x,y+1) && !gridValue(x,y-1);
}

function gridValue(x, y){
  if(x >= 0 && y >= 0 && x < grid[0].length && y < grid.length){
    return grid[y][x];
  }else{
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
