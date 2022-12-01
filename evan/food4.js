class Food4 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.ctx = wrld.ctxMain;
        this.size = sz;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        let clrr = this.getRandomColor();
        this.statBlock = {
        };
    }

    run() {
        this.render();
    }

    render() {
        let clrr = this.getRandomColor();

        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(-Math.PI); 
        ctx.beginPath();
        ctx.strokeStyle = this.clrr;
        ctx.fillStyle = this.clrr;
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(this.size, this.size);
        ctx.lineTo(this.size/2, 0);
        ctx.lineTo(0, this.size*2.5);
        ctx.lineTo(-this.size/6, 0);
        ctx.lineTo(-this.size, this.size*1.6);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    getRandomColor() {
        
        let colors = [
            "#1dc714",
            "#26bd9c",
            "#1b8220"
            
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

}