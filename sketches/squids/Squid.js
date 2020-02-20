class Squid {
    constructor(x, y, a, scale, seed) {
      this.r1 = random(-20, 20);
      this.r2 = random(-70, 0);
      this.r3 = random(0, 20);
      this.squidColor = color(255+random(-40, 0), 150+random(-40, 40), 150+random(-40, 40));
      this.squidColorDark = color(red(this.squidColor)-30, green(this.squidColor)-30, blue(this.squidColor)-30);
      this.armPointR = random(-15, 15);
      this.armPointR2 = random(-15, 15);
      this.bottomTentacleR1 = random(-47, 5);
      this.bottomTentacleR2 = random(-60, 15);
      this.outerEyeR = random(30, 40);
      this.innerEyeR = random(15, this.outerEyeR-10);
      this.eyeR1 = random(-20, 20);
      this.tentacleVar = random(.1, .2);
      this.x = x;
      this.y = y;
      this.a = a;
      this.scale = scale;
      this.seed = seed;
    }

    update() {
      this.x += cos(a-HALF_PI);
      this.y += sin(a-HALF_PI);
    }


    display() {
      push();
      translate(this.x, this.y);
      scale(this.scale);
      rotate(this.a);
      stroke(0);
      strokeWeight(5);
      //point(0, -175);
      //point(-35, 0);
      //point(35, 0);
      noFill();

      //bezier(0, -175+r2, -50-r1, -100+r2, -40-r3, -50, -35, 0);
      //bezier(0, -175+r2, 50+r1, -100+r2, 40+r3, -50, 35, 0);

      this.squidTopLeft = new MyBezier(0, -175+this.r2, -50-this.r1, -100+this.r2, -40-this.r3, -50, -35, 0);
      this.squidTopRight = new MyBezier(0, -175+this.r2, 50+this.r1, -100+this.r2, 40+this.r3, -50, 35, 0);

      this.LeftTop = this.squidTopLeft.getPointFromT(0);
      this.LeftBottom = this.squidTopLeft.getPointFromT(.75);
      this.leftWing = new MyBezier(this.LeftBottom.x, this.LeftBottom.y, this.LeftBottom.x-50, this.LeftBottom.y-20, this.LeftTop.x-20, this.LeftTop.y+20, this.LeftTop.x, this.LeftTop.y);

      this.RightTop = this.squidTopRight.getPointFromT(0);
      this.RightBottom = this.squidTopRight.getPointFromT(.75);
      this.rightWing = new MyBezier(this.RightBottom.x, this.RightBottom.y, this.RightBottom.x+50, this.RightBottom.y-20, this.RightTop.x+20, this.RightTop.y+20, this.RightTop.x, this.RightTop.y);
      noStroke();

      stroke(0);
      strokeWeight(5);
      this.t = new TentacleSystem(0, 49, HALF_PI, this.squidColor, this.tentacleVar, random(50,100),random(25,50), this.seed);
      this.t.show();

      for (var i = 0; i < 2; i++) {
        if (i==1) {
          stroke(0);
          strokeWeight(5);
        }
        fill(this.squidColorDark);
        this.curr = this.rightWing.getP0();
        beginShape();
        vertex(this.curr.x, this.curr.y);
        this.p = this.rightWing.p;
        bezierVertex(this.p[2], this.p[3], this.p[4], this.p[5], this.p[6], this.p[7]);
        this.p2 = this.leftWing.p;

        bezierVertex(this.p2[4], this.p2[5], this.p2[2], this.p2[3], this.p2[0], this.p2[1]);
        endShape();

        fill(this.squidColor);
        beginShape();
        vertex(-35, 0);
        bezierVertex(-40-this.r3, -50, -50-this.r1, -100+this.r2, 0, -175+this.r2);
        bezierVertex(50+this.r1, -100+this.r2, 40+this.r3, -50, 35, 0);
        endShape();
        noFill();


        fill(this.squidColor);
        noStroke();
        beginShape();
        vertex(-35, 0);
        vertex(35, 0);
        bezierVertex( 35-(40+this.r3-35), 50, 80-this.armPointR, 75+this.armPointR2, 50-this.armPointR, 100+this.armPointR2);
        bezierVertex( 50-this.armPointR, 75+this.armPointR2, 20, 50, 20, 50);
        vertex(-20, 50);
        bezierVertex(-20, 50, -50+this.armPointR, 75+this.armPointR2, -50+this.armPointR, 100+this.armPointR2);
        bezierVertex( -80+this.armPointR, 75+this.armPointR2, -35-(-40-this.r3+35), 50, -35, 0);
        endShape();
        fill(this.squidColor);
      }


      //    beginShape();
      //    vertex(20, 50);
      //    bezierVertex(10, 140, 60, 150, 50+bottomTentacleR1, 225+bottomTentacleR2);
      //    bezierVertex(20, 150, 10, 140, 0, 50);
      //    endShape();
      //    noFill();

      //fill(squidColor);
      //beginShape();
      //vertex(-20, 50);
      //bezierVertex(-10, 140, -60, 150, -50-bottomTentacleR1, 225+bottomTentacleR2);
      //bezierVertex(-20, 150, -10, 140, 0, 50);
      //endShape();
      //noFill();
      stroke(0);
      noFill();
      strokeWeight(5);

      //point(-40-r3, -50);
      //point(-35, 0);
      //point(-35-(-40-r3+35), 50);


      //point(40+r3, -50);
      //point(35, 0);
      //point(35-(40+r3-35), 50);

      //point(50, 100);
      //point(-50, 100);

      //point(80, 75);
      //point(-80, 75);



      //arm outside
      bezier(-35, 0, -35-(-40-this.r3+35), 50, -80+this.armPointR, 75+this.armPointR2, -50+this.armPointR, 100+this.armPointR2);
      bezier(35, 0, 35-(40+this.r3-35), 50, 80-this.armPointR, 75+this.armPointR2, 50-this.armPointR, 100+this.armPointR2);

      //arm inside
      bezier(50-this.armPointR, 100+this.armPointR2, 50-this.armPointR, 75+this.armPointR2, 20, 50, 20, 50);
      bezier(-50+this.armPointR, 100+this.armPointR2, -50+this.armPointR, 75+this.armPointR2, -20, 50, -20, 50 );



      //  point(50, 200);
      //  point(-50, 200);

      //    bezier(20, 50, 10, 140, 60, 150, 50+bottomTentacleR1, 225+bottomTentacleR2);
      //    bezier(-20, 50, -10, 140, -60, 150, -50-bottomTentacleR1, 225+bottomTentacleR2);

      //    bezier(0, 50, -10, 140, -20, 150, -50-bottomTentacleR1, 225+bottomTentacleR2);
      //    bezier(0, 50, 10, 140, 20, 150, 50+bottomTentacleR1, 225+bottomTentacleR2);




      //eye
      noStroke();
      fill(255);

      ellipse(0, this.eyeR1, this.outerEyeR, this.outerEyeR);
      fill(0);
      ellipse(0, this.eyeR1, this.innerEyeR, this.innerEyeR);
      stroke(0);
      strokeWeight(2);
      noFill();
      // arc(0, 10, 45, 40, 0+.6, PI-.6);
      arc(0, -10+this.eyeR1, this.outerEyeR+5, this.outerEyeR, PI+.6, TWO_PI-.6);
      pop();
    }

}
