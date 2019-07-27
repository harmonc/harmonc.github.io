var img;
var imgClone;
var mk;
 
function setup() {
    createCanvas(400, 400);
	var inp = createInput('');
	inp.input(myInputEvent);
    xSlider = createSlider(0,400,200);
}
function draw() {
    background(255);
	line(xSlider.value(),0,xSlider.value(),height);
	rect(xSlider.value(),height/2,50,50);
}

function myInputEvent(){
	console.log('you are typing: ',parseInt(this.value())+1);
}