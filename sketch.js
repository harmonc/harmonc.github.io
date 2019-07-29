var canvas;
var arr = [];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  background(255);
}

function draw() {
  background(255);
  arr.push(createVector(mouseX,mouseY));
  if (arr.length > 10) {
    arr.shift();
  }
  for (var i = 0; i < arr.length; i++) {
    noStroke();
    fill(0,map(i,0,arr.length-1,0,255));
    ellipse(arr[i].x,arr[i].y, 50, 50);
  }
}
