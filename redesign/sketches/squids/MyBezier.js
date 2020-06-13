class MyBezier {

  constructor(p0, p1, p2, p3, p4, p5, p6, p7) {
    this.p = [];
    this.p[0] = p0;
    this.p[1] = p1;
    this.p[2] = p2;
    this.p[3] = p3;
    this.p[4] = p4;
    this.p[5] = p5;
    this.p[6] = p6;
    this.p[7] = p7;
  }

  showPoint(t) {
    this.midX = (Math.pow((1.0 - t), 3.0) * this.p[0]) + (3.0 * Math.pow((1.0 - t), 2.0) * t * this.p[2]) + (3.0 * (1.0 - t) * Math.pow(t, 2.0) * this.p[4]) + (Math.pow(t, 3.0) * this.p[6]);
    this.midY = (Math.pow((1.0 - t), 3.0) * this.p[1]) + (3.0 * Math.pow((1.0 - t), 2.0) * t * this.p[3]) + (3.0 * (1.0 - t) * Math.pow(t, 2.0) * this.p[5]) + (Math.pow(t, 3.0) * this.p[7]);
    strokeWeight(15);
    point(midX, midY);
  }

  getXfromT(t) {
    this.midX = (Math.pow((1.0 - t), 3.0) * this.p[0]) + (3.0 * Math.pow((1.0 - t), 2.0) * t * this.p[2]) + (3.0 * (1.0 - t) * Math.pow(t, 2.0) * this.p[4]) + (Math.pow(t, 3.0) * this.p[6]);
    return this.midX;
  }

  getYfromT(t) {
    this.midY = (Math.pow((1.0 - t), 3.0) * this.p[1]) + (3.0 * Math.pow((1.0 - t), 2.0) * t * this.p[3]) + (3.0 * (1.0 - t) * Math.pow(t, 2.0) * this.p[5]) + (Math.pow(t, 3.0) * this.p[7]);
    return this.midY;
  }

  getPointFromT(t) {
    return createVector(this.getXfromT(t), this.getYfromT(t));
  }

  showAll() {
    stroke(0, 200);
    strokeWeight(2);
    line(this.p[0], this.p[1], this.p[2], this.p[3]);
    line(this.p[4], this.p[5], this.p[6], this.p[7]);
    strokeWeight(5);
    stroke(0, 0, 200);
    point(this.p[4], this.p[5]);
    point(this.p[2], this.p[3]);
    strokeWeight(5);
    stroke(0);
    strokeWeight(2);
  }

  showBezier() {
    bezier(this.p[0], this.p[1], this.p[2], this.p[3], this.p[4], this.p[5], this.p[6], this.p[7]);
  }


  getP0() {
    this.result = createVector(this.p[0], this.p[1]);
    return this.result;
  }

  getP1() {
    this.result = createVector(this.p[2], this.p[3]);
    return this.result;
  }

  getP2() {
    this.result = createVector(this.p[4], this.p[5]);
    return this.result;
  }

  getP3() {
    this.result = createVector(this.p[6], this.p[7]);
    return this.result;
  }

  getVectorFromT(t) {
    return createVector(this.getXfromT(t), this.getYfromT(t));
  }

  splitCurveFromTLeft(splitT) {
    this.p1 = this.getP0();
    this.p2 = this.getP1();
    this.x = this.p1.x + splitT * (this.p2.x - this.p1.x);
    this.y = this.p1.y + splitT * (this.p2.y - this.p1.y);

    this.q0 = createVector(this.x, this.y);

    this.p1 = this.getP1();
    this.p2 = this.getP2();
    this.x = this.p1.x + splitT * (this.p2.x - this.p1.x);
    this.y = this.p1.y + splitT * (this.p2.y - this.p1.y);

    this.q1 = createVector(this.x, this.y);

    this.p1 = this.q0;
    this.p2 = this.q1;
    this.x = this.p1.x + splitT * (this.p2.x - this.p1.x);
    this.y = this.p1.y + splitT * (this.p2.y - this.p1.y);

    this.r0 = createVector(this.x, this.y);
    this.s0 = this.getVectorFromT(splitT);
    this.p0 = this.getP0();

    return new MyBezier(this.p0.x, this.p0.y, this.q0.x, this.q0.y, this.r0.x, this.r0.y, this.s0.x, this.s0.y);
  }

  splitCurveFromTRight(splitT) {
    this.p1 = this.getP2();
    this.p2 = this.getP3();
    this.x = this.p1.x + splitT * (this.p2.x - this.p1.x);
    this.y = this.p1.y + splitT * (this.p2.y - this.p1.y);

    this.q2 = createVector(this.x, this.y);

    this.p1 = this.getP1();
    this.p2 = this.getP2();
    this.x = this.p1.x + this.splitT * (this.p2.x - this.p1.x);
    this.y = this.p1.y + this.splitT * (this.p2.y - this.p1.y);

    this.q1 = createVector(this.x, this.y);

    this.p1 = this.q1;
    this.p2 = this.q2;
    this.x = this.p1.x + splitT * (this.p2.x - this.p1.x);
    this.y = this.p1.y + splitT * (this.p2.y - this.p1.y);

    this.r0 = createVector(this.x, this.y);
    this.s0 = this.getVectorFromT(splitT);
    this.p0 = this.getP3();

    return new MyBezier(this.s0.x, this.s0.y, this.r0.x, this.r0.y, this.q2.x, this.q2.y, this.p0.x, this.p0.y);
  }

  splitMiddle(min, max) {
    this.result = this.splitCurveFromTLeft(max);
    return this.result.splitCurveFromTRight(min);
  }
}
