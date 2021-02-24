function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    generate()
}

function draw() {
    
}

function mousePressed() {
    generate();
}

function generate() {
    colorMode(RGB)
    background(108,174,117)
    fill(135, 206, 235)
    noStroke()
    rect(0, 0, width, height - 100)
}