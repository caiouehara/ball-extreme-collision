const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// main functions
function setup() {
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;

    eventHandler.createListeners()

    state.time.start = Date.now();

    loop()
}

function loop() {
    requestAnimationFrame(loop);
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    draw.background();

    time();

    update();
}

function time(){
    t = state.time;
    t.elapsed = (Date.now() - t.start)/1000;
    t.fps = t.frameCount/t.elapsed;
    t.frameCount++;
}

function update(){
    state.balls.map((ball) => {
        draw.ball(ball)
        draw.vectorLine(ball)
        
        collisions.wall(ball)
        collisions.ball(ball)

        ball.move()
    });
}

//first call
setup()