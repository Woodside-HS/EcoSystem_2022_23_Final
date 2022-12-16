class tFood2P {
    constructor(loc, vel, sz, wrld, dist) {
        this.bushLoc = loc.copy();
        this.loc = loc.copy();
        this.vel = vel.copy();
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.distance = dist * dist;
        this.isDead = false;
        this.ctx = wrld;
        this.clr = this.getRandomColor();
        this.statBlock = {//  properties 
            health: 100,
            nourishment: 100,
            lifeSpan: Math.random()*1000+500,
            opacity: 1.0,
            foodPts: 100
        };
    }
    run() {
        if (this.statBlock.nourishment <= 1 || this.statBlock.health <=1 || this.statBlock.lifeSpan < 0) {
            this.isDead = true;
        }//have to check if lifespan is up or if nurishment is left over
        this.update();
        this.render();
        this.checkDist();
    }
    beinEat(){
        this.statBlock.nourishment--;
    }
    update() {
        this.loc.add(this.vel)
        this.statBlock.lifeSpan--;
    }
    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.strokeStyle = "#07170700";
        //renders that cherry with 3 half circles
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, -Math.PI);//bottom of the chrry
        ctx.arc(this.loc.x + this.rad / 2, this.loc.y, this.rad / 2, Math.PI, Math.PI * 2);//top right of the cherry
        ctx.arc(this.loc.x - this.rad / 2, this.loc.y, this.rad / 2, Math.PI, Math.PI * 2)//top left of the cherry
        ctx.fill();
        ctx.stroke();
        ctx.closePath();//have to close the path so that the stroke style doesn't overlap
        ctx.beginPath();
        ctx.strokeStyle = "#071707FF";
        ctx.arc(this.loc.x + this.rad, this.loc.y, this.rad, Math.PI, 3 * Math.PI / 2);//renders the stem
        ctx.stroke();
    }
    checkDist() {
        if (this.loc.distanceSquared(this.bushLoc) > this.distance) {
            this.vel.setMagnitude(0);//keeps the cherries from moving too far from the bush
        }
    }
    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#EF1700",
            "#AA4439",
            "#A10F00",
            "#FF1800",
            "#C01200",
            "#DB0C29"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}