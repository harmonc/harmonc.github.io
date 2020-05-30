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
  this.randomRate = 0;
  this.Background = [0, 0, 0];
  this.Foreground = [0, 0, 255];
  this.Foregound_2 = [0,0,255]
  this.ToggleForeground = false;
  this.Width = window.innerWidth;
  this.Height = window.innerHeight;
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
  gui.add(test, 'ToggleForeground');
  gui.addColor(test, 'Foreground');
  gui.addColor(test, 'Background');
  gui.add(test, 'Style', ['block', 'circle', 'triangle', 'semi-circle', 'right-triangle-1', 'right-triangle-2', 'right-triangle-3',
    'right-triangle-4', 'diagonal', 'horizontal', 'vertical', 'block-outline', 't-shape', 'squiggle'
  ]);
  gui.add(test, 'Width', 100, 5000);
  gui.add(test, 'Height', 100, 5000);
  gui.add(test, 'Run');
}



var run = function run() {
  var arr = [];
  var ruleArr;
  var rule;
  var len = test.Cells;
  noStroke();
  var cnv = createCanvas(test.Width, test.Height);
  cnv.parent('sketch');
  background(test.Background);
  rule = test.Rule;
  ruleBinary = rule.toString(2);
  ruleArr = ruleBinary.split('');
  while (ruleArr.length < 8) {
    ruleArr.unshift('0');
  }
  for(var i = 0; i < ruleArr.length; i++){
    if(ruleArr[i]=='0'){
      ruleArr[i] = '1';
    }else{
      ruleArr[i] = '0';
    }
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
  for (var y = 0; y < height; y += w / len) {
    var buffer = [];
    for (var i = 0; i < len * 10; i++) {
      buffer.push(getRuleNumber(i, arr, ruleArr));
    }
    arr = new Array();
    for (var i = 0; i < buffer.length; i++) {
      arr.push(buffer[i]);
    }
    for (var i = 0; i < len; i++) {
      if (arr[i + len * 5] == (test.ToggleForeground) ? 0 : 1) {
		  if(test.Style == 'squiggle'){
			  stroke(test.Foreground);
			  noFill()
			  strokeWeight(2)
			  arc(i * w / len+ ((w / len) / 2.0), y, w / len, w / len,0,PI)
		  }
	  } else {
        for (var num = 0; num < 4; num++) {
          noStroke();
          fill(test.Foreground);
          if (test.Style == 'block') {
            rect(i * w / len, y, w / len, w / len);
          } else if (test.Style == 'block-outline') {
            stroke(test.Foreground);
            noFill();
            rect(i * w / len, y, w / len, w / len);
          } else if (test.Style == 'circle') {
            ellipse(i * w / len + ((w / len) / 2.0), y + ((w / len) / 2.0), w / len, w / len);
          } else if (test.Style == 'triangle') {
            triangle(i * w / len, y + (w / len), i * w / len + (w / len), y + (w / len), i * w / len + (w / len) / 2.0, y);
          } else if (test.Style == 'semi-circle') {
            arc(i * w / len + ((w / len) / 2.0), y + ((w / len) / 2.0), w / len, w / len, 0, PI);
          } else if (test.Style == 'right-triangle-1') {
            triangle(i * w / len, y + (w / len), i * w / len + (w / len), y + (w / len), i * w / len, y);
          } else if (test.Style == 'right-triangle-2') {
            triangle(i * w / len, y + (w / len), i * w / len + (w / len), y, i * w / len, y);
          } else if (test.Style == 'right-triangle-3') {
            triangle(i * w / len + (w / len), y + (w / len), i * w / len + (w / len), y, i * w / len, y);
          } else if (test.Style == 'right-triangle-4') {
            triangle(i * w / len + (w / len), y + (w / len), i * w / len + (w / len), y, i * w / len, y + (w / len));
          } else if (test.Style == 'diagonal') {
            stroke(test.Foreground);
            line(i * w / len, y, i * w / len + w / len, y + w / len);
          } else if (test.Style == 't-shape') {
            stroke(test.Foreground);
            line(i * w / len, y, i * w / len + w / len, y);
            line(i * w / len + w / len / 2.0, y, i * w / len + w / len / 2.0, y + w / len);
          } else if (test.Style == 'horizontal') {
            stroke(test.Foreground);
            line(i * w / len, y+w/len/2.0, i * w / len + w / len, y+w/len/2.0);
		  }	else if(test.Style == 'vertical'){
			stroke(test.Foreground)
			line(i* w / len+w/len/2.0, y, i* w / len+w/len/2.0 , y + w / len)
		  } else if(test.Style == 'squiggle'){
			noFill()
			stroke(test.Foreground);
			strokeWeight(2)
			arc(i * w / len+ ((w / len) / 2.0), y, w / len, w / len,PI,TWO_PI)
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
