'use strict';
import Car from './Car.js';
let last_render = 0;
const canvas = document.getElementById('playground');
let car;
let ctx;

function tick(timestamp) {
    let progress = (timestamp - last_render)/15;

    // Clear whole canvas every tick before drawing new stuff
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update(progress);
    draw(ctx);

    last_render = timestamp;
    window.requestAnimationFrame(tick);
}

function init(){
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');

    setupControls();

    car = new Car(ctx, 100, 100, 0);
    window.requestAnimationFrame(tick);
}

init();

function update(prog){
    car.update(prog);
}

function draw(ctx){
    car.draw(ctx);
}

////////////////////////
// Controls
function setupControls(){
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}

function keyDown(e){
    switch (e.code) {
        case "KeyD":
            car.isRight = true;
        break;
        case "KeyA":
            car.isLeft = true;
        break;
        case "KeyW":
            car.isAccelerate = true;
        break;
        case "KeyS":
            car.isBrake = true;
        break;
    }
}

function keyUp(e){
    switch (e.code) {
        case "Space":
            isPause = !isPause;
        break;
        case "KeyD":
            car.isRight = false;
        break;
        case "KeyA":
            car.isLeft = false;
        break;
        case "KeyW":
            car.isAccelerate = false;
        break;
        case "KeyS":
            car.isBrake = false;
        break;
    }
}
