class tFood2P {
    constructor(loc, vel, sz, wrld, dist) {
        this.bushLoc = loc.copy();
        this.loc = loc.copy();
        this.vel = vel.copy();
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.distance = dist*dist;
        this.life = Math.random() * 300 + 100;
        this.nurishment = 1000;
        this.isDead = false;
        this.ctx = wrld;
        this.clr = this.getRandomColor();
    }
    run() {
        this.update();
        this.render();
        this.checkDist();
    }
    update() {
        this.loc.add(this.vel)
        this.life--;
        if (this.life < 0) {
            this.isDead = true;
        }
        if(this.nurishment < 0){
            this.isDead = true;
        }
    }
    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
    }
    checkDist(){
        if(this.loc.distanceSquared(this.bushLoc)>this.distance){
            this.vel.setMagnitude(0);
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