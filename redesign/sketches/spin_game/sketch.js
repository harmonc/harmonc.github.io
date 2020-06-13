var row1, col1, row2, col2;
var clicked;
var gameScale = .75;
class Tile {
  constructor(num, rightSide) {
    this.num = num;
    this.rightSide = rightSide;
    this.selected = false;
  }

  select() {
    this.selected = true;
  }

  unselect() {
    this.selected = false;
  }

  flip() {
    this.rightSide = !this.rightSide;
  }
}

var tile = [
  [new Tile(1, true), new Tile(2, true), new Tile(3, true)],
  [new Tile(4, true), new Tile(5, true), new Tile(6, true)],
  [new Tile(7, true), new Tile(8, true), new Tile(9, true)]
];

function setup() {
  var w = min(window.innerWidth,window.innerHeight);
  var cnv = createCanvas(w*gameScale,w*gameScale);
  cnv.parent('sketch');
  background(12);
  textAlign(CENTER, CENTER);
  textSize(50);
}

function draw() {
  background(12);
  var l = width / 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      push();
      translate(j * l + l / 2, i * l + l / 2)
      var col = floor(map(mouseX, 0, width, 0, 3));
      var row = floor(map(mouseY, 0, width, 0, 3));

      fill(0);
      strokeWeight(10);
      if (tile[i][j].num <= 3) {
        stroke(0, 150, 0);
      } else if (tile[i][j].num <= 6) {
        stroke(0, 0, 150);
      } else {
        stroke(150, 0, 0);
      }


      rect(-4 / 10 * l, -4 / 10 * l, 8 / 10 * l, 8 / 10 * l, 2 / 10 * l);

      noStroke();

      if (i >= row1 && j >= col1 && i <= row && j <= col) {
        tile[i][j].select();
      } else {
        tile[i][j].unselect();
      }

      if (tile[i][j].selected && clicked) {
        noFill();
        stroke(0,150);
        strokeWeight(10);
        rect(-4 / 10 * l, -4 / 10 * l, 8 / 10 * l, 8 / 10 * l, 2 / 10 * l);
      }


      stroke(255);
      strokeWeight(1);
      if (!tile[i][j].rightSide) {
        rotate(PI);
      }
      line(-3 / 10 * l, 2 / 10 * l, 3 / 10 * l, 2 / 10 * l);
      fill(255);
      text('' + tile[i][j].num, 0, 0);
      pop();
    }
  }
}

function mousePressed() {
  clicked = true;
  col1 = floor(map(mouseX, 0, width, 0, 3));
  row1 = floor(map(mouseY, 0, width, 0, 3));
}

function mouseReleased() {
  clicked = false;
  var result = [];
  for (var i = 0; i < 3; i++) {
    var row = []
    for (var j = 0; j < 3; j++) {

      if (tile[i][j].selected) {
        tile[i][j].flip();
        tile[i][j].unselect();
        row.push(tile[i][j]);
      }
    }
    if (row.length > 0) {
      result.push(row);
    }

  }
  result = spin(result);
  for (var i = result.length - 1; i >= 0; i--) {
    for (var j = result[0].length - 1; j >= 0; j--) {
      tile[i + row1][j + col1] = result[i][j];
    }
  }
}

function swap(position1, position2) {
  if (position1 >= 1 && position1 <= 9 && position2 >= 1 && position2 <= 9) {
    var temp = tile[floor((position1 - 1) / 3)][(position1-1)%3].num;
    tile[floor((position1 - 1) / 3)][(position1-1)%3].num = tile[floor((position2 - 1) / 3)][(position2-1)%3].num;
    tile[floor((position2 - 1) / 3)][(position2-1)%3].num = temp;
  }
}

function spin(arr) {
  var temp = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    var row = [];
    for (var j = arr[0].length - 1; j >= 0; j--) {
      row.push(arr[i][j]);
    }
    temp.push(row);
  }
  return temp;
}

function randomize(){
  for(var i = 0; i < random(50,100); i++){
    swap(floor(random(1,10)),floor(random(1,10)));
    tile[floor(random(3))][floor(random(3))].flip();
  }
}

function windowResized() {
  var w = min(window.innerWidth,window.innerHeight);
  resizeCanvas(w*gameScale,w*gameScale);
}
