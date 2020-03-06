// state
let balls = [];

const random = {
    // problem when radius spawn inside collision area (more than 400 or less than -400)
    posX: () => Math.random() * (CANVAS_WIDTH / 2 - (-CANVAS_WIDTH / 2)) + (-CANVAS_WIDTH / 2),
    posY: () => Math.random() * (CANVAS_HEIGHT / 2 - (-CANVAS_HEIGHT / 2)) + (-CANVAS_HEIGHT / 2),
    vx: () => Math.random() * (2 - -2) + -2,
    vy: () => Math.random() * (2 - -2) + -2,
    radius: () => Math.random() * (50 - 5) + 5,
    mass: () => Math.random() * (25 - 5) + 5,
}

const collisions = {
    wall: function (collider) {
        if (collider.posX + collider.radius > CANVAS_WIDTH / 2 || collider.posX - collider.radius < -CANVAS_WIDTH / 2) {
            collider.applyVx(-collider.vx)
        }
        if (collider.posY + collider.radius > CANVAS_HEIGHT / 2 || collider.posY - collider.radius < -CANVAS_WIDTH / 2) {
            collider.applyVy(-collider.vy)
        }
    },
    ball: function (collider) {
        for (let ball of balls) {
            if (ball === collider) continue;
            const distance = calculateDistance(ball, collider)

            if (distance < ball.radius + collider.radius) {
                // weird collision (maybe the delay for calculate)
                const { newVx1, newVy1, newVx2, newVy2 } = calculateBidimensionalDynamic(ball, collider);

                ball.applyVx(newVx1);
                ball.applyVy(newVy1);

                collider.applyVx(newVx2);
                collider.applyVy(newVy2);

            }
        }
    }
}

class Vector {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;

        if(!vx) this.vx = random.vx();
        if(!vy) this.vy = random.vy();
    }
    speed() {
        return calculatePitagoras(this.vx, this.vy);
    }
    angle() {
        return Math.atan2(this.vy, this.vx);
    }
    applyVx(number) {
        this.vx = number;
    }
    applyVy(number) {
        this.vy = number;
    }
}

class Ball extends Vector {
    constructor(posX, posY, vx, vy, mass, radius, color) {
        super(vx, vy)
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.mass = mass;
        this.color = color;

        if(!posX) this.posX = random.posX();
        if(!posY) this.posY = random.posY();
        if(!radius) this.radius = random.radius();
        if(!mass) this.mass = random.mass();
        if(!color) this.color = "white";
    }
    move() {
        this.posX += this.vx;
        this.posY += this.vy;
    }
}

function createBall(posX, posY, vx, vy, mass, radius, color) {
    balls.push(new Ball(posX, posY, vx, vy, mass, radius, color))
};