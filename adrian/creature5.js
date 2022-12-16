class Creature5 extends Creature {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1)
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.rad = 10;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.size = 5;
        this.sizeFactor = 1;
        this.rotation = 0;
        this.eating = false;
    }
    //  methods
    run() {
        this.interaction();
        this.update();
        //this.render();
        this.checkEdges();
    }

    interaction() {
        
    }

    update() {
        this.rotation++;
        this.loc.add(this.vel);
    }

    checkEdges() {
        if(this.loc.x<world.dims.left){
          this.vel.x = -this.vel.x;
        }
        if(this.loc.x>world.dims.right){
          this.vel.x = -this.vel.x;
        }
        if(this.loc.y>world.dims.top){
          this.vel.y = -this.vel.y;
        }
        if(this.loc.y<world.dims.bottom){
          this.vel.y = -this.vel.y;
        }
      }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.beginPath();
        ctx.rotate(Math.PI/360 * this.rotation);
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.moveTo(-this.size * this.sizeFactor, 0);
        ctx.lineTo(this.size * this.sizeFactor, 0);
        ctx.lineTo(this.size * this.sizeFactor, 5);
        ctx.lineTo(this.size * this.sizeFactor + 10, 0);
        ctx.lineTo(this.size * this.sizeFactor, -5);
        ctx.lineTo(0, -this.size * this.sizeFactor - 10);
        ctx.lineTo(-this.size * this.sizeFactor, -5);
        ctx.lineTo(-this.size * this.sizeFactor - 10, 0);
        ctx.lineTo(-this.size * this.sizeFactor, 5);
        ctx.lineTo(0, this.size * this.sizeFactor + 10);
        ctx.lineTo(this.size * this.sizeFactor, 5);
        ctx.lineTo(this.size * this.sizeFactor, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
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

