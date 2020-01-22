const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FRAMERATE = 20;
let time = 0;
let isRendering = true;

const keyboardListener = {
    o: () => {
        console.clear()
        console.table(entity.balls)
    },
    n: () => {
        // posX, posY, vx, vy, mass, color
        // problem when radius spawn inside collision area (more than 400 or less than -400)
        const randomPosX = Math.random() * ( CANVAS_WIDTH/2 - (-CANVAS_WIDTH/2) ) + (-CANVAS_WIDTH/2);
        const randomPosY = Math.random() * ( CANVAS_HEIGHT/2 - (-CANVAS_HEIGHT/2) ) + (-CANVAS_HEIGHT/2);
        const randomVx = Math.random() * (10 - 1) + 1;
        const randomVy = Math.random() * (10 - 1) + 1;
        const randomMass = Math.random() * (25 - 5) + 5;
        entity.createBall(randomPosX, randomPosY, randomVx, randomVy, randomMass);
    }
}

function setup() {
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;
    createCardianPlane();
    createKeyboard()
    createMouse()
    createLoop()
}

function loop() {
    render()
    updateTime()
    updateCollision()
}

function render(){
    if(isRendering){
        ctx.clearRect(-CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawBackground()
        drawBalls()
        entity.moveAll()
    }
}

function drawBalls() {
    for (let ball of entity.balls) {
        ctx.beginPath();
        ctx.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill()
        ctx.closePath();
        drawVectorLine(ball)
    }
}

function drawBackground(){
    ctx.fillStyle = "#999966";
    ctx.fillRect(-CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawVectorLine(vector){
        // mass is relative with size (radius)
        const COEFFICIENT = vector.mass * 0.5;
        ctx.beginPath();
        ctx.moveTo(vector.posX, vector.posY);
        ctx.lineTo(vector.posX + (vector.vx * COEFFICIENT), vector.posY + (vector.vy * COEFFICIENT));
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        ctx.closePath();
}

function updateCollision(){
    for(let ball of entity.balls){
        for(collision in collisions){   
            collisions[collision](ball)
        }
    }
}

function createLoop(){
    window.setInterval(()=>{
        loop()
    }, FRAMERATE)
}

function updateTime(){
    time += FRAMERATE/1000;
}

function createKeyboard(){
    window.addEventListener("keydown", (event) => { 
        keyboardListener[event.key] ? keyboardListener[event.key]() : console.log();
    })
}

function createCardianPlane(){
    const centerX = CANVAS_WIDTH/2;
    const centerY = CANVAS_HEIGHT/2;
    ctx.translate(centerX, centerY)
}

function createMouse(){
    window.addEventListener("click", (event) => { 
        // spawn bug off grid in y-axis
        const {mouseX, mouseY} = getCursorPosition(canvasElement, event);
        const posX = mouseX - CANVAS_WIDTH/2;
        const posY = mouseY - CANVAS_HEIGHT/2;
        entity.createBall(posX, posY, 0, -2, 10, "blue");
        console.log(`spawned ball in (${posX},${posY})`);
    });
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    return {mouseX, mouseY}
}

setup()