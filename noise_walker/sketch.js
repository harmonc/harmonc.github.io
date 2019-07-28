let xOff;
let yOff;
var p;
var i;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  p = createVector(0, 0);
  xOff = random(100);
  yOff = random(100);
  i = 0;
  background(0);
  button = createButton('Save Picture');
  button.mousePressed(myButton);
  button.position(0, 0);
}

function draw() {
  translate(width / 2.0, height / 2.0);
  for (var j = 0; j < 5; j++) {

    strokeWeight(15);
    colorMode(HSB, 255);
    var arm = 8;
    for (var a = 0; a < TWO_PI; a += TWO_PI / arm) {
      stroke((i / 5.0) % 255, 255, 255);
      point(p.x, p.y);
      rotate(TWO_PI / arm);
    }

    p.x += map(noise(xOff), 0, 1, -1, 1);
    p.y += map(noise(yOff), 0, 1, -1, 1);
    xOff += .01;
    yOff += .01;
  }
  i++;
}

function myButton() {
  save('myCanvas.jpg');
}
