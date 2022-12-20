class EvanHerbivore3 extends Creature {
    constructor(loc, vel, sz, wrld) {
      super(loc, vel, sz, wrld);
      this.loc = loc; // creature location
      this.acc = new JSVector(0, 0); // creature acceleration
      this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1) // creature velocity
      this.ctx = wrld.ctxMain; //ctx
      this.clr = this.getRandomColor(); // creature get random color
      this.tempclr = this.clr; // reference color used as constant
      this.rad = 10; // radius references for everything made in this creature
      this.size = 5; // size references for everything made in this creature
      this.sizeFactor = 1; // size factor
      this.rotation = 0; // init rotaiton
      this.maxSpeed = 2; // max speed
      this.desiredSep = 25; // how far they are gonna be from each other
      this.maxSpeed = 2; // max speed
      this.maxForce = 1; // max force
      this.movement = 0; // how much they have moved
      this.sleepTime = getRandomInt(250, 500); // how long they sleep for
      this.stamina = getRandomInt(250, 3000); // how long they don't sleep for
      this.nourishmentDecInterval = getRandomInt(3, 7); // how fast nourishment decreases
      this.nourishmentFrameCounter = 0; // keep track of nourishment dec
      this.maxAge = getRandomInt(400, 3000); 
      this.searchingForFood = true;
      this.mateInterval = getRandomInt(1000, 5000); // how long between mating sessions
      this.mateTime = 0; // mating tick
      this.statBlock = {
        searchFood:true,
        searchMate:true,
        eating:false,
        sprint:false,
        sleeping:false,
        attack:false,
        deathProc:false
       };
    }//++++++++++++++++++++++++++++++++ end creature constructor
 
    //++++++++++++++++++++++++++++++++ creature methods
    run(c) {
       
      this.checkEdges();
      this.creatureInteraction(c);
      this.render();  
    }
    
    creatureInteraction(c) { 
      if (!this.isDead && !this.eating) { 
          this.clr = this.tempclr;
          this.sleeping = false;
          this.age++;
          this.movement++;
          if (this.searchingForFood) {
            this.searchForFood(); //search for food
          }
          this.loseNourishment();
          this.checkHealth();
          this.searchMate();
          this.update();
        
      } else if (!this.isDead && this.eating) { // happens if eating
        this.clr = this.tempclr;
        this.age++;
        this.movement++;
        if (this.searchingForFood) {
          this.searchForFood();
        }
        this.loseNourishment();
        this.checkHealth(c);
        this.update();
      }
      
    }
  



    loseNourishment() { 
      this.nourishmentFrameCounter++;
      if (this.nourishmentFrameCounter > this.nourishmentDecInterval) {
        this.nourishmentFrameCounter = 0;
        this.nourishment--;
      }
    }

    checkHealth(v) { // checks nourishment and speed changes based on nourishment
      if (this.nourishment < 15) {
        this.maxSpeed = 0.5;
        this.health -= 2;
      } else if (this.nourishment < 30) {
        this.maxSpeed = 1;
        this.health--;
      } else {
        this.maxSpeed = 2;
      }
      if (this.health < 0 || this.age > this.maxAge) {
        this.isDead = true;
      }
  
    }

    searchMate() { // search for a mate
      if (this.age > this.maxAge / 3) { // make its at least above a third through its life before mating
        if (this.statusBlock.searchMate) {
          world.creatures.herb1.push(new Creature5(this.loc, new JSVector(0, 0), 6, world));
          this.statusBlock.searchMate = false;
        } else {
          this.mateTime++;
          if (this.mateTime > this.mateInterval) {
            this.statusBlock.searchMate = true;
            this.mateTime = 0;
          }
        }
      }
    }

    update() { 
      this.rotation++;
      this.vel.add(this.acc);
      this.vel.limit(1);
      this.loc.add(this.vel);
    }

    render() { // render stuff 
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.fillStyle = this.clr;
      ctx.arc(this.loc.x, this.loc.y, this.size*this.sizeFactor, 0, 2 * Math.PI, false);
      ctx.fill();
    }


    searchForFood() { //search for food
      if (this.searchingForFood) {
        let closestFoodinRange = this.findClosestFood();
  
        if (closestFoodinRange != null) {
          let dist = this.loc.distance(closestFoodinRange.loc);
          if (closestFoodinRange.size == null) {
            this.seek(closestFoodinRange);
            if (dist < 200 && dist >= closestFoodinRange.rad + this.rad) {
              this.seek(closestFoodinRange);
              this.eating = false;
            }
            else if (dist * 2 < closestFoodinRange.rad + this.rad) {
              this.eat(closestFoodinRange);
              this.eating = true;
            }
          }
          else {
            if (dist < 200 && dist * 2 >= closestFoodinRange.size + this.size) {
              this.seek(closestFoodinRange);
              this.eating = false;
            }
            else if (dist * 2 < closestFoodinRange.size + this.size) {
              this.eat(closestFoodinRange);
              this.eating = true;
            }


          }



        }


      }


    }


    findClosestFood() { // locate closest food
      let foodsdistances = [];
      for (let food = 0; food < world.foods.food2.length; food++) {
        let dist = this.loc.distance(world.foods.food2[food].loc);
        foodsdistances.push(dist);
      }
      

  
      let lowestDistance = Math.min(...foodsdistances);
      let lowestDistanceIndex = foodsdistances.indexOf(lowestDistance);
      let closestFood = world.foods.food2[lowestDistanceIndex];
      return closestFood;
  
    }

    seek(target) { // chase anything it needs too
      let desired = JSVector.subGetNew(target.loc, this.loc);
      desired.normalize();
      desired.multiply(this.maxSpeed);
      let steer = JSVector.subGetNew(desired, this.vel);
      steer.limit(this.maxForce);
      this.vel = desired;
    }


    
  
   //  applyForce(force) {
   //    this.acc.add(force);
   //  }
  
    eat(foodEaten) {
      if (foodEaten.statBlock.nourishment > 0) {
        foodEaten.statBlock.nourishment--;
        foodEaten.size = foodEaten.size * (foodEaten.statBlock.nourishment / 100);
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