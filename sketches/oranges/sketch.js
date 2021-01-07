function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background("#f9f361");
  for(let i = floor(height/100)+1; i >= -1; i--){
    for(let j = floor(width/100)+1; j >= -1; j--){
      let w = random(200,250)
      if(i%2==0){
        orange(j*200,i*100+random(50),w);
      }else{
        orange(j*200+100,i*100+random(50),w);
      }
    }
  }
  //save("orange.png");
  // orange(300,300,300);
  // let a = -PI/4.0;
  // orange(300+225*cos(a),300+225*sin(a),150);
  // orange(300-(300+225*cos(a)-300),300+225*sin(a),150);
}

function draw(){}

function mousePressed(){
  background("#f9f361");
  for(let i = floor(height/100)+1; i >= -1; i--){
    for(let j = floor(width/100)+1; j >= -1; j--){
      let w = random(200,250)
      if(i%2==0){
        orange(j*200,i*100+random(50),w);
      }else{
        orange(j*200+100,i*100+random(50),w);
      }
    }
  }
}

function orange(x,y,w){
  push();
  translate(x,y);
  rotate(random(PI/3.0));
  scale(w/275.0);
  noStroke();
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 20;
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = 'rgba(0,0,0, 0.5)';
  fill("#c67815");
    let r2 = random(0,5);

  let r1 = r2+random(0,5);
  ellipse(0,0,275+r1,275+r1);
  drawingContext.shadowColor = 'rgba(0,0,0, 0)';
  fill("#daa628");
  ellipse(0,0,260+r2,260+r2);
  fill("#f6f1b5");
  fill(255);
  let r3 = random(0,5);
  ellipse(0,0,235+r3,235+r3);
  let c = color("#daa628");
  let num = floor(random(7,13));
    let l1 = 85+random(-3,3);
    let offset1 = 22.5;
    let angle_1 = TAU/(num*2 + random(1,3));

  for(let i = 0; i < num; i++){
    fill(clamp(red(c)+random(-10,10),0,255),clamp(green(c)+random(-10,10),0,255),blue(c));
    push();
  rotate(i*TAU/num);
  var p = [];
  p.push(createVector(offset1, 0));
  p.push(createVector(offset1+l1*cos(-angle_1),l1*sin(-angle_1)));
      p.push(createVector(offset1+l1*cos(angle_1),l1*sin(angle_1)));
  bezierShape(p,map(num,7,13,15,5));
    pop();
  }
  for(let i = 0; i < random(400,500); i++){
    let a = random(TAU);
    let m = random((235 + r3)/2.0);
    let n = random(m,(235 + r3)/2.0);
    stroke(255,random(15,25));
    strokeWeight(4);
    line(m*cos(a),m*sin(a),n*cos(a),n*sin(a));
    noStroke();
  }
  for(let i = 0; i < random(500,900); i++){
    let a = random(TAU);
    let l = random(260+r2+1,275+r1-1)/2.0;
    if(random(1)>0.5){
      stroke(0,random(50,150));
    }else{
      stroke(255,random(50,150));
    }
    strokeWeight(1);
    point(l*cos(a),l*sin(a));
  }
  pop();
}

function clamp(n,min,max){
  if(n<min){
    return min
  }else if(n>max){
    return max
  }
  return n;
}