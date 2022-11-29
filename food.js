class Food extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.clr = this.getRandomColor();
        this.ctx = wrld.ctxMain;
        this.size = sz;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.statBlock = {//  properties 
            health: 100,
            nourishment: 100,
            lifeSpan:30000,
            opacity:1.0,
            foodPts:100
        };
    }
    //  methods
    run() {
        this.update();
        this.render();
    }

    update() {
    }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(-Math.PI); //offset 90 degrees
        ctx.beginPath();
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.lineTo(-this.size/2, this.size/3);
        ctx.lineTo(0, this.size*2);
        ctx.lineTo(this.size/2, this.size/3);
        ctx.lineTo(this.size, this.size);
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