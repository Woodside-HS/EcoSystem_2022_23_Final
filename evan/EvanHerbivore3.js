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
 
    //++++++++++++++++++++++++++++++++ creature methods
    run() {
       //console.log("hi");
       this.update();
       this.checkEdges();
       this.render();
       this.checkEating();   
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
       //  render balls in mini map
    }
    checkEating(){
      
      for(let i = 0; i<world.foods.food2.length; i++){
         let d = this.loc.distance(world.foods.food2[i].loc);
         if(d < 100){
            this.acc = JSVector.subGetNew(world.foods.food2[i], this.loc);
            this.acc.normalize();
            this.acc.multiply(0.25);
         }
         // if(this.loc.distance(world.foods.food2[i])<100){
         //    v1 = JSVector.subGetNew(this.loc, world.foods.food2[i]);
         //    this.vel.setDirection(world.foods.foods.food2[i]);
            
         // }
      }
        
    }
 
    getRandomColor() {
       //  List of hex color values for movers
       let colors = [
          "#7102AB",
          "#ab0256",
          "#0285ab",
          "#02ab1a",
          "#ab5302",
          "#773e26",
          "#ab0256",
          "#257874",
          "#78254e",
          "#787725"
       ];
       let index = Math.floor(Math.random() * colors.length);
       return colors[index];
    }
}