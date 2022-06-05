var balls = [];
var holes = [];
var selected;
var queue;
var table;
var floor;
var tableSizeMult = 0.7;
var queuePic;

function preload() {
    table = loadImage('img.jpg');
    //floor = loadImage('marmor.jpg');
    queuePic = loadImage('billardQ.png');
}

function setup() {
    createCanvas(700, 700);
    frameRate(120);
    imageMode(CENTER);
    for (var i = 0; i < 5; i++) {
        balls.push(new Ball(random(width / 2 - width / 2 * tableSizeMult * 0.87, width / 2 + width / 2 * tableSizeMult * 0.87), random(height / 2 - height / 2 * 299 / 543 * tableSizeMult * 0.75, height / 2 + height / 2 * 299 / 543 * tableSizeMult * 0.75)));
    }
    holes.push(new Hole(width / 2, height / 2 - height / 2 * 299 / 543 * tableSizeMult * 0.85));
    holes.push(new Hole(width / 2, height / 2 + height / 2 * 299 / 543 * tableSizeMult * 0.85));
    holes.push(new Hole(width / 2 - width / 2 * tableSizeMult * 0.9, height / 2 - height / 2 * 299 / 543 * tableSizeMult * 0.82));
    holes.push(new Hole(width / 2 + width / 2 * tableSizeMult * 0.9, height / 2 + height / 2 * 299 / 543 * tableSizeMult * 0.82));
    holes.push(new Hole(width / 2 + width / 2 * tableSizeMult * 0.9, height / 2 - height / 2 * 299 / 543 * tableSizeMult * 0.82));
    holes.push(new Hole(width / 2 - width / 2 * tableSizeMult * 0.9, height / 2 + height / 2 * 299 / 543 * tableSizeMult * 0.82));
}

function draw() {
    background(135, 206, 235);
    image(table, width * 0.5, height * 0.5, width * tableSizeMult, width * 299 / 543 * tableSizeMult);
    checkCollisions();
    for (let i in balls) {
        balls[i].update();
        balls[i].display();
    }
    if (selected != null && queue != null) {
        queue.update();
        queue.display();
    }

/*  for (let i in holes){
            holes[i].display();
    }
*/
}

function mouseClicked() {
    if (selected != null) {
        var mouse = createVector(mouseX, mouseY);
        var force = selected.position.copy();
        force.sub(mouse);
        force.mult(0.1);
        selected.applyForce(force);
        selected.color = 255;
        selected = null;
    } else {
        for (let i in balls) {
            if (dist(mouseX, mouseY, balls[i].position.x, balls[i].position.y) <= balls[i].radius) {
                selected = balls[i];
                queue = new Queue(selected.position);
            }
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < balls.length; i++) {
        var b1 = balls[i];
        for (let j in holes) {
            let d = dist(holes[j].position.x, holes[j].position.y, b1.position.x, b1.position.y);
            if (d <= holes[j].radius) {
                b1.captured = true;
                balls.splice(i, 1);
            }
        }
        for (let j in balls) {
            var b2 = balls[j];
            force = b1.position.copy();
            force.sub(b2.position);
            if (force.mag() < b1.radius + b2.radius) {
                force.mult(b1.velocity.mag() * 0.01);
                b1.applyForce(force);
                b2.applyForce(force.mult(-1));
            }
        }
        if (b1.position.x - b1.radius < width / 2 - width / 2 * tableSizeMult * 0.87 || b1.position.x + b1.radius > width / 2 + width / 2 * tableSizeMult * 0.87) {
            b1.velocity.x *= -1;
            b1.colliding = true;
        }
        if (b1.position.y - b1.radius < height / 2 - height / 2 * 299 / 543 * tableSizeMult * 0.75 || b1.position.y + b1.radius > height / 2 + height / 2 * 299 / 543 * tableSizeMult * 0.75) {
            b1.velocity.y *= -1;
            b1.colliding = true;
        }
    }
}

class Queue {
    constructor(pos) {
        this.pos = pos;
        this.mouse = createVector(mouseX, mouseY);
    }

    update() {
        
        this.mouse.set(mouseX, mouseY);
        this.mouse.sub(this.pos);
        this.mouse.normalize();
        this.mouse.mult(180);
    
    }

    display() {
       push()
       translate(this.pos.x,this.pos.y)
       translate(this.mouse.x, this.mouse.y)
       rotate(this.mouse.heading()-PI/2)
       image(queuePic, 0, 0, 100, 300)
       pop()
    }
}


class Ball {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.radius = width * 0.01;
        this.color = 255;
        this.captured = false;
        this.colliding = false;
    }

    applyForce(force) {
        this.velocity.add(force);
    }

    update() {
        this.position.add(this.velocity);
        if (!this.colliding) {
            this.velocity.mult(0.985);
        } else {
            this.colliding = false;
        }
    }

    display() {
        fill(this.color);
        stroke(255);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }
}

class Hole {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.radius = width * 0.04;
    }
    display(){
        fill(0);
        circle(this.position.x,this.position.y,this.radius);
    }
}