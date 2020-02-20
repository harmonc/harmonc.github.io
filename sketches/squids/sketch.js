var squids;
var num_squids;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  squids = [];
  var r = random(1000);
  num_squids = (width*height)/30000;
  for (var i = 0; i < num_squids; i++) {
    squids.push(new Squid(random(window.innerWidth), random(window.innerHeight), HALF_PI+random(-.3,.3), random(.3,.7), random(r)));
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
  var r = random(1000);
  for (var i = 0; i < num_squids; i++) {
    squids.push(new Squid(random(window.innerWidth), random(window.innerHeight), HALF_PI+random(-.3,.3), random(.3,.7), r));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
