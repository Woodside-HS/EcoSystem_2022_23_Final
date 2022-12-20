class Food6 extends Food {//this is tucker's food
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.isDead = false;
    }
    //  methods
    run() {
        this.update();
        this.render();
        this.bounce();
        if (this.statBlock.nurishment <= 0 || this.statBlock.health <= 0) {//Fruits dont have lifespan so once they have been fully eaten they commit dead
            this.isDead = true;
            let x = Math.random() * this.dims.width - this.dims.width / 2;
            let y = Math.random() * this.dims.height - this.dims.height / 2;
            let loc = new JSVector(x, y);
            let dx = Math.random() * 4 - 2;
            let dy = Math.random() * 4 - 2;
            let vel = new JSVector(dx, dy);
            world.foods.food3.push(new Food6(loc, vel, 5, world))
        }
    }

    update() {
        this.loc.add(this.vel)
    }

    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.moveTo(this.loc.x, this.loc.y);//makes the fruit look like a heart
        ctx.lineTo(this.loc.x + (this.rad / 2), this.loc.y - (this.rad / 2));
        ctx.lineTo(this.loc.x + this.rad, this.loc.y);
        ctx.lineTo(this.loc.x, this.loc.y + this.rad);
        ctx.lineTo(this.loc.x - this.rad, this.loc.y);
        ctx.lineTo(this.loc.x - (this.rad / 2), this.loc.y - (this.rad / 2))
        ctx.closePath();
        ctx.fill();
    }

    bounce() {//bounces the fruit off of the edges
        if (this.loc.x < world.dims.left) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.x > world.dims.right) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.y > world.dims.bottom) {
            this.vel.y = -this.vel.y;
        }
        if (this.loc.y < world.dims.top) {
            this.vel.y = -this.vel.y
        }
    }
    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#25AA34",
            "#18CC2e",
            "#389925",
            "#11AA99",
            "#99CC00",
            "#11FF65"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

}