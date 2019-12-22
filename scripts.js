const DEFAULT_VALUES = {
    VX: 5,
    COLOR: "red",
    MASS_COEFFICIENT: 0.5,
}

const entity = {
    balls: [],

    createBall(posX, posY, mass, color) {
        this.balls.push(new Ball(posX, posY, mass, color))
    },

    moveAll() {
        for (let ball of this.balls) {
            ball.move()
        }
    }
}

const collisions = {
    wall: function (collider) {
        if (collider.posX + collider.radius > CANVAS_WIDTH || collider.posX - collider.radius < 0) {
            collider.applyVelocity(-collider.vx)
        }
    },
    ball: function (collider) {
        for (let ball of entity.balls) {
            const dx = Math.abs(ball.posX - collider.posX + collider.radius);
            if (ball === collider) continue;
            if (ball.radius >= dx) {
                const { newV1, newV2 } = calculateVelocity(ball.vx, ball.mass, collider.vx, collider.mass);
                ball.applyVelocity(newV1)
                collider.applyVelocity(newV2)
            }
        }
    }
}

class Vector {
    constructor(vx) {
        this.vx = vx;
    }
    applyVelocity(number) {
        this.vx = number;
    }
}

class Ball extends Vector {
    constructor(posX, posY, mass, color) {
        super(DEFAULT_VALUES.VX)
        this.posX = posX;
        this.posY = posY;
        this.radius = mass / DEFAULT_VALUES.MASS_COEFFICIENT;
        this.mass = mass;
        color ? this.color = color : this.color = DEFAULT_VALUES.COLOR;
    }
    move() {
        this.posX += this.vx;
    }
}

//http://bolvan.ph.utexas.edu/~vadim/Classes/2008s.homeworks/elastic.pdf (eq 17,18) (perfect elastic collision)
function calculateVelocity(v1, m1, v2, m2) {
    const newV1 = ((m1 - m2) / (m1 + m2) * v1) + ((2 * m2) / (m1 + m2) * v2);
    const newV2 = ((m2 - m1) / (m1 + m2) * v2) + ((2 * m1) / (m1 + m2) * v1);
    return { newV1, newV2 };
}

entity.createBall(50, 50, 10);
entity.createBall(500, 50, 10, "blue");