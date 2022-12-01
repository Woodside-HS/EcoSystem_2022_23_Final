class SBFood2 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.clr = "rgba(29, 17.6, 45.5, 255)";
        this.ctx = wrld.ctxMain;
    
    }
    //  methods
    run() {
        this.update();
        console.log("gah")
        this.render();
    }

    update() {
    }

    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
}