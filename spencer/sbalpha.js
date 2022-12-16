class SBCreature3 extends Creature {
    // properties

    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.acc = new JSVector(0,0);
        this.clr = "yellow"
        this.world = wrld;
        this.food;
        this.dataBlock.health = 100-Math.random()*30;
    }
    
    run() {
        if(this.statusBlock.eating){
            this.eating();
        }
        else{
            this.search();
            this.update();
            this.bounce();
        }
        this.render();
    
    }
    
    
    update() { //updates snake and all segments
        this.vel.add(this.acc);
        this.loc.add(this.vel);
   
    }
    
    
    render() { //renders head, body and antennas

    }
    
    bounce(){ //avoids walls, doesn't get stuck in corners
    if(this.loc.y < world.dims.top  + 30 || this.loc.y > world.dims.bottom - 30){
        this.vel.y = -this.vel.y;
      }
    else if(this.loc.x < this.world.dims.left  + 30 || this.loc.x > this.world.dims.right - 30){
        this.vel.x = -this.vel.x;
      }

    }

    search(){ //finds food
       
    }

    eating(){

    }

    revive(){

    }
}