class MSHerbivore1 extends creature {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = new JSVector(loc.x,loc.y);
        this.vel = new JSVector(vel.x,vel.y);
        this.size = sz;
    }
    //  methods
    run() {
        this.update();
        this.render();
    }

    update() {
        this.loc.add(this.vel)
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.loc.x,this.loc.y,this.size,0,Math.PI*2);\
        
       
    }
}