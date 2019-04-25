'use strict';
import {Car} from './Car.js';

//collision stuff
const COLLISION_MAP_PATH = "./assets/collision_map.svg";
let collision_rects = [];
let assetsLoaded = false;
let collision_svg = new Image; // for debugging (and nothing else to see for now…)

interface World {
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    progress: number,
    car: Car
}

function tick(timestamp: number, last_render: number, world: World) {

    // Clear whole canvas every tick before drawing new stuff
    world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
    world.progress = (timestamp - last_render) / 15;
    update(world);
    draw(world);

    window.requestAnimationFrame(function (t) {
        tick(t, timestamp, world);
    });
}

function init() {

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.append(canvas);
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        return;
    }

    loadCollisionMap();

    const car = new Car({startPos:{x:100, y:100}, r:0});
    window.requestAnimationFrame(function (timestamp) {
        tick(timestamp, 0, { ctx, canvas, progress: 0, car });
    });
}

init();

function update(world: World) {
    world.car.update(world.progress);
}

function draw(world: World) {
    drawMap(world);
    drawCar(world, world.car);
}

function drawCar(world: World, car: Car){
        world.ctx.save();

        const rPoint = car.getRotationPoint();

        // //rotate around center of car instead of canvas 0,0
        world.ctx.translate(rPoint.x, rPoint.y);
        world.ctx.rotate(car.r * Math.PI / 180);
        world.ctx.translate(-rPoint.x, -rPoint.y);

        // //shape of the car (replace me with an actual sprite…)
        world.ctx.fillStyle = "darkgreen";
        world.ctx.beginPath();
        world.ctx.moveTo(rPoint.x, car.pos.y);
        world.ctx.lineTo(car.pos.x, car.pos.y + car.box.height);
        world.ctx.lineTo(car.pos.x + car.box.width, car.pos.y + car.box.height);
        world.ctx.fill();

        world.ctx.restore();
}

function drawMap(world: World) {
    // for now only the collision map to be seen…
    world.ctx.drawImage(collision_svg, 0, 0);
}

function loadCollisionMap() {
    //get the objects to collide with from an SVG
    // let xhttp = new XMLHttpRequest();
    // xhttp.overrideMimeType('text/xml');

    // xhttp.addEventListener("load", collisionOnLoad);
    // xhttp.open("GET", COLLISION_MAP_PATH, false);
    // xhttp.send(null);

    //easier than drawing and caching the rects from the SVG for now…
    collision_svg.src = COLLISION_MAP_PATH;
}

// function collisionOnLoad() {
//     //TODO: How to deal with mutliple assets to be loaded?
//     assetsLoaded = true;
//     let xml_collision_rects = this.responseXML.getElementsByTagName('rect');
//     for (let rect of xml_collision_rects) {
//         collision_rects.push({
//             x: rect.x.baseVal.value,
//             y: rect.y.baseVal.value,
//             width: rect.width.baseVal.value,
//             height: rect.height.baseVal.value
//         });
//     };
// }


