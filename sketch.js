var canvas;
var arr = [];
var noiseArr = [];
var sideLength = 50;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style('z-index', -1);
  var num = height/sideLength;
  for(var i = 0; i < num; i++){
    arr.push(width/2);
    noiseArr.push(random(100));
  }
}

function draw() {
  background(15);
  for(var i = 0; i < height; i+=sideLength){
    stroke(255,5);
    line(0,i,width,i);

    if(mouseY<=i+sideLength&&mouseY>i){
      arr[i/sideLength]=mouseX-sideLength/2;
    }else{
      arr[i/sideLength]+=map(noise(noiseArr[i/sideLength]),0,1,-2,2);
      arr[i/sideLength]%=width;
      if(arr[i/sideLength]<-sideLength){
        arr[i/sideLength]=width-sideLength;
      }
      noiseArr[i/sideLength]+=.001;
    }

    noStroke();
    fill(0,0,255,50);
    rect(arr[i/sideLength],i,sideLength,sideLength);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
