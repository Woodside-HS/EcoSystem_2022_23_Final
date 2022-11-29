class Food5 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.ctx = wrld.ctxMain;
        this.size = sz;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.statBlock = {
        };
    }

    run() {
        this.render();
    }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(-Math.PI); //offset 90 degrees
        ctx.beginPath();
        ctx.strokeStyle = "#1dc714";
        ctx.fillStyle = "#1dc714";
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(this.size, this.size);
        ctx.lineTo(this.size/2, 0);
        ctx.lineTo(0, this.size*2);
        ctx.lineTo(-this.size/2, 0);
        ctx.lineTo(-this.size, this.size);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}