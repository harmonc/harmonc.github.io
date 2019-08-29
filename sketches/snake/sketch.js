var gridSize, size, array, dir, t, timer, snakeLength;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  gridSize = 50;
  size = min(width, height);
  array = [];
  array.push([gridSize / 2, gridSize / 2]);
  dir = 0;
  t = 0;
  timer = 10;
  snakeLength = 100;

}

function draw() {
  translate(width / 2, 0);
  background(52);
  noStroke();
  fill(30);
  rect(-size / 2, 0, size, size);
  strokeWeight(size/gridSize);
  noFill();
  colorMode(HSB,255);
  for (var i = 0; i < array.length-1; i++) {
    stroke(map(i,0,array.length,0,255),255,255);
    var x1 = -size / 2 + array[i][0] * size / gridSize+(size/gridSize)/2;
    var y1 = array[i][1] * size / gridSize+ (size/gridSize)/2;
    var x2 = -size / 2 + array[i+1][0] * size / gridSize+(size/gridSize)/2;
    var y2 = array[i+1][1] * size / gridSize+ (size/gridSize)/2;
    line(x1,y1,x2,y2);
  }
  if (t % timer == 0) {
    var x, y;
    var endIndex = array.length-1;
    if (dir == 0) {
      x = array[endIndex][0] + 1;
      y = array[endIndex][1];
      if(x>=gridSize){
        x = x-1;
      }
    } else if (dir == 1) {
      x = array[endIndex][0];
      y = array[endIndex][1] + 1;
      if(y>=gridSize){
        y = y-1;
      }
    } else if (dir == 2) {
      x = array[endIndex][0] - 1;
      if (x < 0) {
        x = 0;
      }
      y = array[endIndex][1];
    } else if (dir == 3) {
      x = array[endIndex][0];
      y = array[endIndex][1] - 1;
      if (y < 0) {
        y = 0;
      }
    }
    array.push([x, y]);
    if (array.length > snakeLength) {
      array.shift();
    }
    print(array);
  }
  t++;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    dir = 3
  } else if (keyCode === DOWN_ARROW) {
    dir = 1;
  }
  if (keyCode === LEFT_ARROW) {
    dir = 2;
  } else if (keyCode === RIGHT_ARROW) {
    dir = 0;
  }
}
