var img;
var imgClone;
var mk;
 
function setup() {
    createCanvas(400, 400);
	xSlider = createSlider(0,400,200);
}
function draw() {
	console.log(xSlider.value());
    background(200);
	line(xSlider.value(),0,xSlider.value(),height);
}