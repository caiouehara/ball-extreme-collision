const draw = {
    ball(ob) {
        ctx.beginPath();
        ctx.arc(ob.posX, ob.posY, ob.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ob.color;
        ctx.fill()
    },
    background(){
        ctx.fillStyle = "#999966";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    },
    vectorLine(ob){
        ctx.beginPath();
        ctx.moveTo(ob.posX, ob.posY);
        ctx.lineTo(ob.posX + (ob.vx * ob.radius), ob.posY + (ob.vy * ob.radius));
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
    }
}

const eventHandler = {
    keyboardBinds: {
        o: () => {
            console.clear()
            console.table(state.balls)
        },
        t: ()=>{
            console.log([state.time.fps, state.time.elapsed])
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
        const { mouseX, mouseY } = this.getCursorPosition(canvasElement, event);

        // posX, posY, vx, vy, mass, radius, color
        createBall(mouseX, mouseY, random.vx(), random.vy(), random.mass(), 10, "blue");

        console.log(`spawned ball in (${mouseX},${mouseY})`);
    },
    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        return { mouseX, mouseY }
    },
}
