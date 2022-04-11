float angle;
float lengthShrink = 0.85;
float widthShrink = 0.65;
int x = 1600;
int y = 800;
float branchLength;
float logWidth;

void setup(){
  size(1600, 800);
  //noLoop();
}

void draw(){
  //background(random(255), random(255), random(255));
  background(0);
  if (angle >= PI/5 || branchLength >= x/12 || logWidth >= 50){
      angle = PI/15;
      branchLength = 10;
      logWidth = 0.01;
    } else {  
      branchLength += 0.3;
      logWidth += 0.1;
      angle += PI/3000;
      stroke(random(255), random(255), random(255));    
  }
  translate(x/2, y);
  rotate(PI);
  fill(255);
  branch(branchLength, logWidth);
}

void branch(float len, float logWidth){
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
