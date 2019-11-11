var points = [];
var order;
var temp;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(52);
  if (order != null && order.length > 1) {
    simulatedAnnealing();
  }
  drawPath();
  drawPoints();
  displayText();
}

function displayText() {
  fill(255);
  textSize(16);
  strokeWeight(.5);
  if (order != null && order.length > 1) {
    var pathSize = calculatePath(order);
    text("Length: " + pathSize, windowWidth / 2.0, 30);
  }else{
    text("Length: N/A",windowWidth/2.0,30);
  }
}

function simulatedAnnealing() {
  var prevOrder = order;
  order = findNewOrder(order);
  if (Math.pow(Math.E, (-1 * (calculatePath(order) - calculatePath(prevOrder))) / temp) > random(1)) {

  } else {
    order = prevOrder;
  }
  temp *= .99;
}

function findNewOrder(arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }
  var r1 = int(random(arr.length));
  var r2 = int(random(arr.length));
  while (r2 == r1) {
    r2 = int(random(arr.length));
  }
  var temp = result[r1];
  result[r1] = result[r2];
  result[r2] = temp;
  return result;
}

function calculatePath(orders) {
  var sum = 0;
  for (var i = 0; i < orders.length; i++) {
    var p1 = points[orders[i]];
    var p2 = points[orders[(i + 1) % orders.length]];
    sum += dist(p1.x, p1.y, p2.x, p2.y);
  }
  return sum;
}

function setOrder() {
  order = [];
  for (var i = 0; i < points.length; i++) {
    order.push(i);
  }
}

function drawPoints() {
  stroke(255);
  strokeWeight(5);
  points.forEach(function(p) {
    point(p.x, p.y);
  })
}

function drawPath() {
  if (order != null) {
    strokeWeight(2);
    stroke(0, 0, 255);
    var start = points[order[0]];
    var prev = start;
    for (var i = 1; i < points.length; i++) {
      var curr = points[order[i]];
      line(prev.x, prev.y, curr.x, curr.y);
      prev = curr;
    }
    line(prev.x, prev.y, start.x, start.y);
  }
}

function mousePressed() {
  points.push(createVector(mouseX, mouseY));
  setOrder();
  temp = 100;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
