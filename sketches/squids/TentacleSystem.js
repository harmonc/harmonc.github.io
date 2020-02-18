class TentacleSystem {
  constructor(x, y, a, c, v, l, lvar, seed) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.v = v;
    this.l = l;
    this.lvar = lvar;
    this.seed = seed;
  }

  show() {
    noiseSeed(this.seed);
    randomSeed(this.seed);
    for (var i = 0; i < 6; i++) {
      this.r1 = random(-this.lvar,this.lvar);

      this.t = new Tentacle((this.x+12.5)-25*(i%2),this.y ,this.a,this.v,this.c, this.l+this.r1,  random(1000));

      this.t.create();
    }
  }
}
