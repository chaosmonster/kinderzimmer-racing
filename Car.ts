import {Vector, VectorProps} from './Vector.js';
import {RotationPoint} from './RotationPoint.js';
import {Box,BoxProps} from './Box.js';
const ACCELERATION: number = .01;
const MAX_ACCELERATION: number = 1;
const MIN_ACCELERATION: number = -.5;
const MAX_SPEED: number = 5;
const MIN_SPEED: number = -1.5;
const DECELERATION: number = .01;
const FRICTION: number = .99;
const ROTATE_VELOCITY: number = 2.5;


interface CarProps {
    readonly startPos: VectorProps,
    readonly r: number
    readonly box?: Box;
}

export class Car implements RotationPoint{
    readonly box: BoxProps;
    v: number = 0;
    a: number = 0;
    r: number = 0;
    readonly pos: Vector;
    isLeft = false;
    isRight = false;
    isAccelerate = false;
    isBrake = false;
    constructor({startPos,r,box}:CarProps) {
        this.box = Box.create(box,{
            width: 50,
            height: 75
        })
        this.pos = Vector.create(startPos);
        this.r = r;

        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
    }

    getRotationPoint():VectorProps{
        return{
            x: this.pos.x + this.box.width / 2,
            y: this.pos.y + this.box.height / 2
        }
    }

    update(progress: number) {
        // Speed
        if (this.isBrake) {
            this.a -= DECELERATION;
        } else if (this.isAccelerate) {
            this.a += ACCELERATION;
        } else {
            this.a = 0;
            let sign = Math.sign(this.v);

            if (sign === -1) {
                this.v *= FRICTION;
            } else if (sign === 1) {
                this.v *= FRICTION;
            }
            if (Math.abs(this.v) < 0.01) {
                this.v = 0;
            }
        }
        this.a = Math.min(Math.max(this.a, MIN_ACCELERATION), MAX_ACCELERATION);
        this.v += this.a;
        this.v = Math.min(Math.max(this.v, MIN_SPEED), MAX_SPEED);

        // Steering
        if (this.isLeft) {
            this.r -= progress * ROTATE_VELOCITY;
        }
        if (this.isRight) {
            this.r += progress * ROTATE_VELOCITY;
        }

        //update the position.
        this.pos.add({
            x: progress * this.v * Math.cos((this.r - 90) * (Math.PI / 180)),
            y: progress * this.v * Math.sin((this.r - 90) * (Math.PI / 180))
        });
    }

    ////////////////////////
    // Controls

    keyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case "KeyD":
                this.isRight = true;
                break;
            case "KeyA":
                this.isLeft = true;
                break;
            case "KeyW":
                this.isAccelerate = true;
                break;
            case "KeyS":
                this.isBrake = true;
                break;
        }
    }

    keyUp = (e:KeyboardEvent) => {
        switch (e.code) {
            // case "Space":
            //     isPause = !isPause;
            //     break;
            case "KeyD":
                this.isRight = false;
                break;
            case "KeyA":
                this.isLeft = false;
                break;
            case "KeyW":
                this.isAccelerate = false;
                break;
            case "KeyS":
                this.isBrake = false;
                break;
        }
    }

}
