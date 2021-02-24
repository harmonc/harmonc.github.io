function flower(gene){
  colorMode(HSB);
  stroke(0);
  strokeWeight(4);
  noStroke();
  let c = color(map(gene[0], 0, 1, 0, 255), 200, 200);
  let c2 = color((hue(c) + map(gene[6], 0, 1, 0, 127.5))%255, 200, 200);
  let petals = floor(map(gene[1], 0, 1, 3, 7))*2;
  let petalLength = map(gene[2], 0, 1, 100, 170);
  let petalLength2 = petalLength - map(gene[3], 0, 1, 10, 30);
  let petalWidth = map(gene[4], 0, 1, 40, 100);
  let petalWidth2 = petalWidth - map(gene[5], 0, 1, 10, 30);
  for (let i = 0; i < petals; i++) {
    var l, w;
    if (i<petals/2) {
      fill(c);
      l = petalLength;
      w = petalWidth;
    } else {
      fill(c2);
      l = petalLength2;
      w = petalWidth2;
    }
    if (i==petals/2) {
      rotate(TAU/petals);
    }
    rotate(TAU/petals*2);
    ellipseMode(CORNER);
    ellipse(10, -w/2.0, l, w);
  }
  fill(c);
  ellipseMode(CENTER);
  ellipse(0, 0, 50, 50);
}