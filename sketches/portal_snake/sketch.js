var s;
var snake_size;
var grid_count = 15;

var xPos = 7;
var yPos = 7;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(12);
  setGrid();
}

function draw(){
    background(12);
    noStroke();
    for(var i = 0; i < grid_count; i++){
      for(var j = 0; j < grid_count; j++){
        if((i%2==0)?(j%2==0):(j%2==1)){
          fill(75);
        }else{
          fill(100);
        }
        rect(windowWidth/2-s/2 + snake_size*j,windowHeight/2 - s/2+snake_size*i,snake_size,snake_size);
      }
    }
    fill(0,0,255);
    rect(windowWidth/2-s/2 + snake_size*xPos,windowHeight/2 - s/2+snake_size*yPos,snake_size,snake_size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setGrid();
}

function setGrid(){
  if(windowWidth<windowHeight){
    s = windowWidth;
  }else{
    s = windowHeight;
  }
  snake_size = s/grid_count;
}
