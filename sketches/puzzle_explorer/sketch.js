var edgeX, edgeY, board_size, gridSize;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  if (window.innerWidth < window.innerHeight) {
    board_size = window.innerWidth;
  } else {
    board_size = window.innerHeight;
  }
  var centerX = window.innerWidth / 2
  var centerY = window.innerHeight / 2
  edgeX = centerX - board_size / 2;
  edgeY = centerY - board_size / 2;
  gridSizeX = 10;
  gridSizeY = 10;
}

function draw() {
  background(255);
  stroke(0,150);
  rect(edgeX, edgeY, board_size, board_size);
  var spacing = board_size / gridSizeX;
  for (var i = 0; i < gridSizeX; i++) {
    line(edgeX + i * spacing, edgeY, edgeX + i * spacing, edgeY + board_size);
  }
  var spacing = board_size / gridSizeY;
  for (var i = 0; i < gridSizeY; i++) {
    line(edgeX, edgeY + i * spacing, edgeX + board_size, edgeY + i * spacing);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
