var DEFAULT_SIZE = 1000
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var DIM = Math.min(WIDTH, HEIGHT)
var M = DIM / DEFAULT_SIZE
var tokenData;
var R;
function setup() {
    createCanvas(DIM, DIM)
    tokenData = {
      hash: "0x11ac16678959949c12d5410212301960fc496813cbc3495bf77aeed738579738", 
      tokenId: "123000456"
  }
    R = new Random()
    console.log(R.random_dec())
    generate()
}

function generate() {
    let gene = []
    for(let i = 0; i < 7; i++){
        gene.push(R.random_dec())
    }
    colorMode(RGB)
    background(108,174,117)
    fill(135, 206, 235)
    noStroke()
    rect(0, 0, (1000)*M, (1000 - 100)*M)
    stem(1000/2*M, (1000-50)*M, -PI/2.0, (1000/10)*M, 30, 0.1, gene)
}

function stem(x, y, a, l, d, c, gene) {
  colorMode(RGB)
  stroke(34, 139, 34)
  strokeWeight(max(map(l, 100, 40, 10, 1), 1)*M)
  let x2 = x + l*cos(a)*M
  let y2 = y + l*sin(a)*M
  line(x, y, x2, y2);
  if (d>0 && (R.random_dec()>c || l > 1000/10-20)) {
    stem(x2, y2, a+map(R.random_dec()-0.5,-1,1,-0.4,0), l*.9, d-1, c * 1.2, mutate(gene));
    stem(x2, y2, a+map(R.random_dec()-0.5,-1,1,0,.4), l*.9, d-1, c * 1.2, mutate(gene));
    if (R.random_dec()>0.7) {
      stem(x2, y2, a+map(R.random_dec(),0,1,-PI/6, PI/6), l*.9, 0, c * 1.4, mutate(gene));
    }
  } else {
    push()
    translate(x2, y2);
    rotate(TAU*R.random_dec());
    scale(map(l, 100, 40, .4, .3)*M);
    flower(gene);
    pop()
  }
}

function mutate(gene) {
  var result = []
  for (let i = 0; i < gene.length; i++) {
    var g = gene[i];
    g += R.random_dec()*0.1-0.05;
    if (g>1) {
      g=1;
    } else if (g<0) {
      g=0;
    }
    result.push(g);
  }
  return result;
}

function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}

function flower(gene){
  colorMode(HSB);
  stroke(0);
  strokeWeight(4*M);
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
    ellipse(10*M, -w/2.0*M, l*M, w*M);
  }
  fill(c);
  ellipseMode(CENTER);
  ellipse(0*M, 0*M, 50*M, 50*M);
}

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8, 16));
      let b = parseInt(uint128Hex.substr(8, 8, 16));
      let c = parseInt(uint128Hex.substr(16, 8, 16));
      let d = parseInt(uint128Hex.substr(24, 8, 16));
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
  // random number between a (inclusive) and b (exclusive)
  random_num(a, b) {
    return a + (b - a) * this.random_dec();
  }
  // random integer between a (inclusive) and b (inclusive)
  // requires a < b for proper probability distribution
  random_int(a, b) {
    return Math.floor(this.random_num(a, b + 1));
  }
  // random boolean with p as percent liklihood of true
  random_bool(p) {
    return this.random_dec() < p;
  }
  // random value in an array of items
  random_choice(list) {
    return list[this.random_int(0, list.length - 1)];
  }
}