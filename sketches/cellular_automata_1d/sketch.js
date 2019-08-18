var arr = [];
var ruleArr;
var rule;
var len = 100;

function setup() {
  noStroke();
  createCanvas(window.innerWidth, window.innerHeight);
  background(0,0,255);
  rule = floor(random(256));
  ruleBinary = rule.toString(2);
  ruleArr = ruleBinary.split('');
  while (ruleArr.length < 8) {
    ruleArr.unshift('0');
  }
  print(ruleArr);
  for (var i = 0; i < len; i++) {
    arr.push(floor(random(2)));
    // if(i==len/2){
    //   arr.push(1);
    // }else{
    //   arr.push(0);
    // }
  }
  for (var i = 0; i < len; i++) {
    if (arr[i] == 0) {
    } else {
      fill(0);
      rect(i * width / len, 0, width / len, width / len);
      rect(i * width / len, 0, width / len, width / len);
      rect(i * width / len, 0, width / len, width / len);
      rect(i * width / len, 0, width / len, width / len);
    }
  }

  for (var y = width / len; y < height; y += width / len) {
    var buffer = [];
    for (var i = 0; i < len; i++) {
      buffer.push(getRuleNumber(i, arr, ruleArr));
    }
    arr = new Array();
    for(var i = 0; i < buffer.length; i++){
      arr.push(buffer[i]);
    }
    for (var i = 0; i < len; i++) {
      if (arr[i] == 0) {
      } else {
        fill(0);
        rect(i * width / len, y, width / len, width / len);
        rect(i * width / len, y, width / len, width / len);
        rect(i * width / len, y, width / len, width / len);
        rect(i * width / len, y, width / len, width / len);
      }
    }
  }

  save('myCanvas.png');
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

