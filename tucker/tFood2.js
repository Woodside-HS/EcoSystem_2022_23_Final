class tFood2 extends Entity {
    constructor(loc,vel,sz,wrld) {
        super(loc,vel,sz,wrld);
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = world.ctxMain;
    }
}