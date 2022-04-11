var angle = 0;
var lengthShrink = 0.85;
var widthShrink = 0.65;
var x = 800;
var y = 400;
var branchLength = 0;
var logWidth = 0;

function setup(){
  createCanvas(800, 400);
}

function draw(){
  background(135, 206, 235);
  if (angle >= PI/4 || branchLength >= y/6 || logWidth >= y/8){
      angle = PI/15;
      branchLength = 10;
      logWidth = 0.01;
    } else {  
      branchLength += 0.3;
      logWidth += 0.1;
      angle += PI/3000;
      stroke(255,255,255);    
  }
  translate(x/2, y);
  rotate(PI);
  fill(255);
  branch(branchLength, logWidth);
}

function branch(len, logWidth){
  strokeWeight(logWidth);
  line(0, 0, 0, len);
  if (len > 10){
    translate(0, len);
    push();
    rotate(angle);
    branch(len * lengthShrink, logWidth * widthShrink);
    pop();
    push();
    rotate(-angle);
    branch(len * lengthShrink, logWidth * widthShrink);
    pop();
  }
}
