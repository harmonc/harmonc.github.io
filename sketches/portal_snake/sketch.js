var s;
var snake_size;
var grid_count = 15;

var snake;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(12);
  setGrid();
  snake = new Snake(7, 7);
}

function draw() {
  background(12);
  noStroke();
  for (var i = 0; i < grid_count; i++) {
    for (var j = 0; j < grid_count; j++) {
      if ((i % 2 == 0) ? (j % 2 == 0) : (j % 2 == 1)) {
        fill(75);
      } else {
        fill(100);
      }
      rect(windowWidth / 2 - s / 2 + snake_size * j, windowHeight / 2 - s / 2 + snake_size * i, snake_size, snake_size);
    }
  }
  fill(0, 100, 255);
  stroke(0, 100, 255);
  for (var i = 0; i < snake.blocks.length; i++) {
    rect(windowWidth / 2 - s / 2 + snake_size * snake.blocks[i][0], windowHeight / 2 - s / 2 + snake_size * snake.blocks[i][1], snake_size, snake_size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setGrid();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.moveWest();
  } else if (keyCode === RIGHT_ARROW) {
    snake.moveEast();
  } else if (keyCode === UP_ARROW) {
    snake.moveNorth();
  } else if (keyCode === DOWN_ARROW) {
    snake.moveSouth();
  }
}

function setGrid() {
  if (windowWidth < windowHeight) {
    s = windowWidth;
  } else {
    s = windowHeight;
  }
  snake_size = s / grid_count;
}
