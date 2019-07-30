var canvas;
var arr = [];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
}

function draw() {
  background(52);
  arr.push(createVector(mouseX,mouseY));
  if (arr.length > 50) {
    arr.shift();
  }

  var size = 25;

  for (var i = 0; i < arr.length-1; i++) {
    strokeWeight(map(i,0,arr.length-1,0,size));
    colorMode(RGB,255);
    stroke(0,0,255,map(i,0,arr.length-1,0,150));
    line(arr[i].x,arr[i].y,arr[i+1].x,arr[i+1].y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
