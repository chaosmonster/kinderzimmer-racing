'use strict';
import Car from './Car.js';
let last_render = 0;
const canvas = document.getElementById('playground');
let car;
let ctx;

//collision stuff
const COLLISION_MAP_PATH = "./assets/collision_map.svg";
let collision_rects = [];
let assetsLoaded = false;
let collision_svg = new Image; // for debugging (and nothing else to see for now…)

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

    loadCollisionMap();
    setupControls();

    car = new Car(ctx, 100, 100, 0);
    window.requestAnimationFrame(tick);
}

init();

function update(prog){
    car.update(prog);
}

function draw(){
    car.draw(ctx);

    if(assetsLoaded){
        drawMap();
    }
}

function drawMap(){
    // for now only the collision map to be seen…
    ctx.drawImage(collision_svg,0,0);
}

function loadCollisionMap(){
    //get the objects to collide with from an SVG
    let xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType('text/xml');

    xhttp.addEventListener("load", collisionOnLoad);
    xhttp.open("GET", COLLISION_MAP_PATH, false);
    xhttp.send(null);

    //easier than drawing and caching the rects from the SVG for now…
    collision_svg.src = COLLISION_MAP_PATH;
}

function collisionOnLoad(){
    //TODO: How to deal with mutliple assets to be loaded?
    assetsLoaded = true;
    let xml_collision_rects = this.responseXML.getElementsByTagName('rect');
    for(let rect of xml_collision_rects){
        collision_rects.push({
            x:rect.x.baseVal.value,
            y:rect.y.baseVal.value,
            width:rect.width.baseVal.value,
            height:rect.height.baseVal.value
        });
    };
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
