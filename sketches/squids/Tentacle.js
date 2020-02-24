class Tentacle {

  constructor(x, y, a, v, c, l) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.v = v;
    this.l = l / 10.0;
  }

  create() {
    this.points = [];
    this.angles = [];
    //  ellipse(x, y, 25, 25);
    this.t = random(1000);
    this.points.push(createVector(this.x, this.y));
    for (var i = 0; i < 10; i++) {
      this.x += this.l * cos(this.a);
      this.y += this.l * sin(this.a);
      //  ellipse(x, y, 25-i*2, 25-i*2);
      this.t += .1;
      this.points.push(createVector(this.x, this.y));
      this.angles.push(this.a - HALF_PI);
      this.a += map(noise(this.t), 0, 1, -this.v, this.v);
    }
    this.angles.push(this.a - HALF_PI);

    for (var i = 1; i < this.points.length; i++) {
      this.start = this.points[i - 1];
      this.end = this.points[i];
    //  line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
    this.pointsRight = [];
    this.pointsLeft = [];
    for (var i = 0; i < this.angles.length; i++) {
      this.start = this.points[i];
      line(this.start.x, this.start.y, this.start.x + (25 - i * 2) / 2.0 * cos(this.angles[i]), this.start.y + (25 - i * 2) / 2.0 * sin(this.angles[i]));
      this.pointsRight.push(createVector(this.start.x + (25 - i * 2) / 2.0 * cos(this.angles[i]), this.start.y + (25 - i * 2) / 2.0 * sin(this.angles[i])));
      line(this.start.x, this.start.y, this.start.x - (25 - i * 2) / 2.0 * cos(this.angles[i]), this.start.y - (25 - i * 2) / 2.0 * sin(this.angles[i]));
      this.pointsLeft.push(createVector(this.start.x - (25 - i * 2) / 2.0 * cos(this.angles[i]), this.start.y - (25 - i * 2) / 2.0 * sin(this.angles[i])));
    }
  }

  show(){
    fill(this.c);
    beginShape();
    for (var i = 0; i < this.pointsRight.length; i++) {
      this.p = this.pointsRight[i];
      vertex(this.p.x, this.p.y);
    }
    for (var i = this.pointsLeft.length - 1; i >= 0; i--) {
      this.p = this.pointsLeft[i];
      vertex(this.p.x, this.p.y);
    }
    endShape();
  }
}
