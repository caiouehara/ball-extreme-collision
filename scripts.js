const DEFAULT_VALUES = {
    COLOR: "white",
    MASS_COEFFICIENT: 0.5,
}

const random = {
    // problem when radius spawn inside collision area (more than 400 or less than -400)
    posX: () => Math.random() * (CANVAS_WIDTH / 2 - (-CANVAS_WIDTH / 2)) + (-CANVAS_WIDTH / 2),
    posY: () => Math.random() * (CANVAS_HEIGHT / 2 - (-CANVAS_HEIGHT / 2)) + (-CANVAS_HEIGHT / 2),
    Vx: () => Math.random() * (10 - 1) + 1,
    Vy: () => Math.random() * (10 - 1) + 1,
    mass: () => Math.random() * (25 - 5) + 5,
}

const entity = {
    balls: [],

    createBall(posX, posY, vx, vy, mass, color) {
        this.balls.push(new Ball(posX, posY, vx, vy, mass, color))
    },

    moveAll() {
        for (let ball of this.balls) {
            ball.move()
        }
    }
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
        for (let ball of entity.balls) {
            if (ball === collider) continue;

            const dx = Math.abs(ball.posX - collider.posX);
            const dy = Math.abs(ball.posY - collider.posY);
            const distance = calculatePitagoras(dx, dy);

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
    constructor(posX, posY, vx, vy, mass, color) {
        super(vx, vy)
        this.posX = posX;
        this.posY = posY;
        this.radius = mass / DEFAULT_VALUES.MASS_COEFFICIENT;
        this.mass = mass;
        color ? this.color = color : this.color = DEFAULT_VALUES.COLOR;
    }
    move() {
        this.posX += this.vx;
        this.posY += this.vy;
    }
}

// posX, posY, vx, vy, mass, color
// entity.createBall(0, 200, 0, -2, 50, "yellow");
// entity.createBall(0, -200, 0, 1, 50, "black");