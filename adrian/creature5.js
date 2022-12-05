class Creature5 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1)
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.rad = 10;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
    }
    //  methods
    run() {
        this.interaction();
        this.update();
        this.render();
        this.checkEdges();
    }

    interaction() {
        
    }

    update() {
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
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
        ctx.closePath();
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.fill();
        ctx.stroke();
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