var squid;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  squid = new Squid(window.innerWidth/2,window.innerHeight/2,HALF_PI,1, random(100000));
}

function draw() {
  background(15);
  stroke(255);
  point(mouseX,mouseY);
  squid.display();
}

function mousePressed(){
  squid = new Squid(window.innerWidth/2,window.innerHeight/2,HALF_PI,1, random(100000));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
