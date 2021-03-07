function setup(){
    createCanvas(innerWidth,innerHeight)
    background(245)
    translate(canvas.width/2.0, canvas.height/2.0)
        strokeWeight(2)


    l = min(canvas.width/19.0,canvas.height/19.0)
    stroke(0)
    for(let i = -9; i<= 9; i++){
        line(i*l,-9*l,i*l,9*l)
        line(-9*l,i*l,9*l,i*l)
    }
        stroke(75)
    strokeWeight(4)
    for(let i = -9; i<= 9; i++){
        for(let j = -9; j <= 9; j++){
            point(j*l,i*l)
        }
    }
    
    stroke(0)
        point(0,0)

}

function draw(){
    
}