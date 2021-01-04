function bezierShape(p,factor) {
  var a = [];
  var pos = [];
  var neg = [];
  
  a.push(angle3(p[0], p[1], p[p.length - 1]));
  for (let i = 1; i < p.length - 1; i++) {
    a.push(angle3(p[i], p[i - 1], p[i + 1]));
  }
  a.push(angle3(p[p.length - 1], p[p.length - 2], p[0]));
  for (let i = 0; i < p.length - 1; i++) {
    let a1 = (PI - a[i]) / 2.0;
    let a2 = angle2(p[i], p[i + 1]) - a1;
    pos.push(a2);
  }
  let n = a.length-1
  let a1 = (PI - a[n]) / 2.0;
  let a2 = angle2(p[n], p[0]) - a1;
  pos.push(a2);
  for(let i = 1; i < a.length; i++){
    let a1 = (PI - a[i]) / 2.0;
    let a2 = angle2(p[i], p[i - 1]) + a1;
    neg.push(a2);
  }
  let b1 = (PI - a[0]) / 2.0;
  let b2 = angle2(p[0], p[p.length-1]) + b1;
  neg.push(b2);
  beginShape();
  vertex(p[0].x,p[0].y);
  for(let i = 0; i < a.length; i++){
    bezierVertex(p[i].x + factor*cos(pos[i]),p[i].y + factor * sin(pos[i]),p[(i+1)%a.length].x + factor*cos(neg[i]),p[(i+1)%a.length].y + factor*sin(neg[i]),p[(i+1)%a.length].x,p[(i+1)%a.length].y);
  }
  endShape();
}

function angle2(p1, p2) {
  return atan2((p2.y - p1.y), (p2.x - p1.x));
}

function angle3(p1, p2, p3) {
  //arccos((P12^2 + P13^2 - P23^2) / (2 * P12 * P13))
  let p12 = d(p1, p2);
  let p13 = d(p1, p3);
  let p23 = d(p2, p3);
  return acos((p12 * p12 + p13 * p13 - p23 * p23) / (2 * p12 * p13))
}

function d(p1, p2) {
  return sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
}