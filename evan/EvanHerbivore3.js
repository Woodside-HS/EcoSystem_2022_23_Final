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
       this.foodObj = null;
 
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
                    this.foodObj = i;
            }
         }

      }
        
    }
    eatFood(){
      let i = this.foodObj;
        this.dataBlock.nourishment++;//already know that we are consuming because eating must be true bc the stuff that is happening
        
        if (world.foods.food2[i]) {//makes sure the food item still exists before you render it
            if (world.foods.food2[i].statBlock.nourishment <= 2) {
                //this needs to go before the others so that it checks this forst
                //hopefully this should fix it -- It did not -- Wait it did
                world.foods.food2[i].statBlock.nourishment--;
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = true;
                this.vel = new JSVector(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
                this.foodEat = null;
            } else if (world.foods.food2[i].statBlock.nourishment > 0) {//sometimes it just doens't exist - I think its cause of some splicng error
                world.foods.food2[i].statBlock.nourishment--;
            } else {
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = true;
                this.foodEat = null;
                this.vel = new JSVector(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
            }// I need some way to restart movement after eating something
        } else {//should be checking to make sure that it goes back to check eat wont ever be run because it new thing is created
            this.statusBlock.eating = false;
            this.statusBlock.searchFood = true;
            this.vel = new JSVector(Math.random() - 0.5, Math.random() - 0.5)
        }

        //Particle System Foor Checker
        if (this.PSfoodEat.pSys != null) {
         if (world.foods.pSys2[this.PSfoodEat.pSys].foodList[this.PSfoodEat.item].statBlock.nourishment) {
             if (world.foods.pSys2[this.PSfoodEat.pSys].foodList[this.PSfoodEat.item].statBlock.nourishment <= 1) {
                 world.foods.pSys2[this.PSfoodEat.pSys].foodList[this.PSfoodEat.item].statBlock.nourishment--;
                 this.statusBlock.eating = false;
                 this.statusBlock.searchFood = true;
                 this.vel = new JSVector(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
                 this.PSfoodEat = {
                     pSys: null,
                     item: null
                 }
             } else if (world.foods.pSys2[this.PSfoodEat.pSys].foodList[this.PSfoodEat.item].statBlock.nourishment > 1) {
                 world.foods.pSys2[this.PSfoodEat.pSys].foodList[this.PSfoodEat.item].statBlock.nourishment--;//confirmed to work
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