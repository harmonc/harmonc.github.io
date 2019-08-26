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
  this.Color1 = [0, 0, 0];
  this.Color2 = [0, 0, 255];
};

function setup() {

  test = new Test();
  var gui = new dat.GUI();
  gui.add(test, 'Filename');
  gui.add(test, 'Save');
  gui.add(test, 'SpawnPercent', 0, 1);
  gui.add(test, 'Rule', 0, 255).step(1);
  gui.add(test, 'Cells', 10, 500).step(1);
  gui.add(test, 'Run');
  gui.addColor(test, 'Color1');
  gui.addColor(test, 'Color2');
}



var run = function run() {
  var arr = [];
  var ruleArr;
  var rule;
  var len = test.Cells;
  noStroke();
  var cnv = createCanvas(window.innerWidth * .9, 1500);
  cnv.parent('sketch');
  background(test.Color2[0], test.Color2[1], test.Color2[2]);
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
      fill(test.Color1[0], test.Color1[1], test.Color1[2]);
      for (var num = 0; num < 1; num++) {
        ellipse(i * w / len, y, (w / len) * .9, (w / len) * .9);
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
        fill(test.Color1[0], test.Color1[1], test.Color1[2]);
        for (var num = 0; num < 1; num++) {
          ellipse(i * w / len, y, (w / len) * .9, (w / len) * .9);
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
  return parseInt(rules[getRule]);
}