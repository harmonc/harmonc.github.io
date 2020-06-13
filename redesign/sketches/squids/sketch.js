var squids;
var num_squids;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  squids = [];
  num_squids = (width*height)/30000;
  var a = random(TWO_PI);
  for (var i = 0; i < num_squids; i++) {
    squids.push(new Squid(random(window.innerWidth), random(window.innerHeight), a+random(-.2,.2), random(.3,.7)));
  }
  show();
}

function draw() {

}

function show(){
  background(0, 50, 100);
  for (var i = 0; i < squids.length; i++) {
    squids[i].display();
    for(var j = 0; j < random(500); j++){
      noStroke();
      fill(255,random(50));
      var s = random(30);
      ellipse(random(windowWidth),random(windowHeight),s,s);
    }
  }

}

function mousePressed() {
  squids = [];
  var a = random(TWO_PI);
  for (var i = 0; i < num_squids; i++) {
    squids.push(new Squid(random(window.innerWidth), random(window.innerHeight), a+random(-.2,.2), random(.3,.7)));
  }
  show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
