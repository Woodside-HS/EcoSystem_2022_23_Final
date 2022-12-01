class Creature5 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.size = sz * 3/2;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
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