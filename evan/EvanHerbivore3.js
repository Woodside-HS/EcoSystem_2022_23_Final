class EvanHerbivore3 extends Creature{
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        //mover properties
        this.loc = loc;
        this.vel = vel;
        this.acc = new JSVector(0, 0);
        this.clr = this.getRandomColor();
        this.size = sz;
        this.maxSpeed = .1;
        this.ctx = wrld.ctxMain;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
  
        this.statusBlock = {
           searchFood:true,
           searchMate:true,
           eating:false,
           sprint:false,
           sleeping:false,
           attack:false,
           deathProc:false
           
        };
  
        this.dataBlock = {//  status block 
           health: 100,
           isDead: false,
           nourishment: 100,
           lifeSpan:30000,//  miliseconds
           age:0,
           numOffspring:3,
           maxSpeed: 1,
           maxSprintSpeed: 1,
           scentValue: 100,
           sightValue: 100,
           weight:10,
        };
    }//++++++++++++++++++++++++++++++++ end creature constructor

    run() {
        this.update();
        this.checkEdges();
        this.render();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.loc.add(this.vel);
    }

    checkEdges() {
        if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
           this.vel.x *= -1;
        }
        if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height / 2) {
           this.vel.y *= -1;
        }
    }

    checkEdges() {
        if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
           this.vel.x *= -1;
        }
        if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height / 2) {
           this.vel.y *= -1;
        }
    }


}