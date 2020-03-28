// creators
function createCardianPlane() {
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    ctx.translate(centerX, centerY)
}

function createFrameRateLoop() { // disable
    window.setInterval(() => {
        loop()
    }, FRAMERATE)
}

// draw
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

function drawVectorLine(ob) {
    ctx.beginPath();
    ctx.moveTo(ob.posX, ob.posY);
    ctx.lineTo(ob.posX + (ob.vx * ob.radius), ob.posY + (ob.vy * ob.radius));
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.closePath();
}

// updaters
function updateBalls() {
    for (let ball of balls) {
        drawBalls(ball)
        updateCollision(ball)
        drawVectorLine(ball)
        ball.move()
    }
}

function updateCollision(ob) {
    for (collision in collisions) {
        collisions[collision](ob)
    }
}

function updateTime() { // disable
    time += FRAMERATE / 1000;
}

// utils
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    return { mouseX, mouseY }
}

const eventHandler = {
    keyboardBinds: {
        o: () => {
            console.clear()
            console.table(balls)
        },
    },
    createListeners() {
        window.addEventListener("click", (event) => this.handleMouse(event));
        window.addEventListener("keydown", (event) => this.handleKeyboard(event));
    },
    handleKeyboard(event) {
        this.keyboardBinds[event.key] ? this.keyboardBinds[event.key]() : console.log();
    },
    handleMouse(event) {
        // spawn bug off grid in y-axis
        const { mouseX, mouseY } = this.getCursorPosition(canvasElement, event);
        const posX = mouseX - CANVAS_WIDTH / 2;
        const posY = mouseY - CANVAS_HEIGHT / 2;

        // posX, posY, vx, vy, mass, radius, color
        createBall(posX, posY, random.vx(), random.vy(), random.mass(), 10, "blue");

        console.log(`spawned ball in (${posX},${posY})`);
    },
    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        return { mouseX, mouseY }
    },
}
