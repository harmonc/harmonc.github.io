// favorite rules: 149,182,150,62,118,154,30,42,43,45,60,71,72,86,90,101,102,104,105,118

var Test = function() {
  this.Filename = 'save';
  this.Save = function() {
    save(this.Filename + 'rule' + this.Rule + '.png');
  }
  this.Rule = 110;
  this.Run = run;
  this.Cells = 50;
  this.SpawnPercent = .5;
  this.randomRate = .1;
  this.Color1 = [0, 0, 0];
  this.Color2 = [0, 0, 255];
  this.Style = 'block';
};

function setup() {

  test = new Test();
  var gui = new dat.GUI();
  gui.add(test, 'Filename');
  gui.add(test, 'Save');
  gui.add(test, 'SpawnPercent', 0, 1);
  gui.add(test, 'randomRate', 0, .5);
  gui.add(test, 'Rule', 0, 255).step(1);
  gui.add(test, 'Cells', 10, 500).step(1);
  gui.add(test, 'Run');
  gui.addColor(test, 'Color1');
  gui.addColor(test, 'Color2');
  gui.add(test, 'Style', ['block', 'circle', 'triangle', 'semi-circle']);
}



var run = function run() {
  var arr = [];
  var ruleArr;
  var rule;
  var len = test.Cells;
  noStroke();
  var cnv = createCanvas(window.innerWidth * .9, 1500);
  cnv.parent('sketch');
  background(test.Color2);
  rule = test.Rule;
  ruleBinary = rule.toString(2);
  ruleArr = ruleBinary.split('');
  while (ruleArr.length < 8) {
    ruleArr.unshift('0');
  }
  print(ruleArr);
  for (var i = 0; i < len * 10; i++) {
    if (random(1) > this.SpawnPercent) {
      arr.push(1);
    } else {
      arr.push(0);
    }
    // if(i==len/2){
    //   arr.push(1);
    // }else{
    //   arr.push(0);
    // }
  }
  var w = width;
  for (var i = 0; i < len; i++) {
    if (arr[i + len * 5] == 0) {} else {
      fill(test.Color1);
      for (var num = 0; num < 4; num++) {
        if (test.Style == 'block') {
          rect(i * w / len, 0, w / len, w / len);
        } else if (test.Style == 'circle') {
          ellipse(i * w / len + ((w / len) / 2.0), 0 + (w / len) / 2.0, w / len, w / len);
        } else if (test.Style == 'triangle') {
          triangle(i * w / len, (w / len), i * w / len + (w / len), (w / len), i * w / len + (w / len) / 2.0, 0);
        }else if(test.Style == 'semi-circle'){
          arc(i * w / len + ((w / len) / 2.0), 0 + (w / len) / 2.0, w / len, w / len,0,PI);
        }
      }
    }
  }

  for (var y = w / len; y < height; y += w / len) {
    var buffer = [];
    for (var i = 0; i < len * 10; i++) {
      buffer.push(getRuleNumber(i, arr, ruleArr));
    }
    arr = new Array();
    for (var i = 0; i < buffer.length; i++) {
      arr.push(buffer[i]);
    }
    for (var i = 0; i < len; i++) {
      if (arr[i + len * 5] == 0) {} else {
        fill(test.Color1);
        for (var num = 0; num < 4; num++) {
          if (test.Style == 'block') {
            rect(i * w / len, y, w / len, w / len);
          } else if (test.Style == 'circle') {
            ellipse(i * w / len + ((w / len) / 2.0), y + ((w / len) / 2.0), w / len, w / len);
          } else if (test.Style == 'triangle') {
            triangle(i * w / len, y + (w / len), i * w / len + (w / len), y + (w / len), i * w / len + (w / len) / 2.0, y);
          }else if(test.Style == 'semi-circle'){
            arc(i * w / len + ((w / len) / 2.0), y + ((w / len) / 2.0), w / len, w / len,0,PI);
          }
        }
      }
    }
  }
}

function getRuleNumber(index, prevGen, rules) {
  var getRule = 0;
  if (index > 0) {
    if (prevGen[index - 1] == 1) {
      getRule += 4
    }
  } else {
    if (prevGen[prevGen.length - 1] == 1) {
      getRule += 4
    }
  }
  if (prevGen[index] == 1) {
    getRule += 2;
  }
  if (index < prevGen.length - 1) {
    if (prevGen[index + 1] == 1) {
      getRule += 1;
    }
  } else {
    if (prevGen[0] == 1) {
      getRule += 1;
    }
  }
  var result = parseInt(rules[getRule]);
  if (random(1) < test.randomRate) {
    if (result == 1) {
      result = 0;
    } else {
      result = 1;
    }
  }
  return result;
}
