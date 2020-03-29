const random = {
    vx: () => Math.random() * (2 - -2) + -2,
    vy: () => Math.random() * (2 - -2) + -2,
    // radius: () => Math.random() * (50 - 5) + 5,
    mass: () => Math.random() * (10 - 5) + 5,
}

function calculateDistance(ob1, ob2){
    const dx = calculateDx(ob1, ob2)
    const dy = calculateDy(ob1, ob2)
    return calculatePitagoras(dx, dy);
}

function calculateDx(ob1, ob2){
    return ob1.posX - ob2.posX;
}

function calculateDy(ob1, ob2){
    return ob1.posY - ob2.posY;
}

// Head-on Elastic Collisions (perfect elastic collision) (unidimensional)
// http:bolvan.ph.utexas.edu/~vadim/Classes/2008s.homeworks/elastic.pdf (eq 17,18)
function calculateUnidimensionalDynamic(v1, m1, v2, m2) {
    const finalV1 = ((m1 - m2) / (m1 + m2) * v1) + ((2 * m2) / (m1 + m2) * v2);
    const finalV2 = ((m2 - m1) / (m1 + m2) * v2) + ((2 * m1) / (m1 + m2) * v1);
    return { finalV1, finalV2 };
}

// Have to improve
// Glancing elastic collisions (bidimensional)
// https://github.com/miskimit/miskimit.github.io/blob/master/ballsballsballs/script.js (another js simulator source code)
// https://github.com/medermand/Collision/blob/master/Collision.java (java simulator source code)
// https://www.khanacademy.org/science/physics/linear-momentum/momentum-tutorial/a/what-are-two-dimensional-collisions
// Comprehensive Physics XI (pg 617)
function calculateBidimensionalDynamic(ball, collider) {
    const theta1 = ball.angle();
    const theta2 = collider.angle();

    const dx = calculateDx(ball, collider);
    const dy = calculateDy(ball, collider);
    const phi =  Math.atan2(dy, dx);
    
    const m1 = ball.mass;
    const m2 = collider.mass;
    const v1 = ball.speed();
    const v2 = collider.speed();

    const newVx1 = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
    const newVy1 = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
    const newVx2 = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
    const newVy2 = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

    return { newVx1, newVy1, newVx2, newVy2 };
}

function calculatePitagoras(num1, num2) {
    return Math.sqrt(num1 ** 2 + num2 ** 2);
}