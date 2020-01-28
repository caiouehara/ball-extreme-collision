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
        console.table(balls)
    },
    n: () => {
        // posX, posY, vx, vy, mass, color
        createBall(random.posX(), random.posY(), random.Vx(), random.Vy(), random.mass());
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
}

function render() {
    if (isRendering) {
        ctx.clearRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawBackground()
        updateBalls()
    }
}

function updateBalls() {
    for (let ball of balls) {
        drawBalls(ball)
        updateCollision(ball)
        drawVectorLine(ball)
        moveAll(ball)
    }
}

function drawBalls(ball) {
    ctx.beginPath();
    ctx.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill()
    ctx.closePath();
}

function drawBackground() {
    ctx.fillStyle = "#999966";
    ctx.fillRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawVectorLine(vector) {
    // mass is relative with size (radius)
    const COEFFICIENT = vector.mass * 0.5;
    ctx.beginPath();
    ctx.moveTo(vector.posX, vector.posY);
    ctx.lineTo(vector.posX + (vector.vx * COEFFICIENT), vector.posY + (vector.vy * COEFFICIENT));
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.closePath();
}

function updateCollision(ball) {
    for (collision in collisions) {
        collisions[collision](ball)
    }
}

function createLoop() {
    window.setInterval(() => {
        loop()
    }, FRAMERATE)
}

function updateTime() {
    time += FRAMERATE / 1000;
}

function createKeyboard() {
    window.addEventListener("keydown", (event) => {
        keyboardListener[event.key] ? keyboardListener[event.key]() : console.log();
    })
}

function createCardianPlane() {
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    ctx.translate(centerX, centerY)
}

function createMouse() {
    window.addEventListener("click", (event) => {
        // spawn bug off grid in y-axis
        const { mouseX, mouseY } = getCursorPosition(canvasElement, event);
        const posX = mouseX - CANVAS_WIDTH / 2;
        const posY = mouseY - CANVAS_HEIGHT / 2;
        createBall(posX, posY, 0, -2, 10, "blue");
        console.log(`spawned ball in (${posX},${posY})`);
    });
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    return { mouseX, mouseY }
}

setup()