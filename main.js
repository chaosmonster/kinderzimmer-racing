'use strict';
let last_render = 0;
const canvas = document.getElementById('playground');
let car;
let ctx;

function tick(timestamp) {
    let progress = (timestamp - last_render)/15;

    // Clear whole canvas every tick before drawing new stuff
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update(progress);
    draw();

    last_render = timestamp;
    window.requestAnimationFrame(tick);
}

function init(){
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');

    window.requestAnimationFrame(tick);
}

init();

function update(prog){
    //update stuff
}

function draw(){
    // draw stuff
}

