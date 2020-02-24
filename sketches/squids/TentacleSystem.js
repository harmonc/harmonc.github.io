class TentacleSystem {

  constructor(x, y, a, c, v, l, lvar) {
    this.x = x;
    this.tentacles = [];
    this.y = y;
    this.a = a;
    this.c = c;
    this.v = v;
    this.l = l;
    this.lvar = lvar;
    for (var i = 0; i < 6; i++) {
      this.r1 = random(-this.lvar,this.lvar);

      this.t = new Tentacle((this.x+12.5)-25*(i%2),this.y ,this.a,this.v,this.c, this.l+this.r1);

      this.t.create();
      this.tentacles.push(this.t);
    }
  }

  show() {
      this.tentacles.forEach((item, i) => {
        item.show();
      });
  }
}
