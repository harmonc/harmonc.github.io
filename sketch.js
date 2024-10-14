// Made for Knotwork 🪢 #WCCChallenge
//
// Hello Raph and chat!
// A little basic but like the results.
// could be cool to do wave function collapse
//

let palettes = [
    ['#e8e8e812','#3994d0']
	//['#1D69A4AA','#1E1A1D']//'['#211C1F','#1E1A1D']
]

let flip, palette, thickness, cnvs
function setup() {


    var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

	flip = 0//random(1)>0.5
	//palette = palettes[palettes.length-1]
	palette = palettes[int(random(palettes.length))]
    createCanvas(windowWidth, max(_docHeight+100,windowHeight));
    let cnvs = document.getElementsByTagName('canvas')[0];
    cnvs.style.zIndex = '-1';
    cnvs.style.position = 'absolute'; // Ensure it's positioned correctly
    cnvs.style.top = '0';
    cnvs.style.left = '0';

    // Ensure the canvas resizes with the window
    window.addEventListener('resize', () => {
        var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
        resizeCanvas(windowWidth, max(_docHeight+100,windowHeight));
        renderGrid()
    }); 

    renderGrid()
}

function renderGrid(){
	let gridSize = 100
	thickness = 25
	if(flip){
			background(palette[0]);
	}else{
			background(palette[1]);
	}
	
	for(let i = 0; i < width/gridSize; i++){
		for(let j = 0; j < height/gridSize; j++){
			knot(i*gridSize,j*gridSize,gridSize,gridSize)
		}
	}
}

// function draw() {
// 	timer--
// 	if(timer < 0){
// 		setup()
// 	}

// }

// function mousePressed(){
// 	setup()
// }

function knot(x,y,l){
	push()
	translate(x+l/2,y+l/2)
	rotate(int(noise(x,y)*4)*HALF_PI)
	if(flip){
		stroke(palette[1])
	}else{
		stroke(palette[0])
	}
	strokeCap(SQUARE)
	strokeWeight(thickness+1)
		switch(1){  //int(noise(x+width,y)*2)
			case 0:
			line(-l/2,0,l/2,0)
			line(0,-l/2,0,-thickness/2-4)
			line(0,l/2,0,thickness/2+4)

            line(-l/2,0,l/2,0)
			line(0,-l/2,0,-thickness/2-4)
			line(0,l/2,0,thickness/2+4)
				break;
			case 1:
				noFill()

				if(flip){
					stroke(palette[1])
				}else{
					stroke(palette[0])
				}
				arc(-l/2,-l/2,l,l,0,PI/2)

                if(flip){
					stroke(palette[0])
				}else{
					stroke(palette[1])
				}
				strokeWeight(thickness+8)
				arc(l/2,l/2,l,l,PI,3*PI/2)
				strokeWeight(thickness+1)
				if(flip){
					stroke(palette[1])
				}else{
					stroke(palette[0])
				}
				arc(l/2,l/2,l,l,PI,3*PI/2)

				break;
	}
	pop()
}