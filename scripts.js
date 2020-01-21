const DEFAULT_VALUES = {
    COLOR: "red",
    MASS_COEFFICIENT: 0.5,
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
        if (collider.posX + collider.radius > CANVAS_WIDTH || collider.posX - collider.radius < 0) {
            collider.applyVx(-collider.vx)
        }
        if (collider.posY + collider.radius > CANVAS_HEIGHT || collider.posY - collider.radius < 0) {
            collider.applyVy(-collider.vy)
        }
    },
    ball: function (collider) {
        for (let ball of entity.balls) {
            const dx = Math.abs(ball.posX - collider.posX + collider.radius);
            const dy = Math.abs(ball.posY - collider.posY + collider.radius);
            const distance = calculatePitagoras(dx, dy);
            
            if (ball === collider) continue;
            if (ball.radius >= distance) {
                // const newVX = calculateVelocity(ball.vx, ball.mass, collider.vx, collider.mass);
                // const newVY = calculateVelocity(ball.vy, ball.mass, collider.vy, collider.mass);

                // ball.applyVx(newVX.finalV1);
                // collider.applyVx(newVX.finalV2);
                // ball.applyVy(newVY.finalV1);
                // collider.applyVy(newVY.finalV2);
            }
        }
    }
}

class Vector {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
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

//http://bolvan.ph.utexas.edu/~vadim/Classes/2008s.homeworks/elastic.pdf (eq 17,18) (perfect elastic collision) (unidimensional)
// function calculateVelocity(v1, m1, v2, m2) {
//     const finalV1 = ((m1 - m2) / (m1 + m2) * v1) + ((2 * m2) / (m1 + m2) * v2);
//     const finalV2 = ((m2 - m1) / (m1 + m2) * v2) + ((2 * m1) / (m1 + m2) * v1);
//     return { finalV1, finalV2 };
// }

function calculatePitagoras(num1, num2){
    return Math.sqrt(num1**2 + num2**2);
}

// posX, posY, vx, vy, mass, color
entity.createBall(500, 400, 5, 2, 50, "black");
