const ACCELERATION = .01;
const MAX_ACCELERATION = 1;
const MIN_ACCELERATION = -.5;
const MAX_SPEED = 5;
const MIN_SPEED = -1.5;
const DECELERATION = .01;
const FRICTION = .99;
const ROTATE_VELOCITY = 2.5;

export default class Car {
    constructor (ctx, x, y, r){
        this.ctx = ctx;
        this.width = 50;
        this.height = 75;
        this.pos = {
            x: x,
            y: y
        }
        this.center = {
            x: this.pos.x+this.width/2,
            y: this.pos.y+this.height/2
        }
        this.vector = {
            x: 0,
            y: 0
        }
        this.v = 0;
        this.a = 0;
        this.r = r;
        this.isLeft = false;
        this.isRight = false;
        this.isAccelerate = false;
        this.isBrake = false;
    }

    update(prog){
        // Speed
        if(this.isBrake) {
            this.a -= DECELERATION;
        } else if(this.isAccelerate) {
            this.a += ACCELERATION;
        } else {
            this.a = 0;
            let sign = Math.sign(this.v);

            if(sign === -1){
                this.v *= FRICTION;
            } else if(sign === 1) {
                this.v *= FRICTION;
            }
            if(Math.abs(this.v) < 0.01){
                this.v = 0;
            }
        }
        this.a = Math.min(Math.max(this.a,MIN_ACCELERATION),MAX_ACCELERATION);
        this.v += this.a;
        this.v = Math.min(Math.max(this.v,MIN_SPEED),MAX_SPEED);

        // Steering
        if(this.isLeft){
            this.r -= prog * ROTATE_VELOCITY;
        }
        if(this.isRight) {
            this.r += prog * ROTATE_VELOCITY;
        }

        let vector = {
            x: prog * this.v * Math.cos((this.r-90) * (Math.PI/180)),
            y: prog * this.v * Math.sin((this.r-90) * (Math.PI/180))
        }

        //update the position.
        this.pos.x += vector.x;
        this.pos.y += vector.y;

        this.center = {
            x: this.pos.x+this.width/2,
            y: this.pos.y+this.height/2
        };
    }

    draw(){
        this.ctx.save();

        // //rotate around center of car instead of canvas 0,0
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.rotate(this.r * Math.PI / 180);
        this.ctx.translate(-this.center.x, -this.center.y);

        // //shape of the car (replace me with an actual sprite…)
        this.ctx.fillStyle = "darkgreen";
        this.ctx.beginPath();
        this.ctx.moveTo(this.center.x, this.pos.y);
        this.ctx.lineTo(this.pos.x, this.pos.y+this.height);
        this.ctx.lineTo(this.pos.x+this.width, this.pos.y+this.height);
        this.ctx.fill();

        this.ctx.restore();
    }

}
