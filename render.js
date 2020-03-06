const canvasElement = document.getElementById("canvas");
const ctx = canvasElement.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FRAMERATE = 20;
let time = 0;
let isRendering = true;

const keyboardBinds = {
    o: () => {
        console.clear()
        console.table(balls)
    },
}

// main functions
function setup() {
    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;

    createListeners()
    createCardianPlane();
    
    // createFrameRateLoop()
    loop()
}

function loop() {
    render()
    // updateTime()
     
    requestAnimationFrame(loop)
}

function render() {
    if (isRendering) {
        ctx.clearRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawBackground()
        updateBalls()
    }
}

//first call
setup()