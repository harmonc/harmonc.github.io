function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    generate()
}

function draw() {
    
}

function mousePressed() {
    generate();
}

function generate() {
    let gene = []
    for(let i = 0; i < 7; i++){
        gene.push(random(1))
    }
    colorMode(RGB)
    background(108,174,117)
    fill(135, 206, 235)
    noStroke()
    rect(0, 0, width, height - 100)
    stem(width/2, height-50, -PI/2.0, height/10, 30, 0.1, gene)
}

function stem(x, y, a, l, d, c, gene) {
  colorMode(RGB)
  stroke(34, 139, 34)
  strokeWeight(max(map(l, 100, 40, 10, 1), 1))
  let x2 = x + l*cos(a)
  let y2 = y + l*sin(a)
  line(x, y, x2, y2);
  if (d>0 && (random(1)>c || l > height/10-20)) {
    stem(x2, y2, a+map(randomGaussian(),-1,1,-0.4,0), l*.9, d-1, c * 1.2, mutate(gene));
    stem(x2, y2, a+map(randomGaussian(),-1,1,0,.4), l*.9, d-1, c * 1.2, mutate(gene));
    if (random(1)>0.7) {
      stem(x2, y2, a+random(-PI/6, PI/6), l*.9, 0, c * 1.4, mutate(gene));
    }
  } else {
    push()
    translate(x2, y2);
    rotate(random(TAU));
    scale(map(l, 100, 40, .25, .15));
    flower(gene);
    pop()
  }
}

function mutate(gene) {
  var result = []
  for (let i = 0; i < gene.length; i++) {
    var g = gene[i];
    g += random(-.05, .05);
    if (g>1) {
      g=1;
    } else if (g<0) {
      g=0;
    }
    result.push(g);
  }
  return result;
}