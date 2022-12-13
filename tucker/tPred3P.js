class tPred3P {
    constructor(loc,clr,rotationDistance) {
        this.loc = loc.copy();
        this.rotD = rotationDistance;
        this.rotation = 0;
        this.clr = clr;
    }
    run(headLoc) {
        this.update();
        this.render(headLoc);
    }
    update(){
        this.rotation+=0.01;
    }
    render(headLoc){
        let ctx = world.ctxMain;
        ctx.save();
        ctx.translate(headLoc.x,headLoc.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.arc(this.rotD,0,3,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}