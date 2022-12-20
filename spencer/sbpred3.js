//Quick notes: this creature eats ONLY SNAKES as it becomes overwhelmed if it eats other types of creatures. 
//In other words, it won't visibly kill anything else, so I settled for snakes.
//It creates a unique kill process for its victims. It turns them white and then causes them to spasm
//Final note. There initially was an eat fucntion, but because I wanted them to not stop when in contact with their prey
//I decided to simply put that code in the attack function. The eat code is commented out and can be reapplied
//About the rendering: this creature has orbitals and a weird streak going through it because of a tactically ignored closePath
//Functions: run, render, update, bounce, preyDeath, search, attack, revive



class SBPred3 extends Creature { 
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.world = wrld;
        this.clrlist = ['#065535','#fdd800', '#0b7a85', '#00A36C', '#8b324d', '#c39797', '#9e58c7'];
        this.clr = this.clrlist[Math.floor(Math.random()*this.clrlist.length)];
        this.food;
        this.orbs = [];
        let start = 0;
        this.counter = 0;
        this.dataBlock.maxSprintSpeed = 4;
        this.dataBlock.maxSpeed = 3;
        this.preyRender = [false, 0];
        this.acc = new JSVector(0, 0);
        this.dataBlock.isDead = false;
        let n = Math.random()*2+6;
        for(let i = 0; i<n; i++){
            this.orbs[i] = new OrbiterSB(7, start, this.loc, this.ctx, this.clrlist.indexOf(this.clr)); // start vector at planet and end at position
      //diameter, angle, orbit radius, planet location (takes in JSVector)
        start+= (Math.PI*2)/(n);
        }
  }
  
  run(){ //change color to red when in attack mode 
    this.render();
    this.update();
    for(let i = 0; i<this.orbs.length; i++){
      this.orbs[i].ploc.x = this.loc.x;
      this.orbs[i].ploc.y = this.loc.y;
      this.orbs[i].run();
      this.bounce();
    }
  }
  
  render(){ 
    this.ctx.beginPath();  //closed path intentionally left out
    this.ctx.lineTo(this.loc.x-this.size/2, this.loc.y+this.size/2);
    this.ctx.lineTo(this.loc.x-this.size/2, this.loc.y-this.size/2);
    this.ctx.lineTo(this.loc.x+this.size/2, this.loc.y-this.size/2);
    this.ctx.lineTo(this.loc.x+this.size/2, this.loc.y+this.size/2);
    this.ctx.fillStyle = this.clr; 
    this.ctx.fill(); 
    this.ctx.stroke(); 
  }
  
  update() { //include search, lifespan, death, and eating
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.dataBlock.maxSpeed);
    // if(this.statusBlock.eating){ //found eating unneccesary since I wanted them to constantly be moving.
    //   this.eating();
    // }
    // else{
      if(this.statusBlock.attack){
        this.attack();
      }
      else if(this.statusBlock.searchFood){
        this.vel.limit(this.dataBlock.maxSpeed);
        this.search();
      }
      if(this.counter%100 == 0){
        this.dataBlock.health--;
        }
      this.counter++; 
      if(this.dataBlock.health<2){
        this.revive();
      }
    if(this.preyRender[0]){
      if(this.preyRender[1]%60 !== 0){
        this.preyDeath();
      }
      else{
        this.preyRender[1] = 0;
        this.preyRender[0] = false;
        this.food.dataBlock.health = 1;
        this.food.dataBlock.nourishment = 1;
      }
    }
  }

  bounce(){ //fix corners
    if(this.loc.y < world.dims.top +15  || this.loc.y > world.dims.bottom -15 ){
      this.acc = JSVector.subGetNew(new JSVector(Math.random()*2000-1000, Math.random()*1500-750), this.loc);
      this.acc.normalize();
      this.acc.multiply(0.5);
    }
    else if(this.loc.x < this.world.dims.left +15 || this.loc.x > this.world.dims.right -15){
      this.acc = JSVector.subGetNew(new JSVector(Math.random()*2000-1000, Math.random()*1500-750), this.loc);
      this.acc.normalize();
      this.acc.multiply(0.5);
    }

  }


  // eating(){  Since I didn't want it to stay put while eating, I think the eating function was better put in the attack function
  //   this.food.vel.multiply(0);
  //   this.food.acc.multiply(0);
  //   this.preyDeath();
  //   this.statusBlock.eating = false;
  //   this.statusBlock.search = true;
  //   this.dataBlock.health +=this.food.dataBlock.nourishment/10;
  //   this.food.dataBlock.health = 3;
  //   this.food.dataBlock.nourishment = 3;
  //   this.preyRender[0] = true;
  // }

  preyDeath(){ //need to rewrite to figure out render issue of blood and vibrating velocity
    this.food.clr = "white";
    this.food.vel = new JSVector(Math.random()*4-2, Math.random()*4-2);
    this.preyRender[1]++;
  }

  revive(){
    this.dataBlock.isDead = true;
    let x = Math.random()*(world.dims.width-400)+world.dims.left+50;
    let y = Math.random()*(world.dims.height-400)+world.dims.top+50;
    let loc = new JSVector(x, y);
    let vel = new JSVector(Math.random()*4-2, Math.random()*4-2);
    this.world.creatures.pred3.push(new SBPred3(loc, vel, this.size, this.wrld));
  }

  search(){
    //let check = this.world.creatures.herb2;
    //for(let i = 0; i<check.length; i++){
        //if(this.loc.distance(check[i].loc)<200 && this.loc.distance(check[i].loc)>16 && !check[i].isDead){
           // this.food = check[i];
            //this.statusBlock.searchFood = false;
            //this.statusBlock.attack = true;
        //}
    // }
     let check2 = this.world.creatures.herb3;
     for(let i = 0; i<check2.length; i++){
      if(check2[i].constructor.name == SBCreature3);
         if(this.loc.distance(check2[i].loc)<200 && this.loc.distance(check2[i].loc)>16 && !check2[i].isDead){
             this.food = check2[i];
             this.statusBlock.searchFood = false;
             this.statusBlock.attack = true;
         }
      }
  }


  attack(){
    if(this.food.loc.distance(this.loc)<60){
      this.food.vel.multiply(0);
      this.food.acc.multiply(0);
      this.food.vel.multiply(0);
      this.food.acc.multiply(0);
      this.preyDeath();
      this.statusBlock.attack = false;
      this.statusBlock.search = true;
      this.dataBlock.health +=this.food.dataBlock.nourishment/10;
      this.food.dataBlock.health = 3;
      this.food.dataBlock.nourishment = 3;
      this.preyRender[0] = true;
    }
    else if(this.food.loc.distance(this.loc)<200){
      this.acc = JSVector.subGetNew(this.food.loc, this.loc);
      this.acc.normalize();
      this.acc.multiply(0.5);
    }
    else{
      this.statusBlock.attack = false;
      this.statusBlock.searchFood = true;
    }
  }

}