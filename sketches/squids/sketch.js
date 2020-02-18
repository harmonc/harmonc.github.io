var squids;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  squids = [];
  for (var i = 0; i < 5; i++) {
    squids.push(new Squid(random(window.innerWidth), random(window.innerHeight), HALF_PI, 1, random(100000)));
  }
}

function draw() {
  background(0, 105, 148);
  stroke(255);
  point(mouseX, mouseY);
  for (var i = 0; i < squids.length; i++) {
    squids[i].display();
  }
}

function mousePressed() {
  squids = [];
  for (var i = 0; i < 5; i++) {
    squids.push(new Squid(random(window.innerWidth), random(window.innerHeight), HALF_PI, 1, random(100000)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
