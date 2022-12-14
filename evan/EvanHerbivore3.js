class EvanHerbivore3 extends Creature {
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
          //lifeSpan:30000,//  miliseconds
          age:0,
          numOffspring:3,
          maxSpeed: 1,
          maxSprintSpeed: 1,
          scentValue: 100,
          sightValue: 100,
          weight:10,
       };
    }//++++++++++++++++++++++++++++++++ end creature constructor
 
    //++++++++++++++++++++++++++++++++ creature methods
    run() {
       
       this.update();
       this.checkEdges();
       this.render();
       this.searchingFood();   
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
    render() {
       //  render balls in world
       let ctx = this.ctx;
       ctx.beginPath();
       ctx.fillStyle = this.clr;
       ctx.arc(this.loc.x, this.loc.y, 20, 0, 2 * Math.PI, false);
       ctx.fill();
       
    }
    searchingFood(){
      
      for(let i = 0; i<world.foods.food2.length; i++){
         let d = this.loc.distanceSquared(world.foods.food2[i].loc);
         if(d < 100){
            let seek = JSVector.subGetNew(world.foods.food2[i].loc, this.loc);
            seek.setMagnitude(0.05);
            this.acc.add(seek);
            if(this.loc.distanceSquared(world.foods.food2[i].loc) < 400){
               this.vel.setMagnitude(0);
                    this.acc.setMagnitude(0);
                    this.statusBlock.searchFood = false;
                    this.statusBlock.eating = true;
                    this.foodEat = i;
            }
         }

      }
        
    }
 
    getRandomColor() {
       //  List of hex color values for movers
       let colors = [
          "#7102AB"
          
       ];
       let index = Math.floor(Math.random() * colors.length);
       return colors[index];
    }
}