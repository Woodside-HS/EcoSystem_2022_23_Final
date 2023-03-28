class AdrianCreature5V2 extends Creature {
  // properties
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = loc; // creature location
    this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.vel.limit(0.5);
    this.ctx = wrld.ctxMain; //ctx
    this.clr = this.getRandomColor(); // creature get random color
    this.tempclr = this.clr; // reference color used as constant
    this.rad = 10; // radius references for everything made in this creature
    this.wWidth = wrld.dims.width;
    this.wHeight = wrld.dims.height;
    this.size = 5; // size references for everything made in this creature
    this.sizeFactor = 1; // size factor
    this.maxSpeed = 2; // max speed
    this.desiredSep = 25; // how far they are gonna be from each other
    this.maxSpeed = 2; // max speed
    this.maxForce = 1; // max force
    this.movement = 0; // how much they have moved
    this.sleepTime = getRandomInt(250, 500); // how long they sleep for
    this.stamina = getRandomInt(250, 3000); // how long they don't sleep for
    this.nourishmentDecInterval = getRandomInt(3, 7); // how fast nourishment decreases
    this.nourishmentFrameCounter = 0; // keep track of nourishment dec
    this.maxAge = getRandomInt(400, 3000); // age
    this.searchingForFood = true;
    this.mateInterval = getRandomInt(1000, 5000); // how long between mating sessions
    this.mateTime = 0; // mating tick

    this.numSegs = 3;
    this.segLength = 10;
    this.segments = [];
    this.loadSegments();
  }
  //  methods
  run(c) {
    this.checkEdges(); // check edges
    this.interaction(world.creatures.herb3); // update func
    this.render(); // render
  }

  loadSegments() {
    let ploc = new JSVector(this.loc.x, this.loc.y);
    for(let i = 0; i<this.numSegs; i++){
        let vel2 = new JSVector(this.vel.x, this.vel.y);
        vel2.setMagnitude(this.segLength);
        let vec = JSVector.subGetNew(ploc, vel2);
        this.segments.push(vec); //potential error
        ploc = new JSVector(vec.x, vec.y);
    }
  }

  interaction(c) { // everything goes down here
    if (!this.isDead && !this.eating) { // if not dead or not eating do this
      this.clr = this.tempclr;
      this.sleeping = false;
      this.age++;
      this.movement++;
      if (this.searchingForFood) {
        this.searchForFood(); //search for food
      }
      this.looseNourishment();
      this.checkHealth();
      this.update();
    } else if (!this.isDead && this.eating) { // happens if eating
      this.clr = this.tempclr;
      this.sleeping = false;
      this.age++;
      this.movement++;
      if (this.searchingForFood) {
        this.searchForFood();
      }
      this.looseNourishment();
      this.checkHealth(c);
      this.update();
    }
    else {
      this.clr = "#000000";
    }
  }



  looseNourishment() { // loosing nourishment over time
    this.nourishmentFrameCounter++;
    if (this.nourishmentFrameCounter > this.nourishmentDecInterval) {
      this.nourishmentFrameCounter = 0;
      this.nourishment--;
    }
  }

  checkHealth(v) { // check nourishment and do stuff  to health and speed based on how much nourishment it has
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


  update() { // gets called in the interaction func
    this.vel.limit(1);
    this.loc.add(this.vel);//moves the head
    let temp;
    let ploc = new JSVector(this.loc.x, this.loc.y);
    let dis;
    for(let i = 0; i<this.segments.length; i++){
        temp= new JSVector(this.segments[i].x, this.segments[i].y);
        temp = JSVector.subGetNew(temp, ploc);
        temp.limit(this.vel.getMagnitude());
        temp.multiply(-1);
        this.segments[i].add(temp);
        dis = this.segments[i].distance(ploc);
        if(dis<this.segLength){
            temp.setMagnitude(this.segLength-dis);
            this.segments[i].sub(temp); 
        }
        ploc = this.segments[i];
    }
  }

  checkEdges() { // make sure its not outside of world bounds
    if (this.loc.x < world.dims.left) {
      this.vel.x = -this.vel.x;
    }
    if (this.loc.x > world.dims.right) {
      this.vel.x = -this.vel.x;
    }
    if (this.loc.y > world.dims.top) {
      this.vel.y = -this.vel.y;
    }
    if (this.loc.y < world.dims.bottom) {
      this.vel.y = -this.vel.y;
    }
  }

  render() { // render stuff 
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    for (let i = 1; i < this.segments.length; i++) {
      ctx.beginPath();
      ctx.arc(this.segments[i].x, this.segments[i].y, 5, 0, 2 * Math.PI);
      ctx.moveTo(this.segments[i].x, this.segments[i].y);
      ctx.lineTo(this.loc.x, this.loc.y);
      ctx.fillStyle = "blue";
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }

  searchForFood() { //search for food
    if (this.searchingForFood) {
      let closestFoodinRange = this.findClosestFood();
      try {
        let closestFoodParticleinRange = this.findClosestFoodParticle();
        if (closestFoodinRange > closestFoodParticleinRange) {
          closestFoodinRange = closestFoodParticleinRange;
        }
      }
      catch {
      }

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

  findClosestFoodParticle() { // locate clocest food particle in a system
    let lowestParticleDistances = [];
    for (let foodSys = 1; foodSys < world.foods.pSys2.length; foodSys++) {
      let lowestParticleDist;
      for (let food = 1; food < world.foods.pSys2[foodSys].foodList.length; food++) {
        let dist = this.loc.distance(world.foods.pSys2[foodSys].foodList[food].loc);
        let prevdist = this.loc.distance(world.foods.pSys2[foodSys - 1].foodList[food - 1].loc);
        if (dist < prevdist) {
          lowestParticleDist = world.foods.pSys2[foodSys].foodList[food];
        }
      }
      lowestParticleDistances.push(lowestParticleDist);
    }

    let foodsdistances = [];
    for (let food = 0; food < lowestParticleDistances.length; food++) {
      let dist = this.loc.distance(lowestParticleDistances[food].loc);
      foodsdistances.push(dist);
    }

    let lowestDistance = Math.min(...foodsdistances);
    let lowestDistanceIndex = foodsdistances.indexOf(lowestDistance);
    let closestFood = lowestParticleDistances[lowestDistanceIndex];

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

  applyForce(force) {
    this.acc.add(force);
  }

  eat(foodEaten) {
    if (foodEaten.statBlock.nourishment > 0) {
      foodEaten.statBlock.nourishment--;
      foodEaten.size = foodEaten.size * (foodEaten.statBlock.nourishment / 100);
    }
  }

  getRandomColor() {
    //  List of hex color values for movers
    let colors = [
      "#25AA34",
      "#18CC2e",
      "#389925",
      "#11AA99",
      "#99CC00",
      "#11FF65"
    ];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
}