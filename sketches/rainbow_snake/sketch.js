var gridSize;
var x;
var y;
var dir;
var xPrev;
var yPrev;
var count;
var speed;
var directions = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  gridSize = 10;
  x = floor(width / 2 / gridSize) * gridSize;
  y = floor(height / 2 / gridSize) * gridSize;
  background(50);
  count = 0;
  speed = 15;
  directions.push('right');
  directions.push('right');
  directions.push('right');
  directions.push('right');
  directions.push('right');
}

function draw() {
  if (count === 0) {
    if (dir === 'right') {
      x += gridSize;
      if (x >= floor(width / gridSize) * gridSize) {
        x = 0;
      }
    } else if (dir === 'down') {
      y += gridSize;
      if (y >= floor(height / gridSize) * gridSize) {
        y = 0;
      }
    } else if (dir === 'left') {
      x -= gridSize;
      if (x <= 0) {
        x = floor(width / gridSize) * gridSize - gridSize;
      }
    } else if (dir === 'up') {
      y -= gridSize;
      if (y <= 0) {
        y = floor(height / gridSize) * gridSize - gridSize;
      }
    }
    directions.push(dir);
    directions.shift();
  }
  xPrev = x;
  yPrev = y;
  for (var i = directions.length - 1; i >= 0; i--) {
    if (directions[i] === 'left') {
      xPrev += gridSize;
      if (xPrev >= floor(width / gridSize) * gridSize) {
        xPrev = 0;
      }
    } else if (directions[i] === 'up') {
      yPrev += gridSize;
      if (yPrev >= floor(height / gridSize) * gridSize) {
        yPrev = 0;
      }
    } else if (directions[i] === 'right') {
      xPrev -= gridSize;
      if (xPrev <= 0) {
        xPrev = floor(width / gridSize) * gridSize - gridSize;
      }
    } else if (directions[i] === 'down') {
      yPrev -= gridSize;
      if (yPrev <= 0) {
        yPrev = floor(height / gridSize) * gridSize - gridSize;
      }
    }
  }
  noStroke();
  fill(0,0,255);
  rect(xPrev, yPrev, gridSize, gridSize);
  fill(255);
  stroke(0);
  rect(x, y, gridSize, gridSize);
  count = (count + 1) % speed;
}

function keyTyped() {
  if (dir !== 'right' && (key === 'a' || key === 'A')) {
    dir = 'left';
  } else if (dir !== 'up' && (key === 's' || key === 'S')) {
    dir = 'down';
  } else if (dir !== 'left' && (key === 'd' || key === 'D')) {
    dir = 'right';
  } else if (dir !== 'down' && (key === 'w' || key === 'W')) {
    dir = 'up';
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  x = floor(width / 2 / gridSize) * gridSize;
  y = floor(height / 2 / gridSize) * gridSize;
  background(50);
  count = 0;
}
