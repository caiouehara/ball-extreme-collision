const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FRAMERATE = 20;
let time = 0;

const keyboardListener = {
    o: () => {
        console.clear()
        console.table(entity.balls)
    },
    n: () => {
        const randomPosX = Math.random() * (CANVAS_WIDTH - 0) + 0;
        const randomPosY = Math.random() * (CANVAS_HEIGHT - 0) + 0;
        const randomMass = Math.random() * (25 - 5) + 5;
        entity.createBall(randomPosX, randomPosY, randomMass);
    }
}

function setup() {
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;
    createKeyboard()
    createLoop()
}

function loop() {
    render()
    updateTime()
    updateCollision()
}

function render(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground()
    drawBalls()
    entity.moveAll()
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
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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

setup()