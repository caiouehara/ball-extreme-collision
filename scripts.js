const DEFAULT_VALUES = {
    COLOR: "white",
    MASS_COEFFICIENT: 0.5,
}

const random = {
    // problem when radius spawn inside collision area (more than 400 or less than -400)
    posX: () => Math.random() * ( CANVAS_WIDTH/2 - (-CANVAS_WIDTH/2) ) + (-CANVAS_WIDTH/2),
    posY: () => Math.random() * ( CANVAS_HEIGHT/2 - (-CANVAS_HEIGHT/2) ) + (-CANVAS_HEIGHT/2),
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
        if (collider.posX + collider.radius > CANVAS_WIDTH/2 || collider.posX - collider.radius < -CANVAS_WIDTH/2) {
            collider.applyVx(-collider.vx)
        }
        if (collider.posY + collider.radius > CANVAS_HEIGHT/2 || collider.posY - collider.radius < -CANVAS_WIDTH/2) {
            collider.applyVy(-collider.vy)
        }
    },
    ball: function (collider) {
        for (let ball of entity.balls) {
            if (ball === collider) continue;
            
            const dx = Math.abs(ball.posX - collider.posX);
            const dy = Math.abs(ball.posY - collider.posY);
            const distance = calculatePitagoras(dx, dy);
            const collisionAngle = getAngle(ball, collider);
            
            if (ball.radius + collider.radius >= distance) {
                // console.log(collisionAngle);
                // console.log("colidiu")
                
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

function getAngle(ball, collider){
    const dx = Math.abs(ball.posX - collider.posX);
    const dy = Math.abs(ball.posY - collider.posY);
    return Math.atan2(dy, dx) * 180/Math.PI;
}

// posX, posY, vx, vy, mass, color
entity.createBall(0, 200, 0, -2, 50, "yellow");
entity.createBall(0, -200, 0, 0, 50, "black");
