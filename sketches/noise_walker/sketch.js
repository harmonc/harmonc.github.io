let xOff;
let yOff;
var p;
var i;
var test;
var Test = function() {
  this.filename = 'save';
  this.width = 10;
  this.sides = 8;
  this.save = function(){
    save(this.filename+'.png');
  }
  this.reset = reset;
};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  p = createVector(0, 0);
  xOff = random(100);
  yOff = random(100);
  i = 0;
  background(0);
  test = new Test();
  var gui = new dat.GUI();
  gui.add(test,'width',1,25);
  gui.add(test,'filename');
  gui.add(test,'save');
  gui.add(test,'reset');
  gui.add(test,'sides',1,25).step(1);
}

function draw() {
  print(test.message);
  translate(width / 2.0, height / 2.0);
  for (var j = 0; j < 1; j++) {
    strokeWeight(test.width);
    colorMode(HSB, 255);
    var arm = 8;
    for (var a = 0; a < TWO_PI; a += TWO_PI / test.sides) {
      stroke((i / 5.0) % 255, 255, 255);
      point(p.x, p.y);
      rotate(TWO_PI / test.sides);
    }

    p.x += map(noise(xOff), 0, 1, -1, 1);
    p.y += map(noise(yOff), 0, 1, -1, 1);
    xOff += .01;
    yOff += .01;
  }
  i++;
}

var reset = function reset(){
  background(0);
  p.x = 0;
  p.y = 0;
}