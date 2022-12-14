class Creature5 extends Creature {
  // properties
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = loc;
    this.acc = new JSVector(0, 0);
    this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1)
    this.ctx = wrld.ctxMain;
    this.clr = this.getRandomColor();
    this.tempclr = this.clr;
    this.rad = 10;
    this.wWidth = wrld.dims.width;
    this.wHeight = wrld.dims.height;
    this.size = 5;
    this.sizeFactor = 1;
    this.rotation = 0;
    this.maxSpeed = 2;
    this.desiredSep = 25;
    this.maxSpeed = 2;
    this.maxForce = 1;
    this.movement = 0;
    this.sleepTime = getRandomInt(250, 500);
    this.stamina = getRandomInt(250, 3000);
    this.nourishmentDecInterval = getRandomInt(3, 7);
    this.nourishmentFrameCounter = 0;
    this.maxAge = getRandomInt(400, 3000);
    this.searchingForFood = true;
  }
  //  methods
  run(c) {
    this.interaction(c);
    this.render();
    this.checkEdges();
  }

  interaction(c) {
    if (!this.isDead && !this.eating) {
      if (this.movement <= this.stamina) {
        this.clr = this.tempclr;
        this.sleeping = false;
        this.age++;
        this.movement++;
        let netForce = new JSVector(0, 0);
        let coh = this.cohesion(c);
        let sep = this.seperate(c);
        netForce.add(coh);
        netForce.add(sep)
        this.acc.add(netForce);
        if (this.searchingForFood) {
          this.searchForFood();
        }
        this.looseNourishment();
        this.checkHealth();
        this.update();
      }
      else {
        this.sleeping = true;
        this.clr = "#808080";
        this.movement++;
        if (this.movement >= this.sleepTime + this.stamina) {
          this.movement = 0;
        }
      }
    } else if (!this.isDead && this.eating) {
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

  looseNourishment() {
    this.nourishmentFrameCounter++;
    if (this.nourishmentFrameCounter > this.nourishmentDecInterval) {
      this.nourishmentFrameCounter = 0;
      this.nourishment--;
    }
  }

  checkHealth(v) {
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


  update() {
    this.rotation++;
    this.vel.add(this.acc);
    this.vel.limit(1);
    this.loc.add(this.vel);
  }

  checkEdges() {
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

  render() {
    let ctx = this.ctx;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.beginPath();
    ctx.rotate(Math.PI / 360 * this.rotation);
    ctx.strokeStyle = this.clr;
    ctx.fillStyle = this.clr;
    ctx.moveTo(-this.size * this.sizeFactor, 0);
    ctx.lineTo(this.size * this.sizeFactor, 0);
    ctx.lineTo(this.size * this.sizeFactor, 5);
    ctx.lineTo(this.size * this.sizeFactor + 10, 0);
    ctx.lineTo(this.size * this.sizeFactor, -5);
    ctx.lineTo(0, -this.size * this.sizeFactor - 10);
    ctx.lineTo(-this.size * this.sizeFactor, -5);
    ctx.lineTo(-this.size * this.sizeFactor - 10, 0);
    ctx.lineTo(-this.size * this.sizeFactor, 5);
    ctx.lineTo(0, this.size * this.sizeFactor + 10);
    ctx.lineTo(this.size * this.sizeFactor, 5);
    ctx.lineTo(this.size * this.sizeFactor, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  cohesion(c) {
    let neighbordist = 400;
    let sum = new JSVector(0, 0);
    let count = 0;
    let steeringForce = new JSVector(0, 0);
    for (let other = 0; other < c.length; other++) {
      let d = this.loc.distanceSquared(c[other].loc);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(c[other].loc);
        count++;
      }
    }

    if (count > 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxSpeed);
      let steer = JSVector.subGetNew(sum, this.vel);
      steeringForce = steer;
    } else {
      steeringForce = new JSVector(0, 0);
    }

    return steeringForce;
  }

  seperate(c) {
    // A vector for average of separation forces
    let sum = new JSVector(0, 0);
    let ds = this.desiredSep * this.desiredSep;
    let steer = new JSVector(0, 0);
    let count = 0;
    for (let other = 0; other < c.length; other++) {
      let d = this.loc.distanceSquared(c[other].loc);
      if (d < ds && d > 0) {
        let diff = JSVector.subGetNew(this.loc, c[other].loc);
        diff.normalize();
        sum.add(diff);
        count++;

        //mating
        //world.creatures.herb1.push(new Creature5(this.loc, new JSVector(0, 0), 6, this));
      }
    }

    if (count !== 0) {
      sum.divide(count);
      sum.normalize();
      sum.multiply(this.maxSpeed);
      steer = JSVector.subGetNew(sum, this.vel);
      steer.limit(this.maxForce)
    }
    let separationForce = steer;
    return separationForce;
  }

  searchForFood() {
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

  findClosestFood() {
    let foodsdistances = [];
    for (let food = 0; food < world.foods.food2.length; food++) {
      let dist = this.loc.distance(world.foods.food2[food].loc);
      foodsdistances.push(dist);
    }

    let lowestDistance = Math.min(...foodsdistances);
    let lowestDistanceIndex = foodsdistances.indexOf(lowestDistance);
    let closestFood = world.foods.food2[lowestDistanceIndex];
    return closestFood;

    // let lowestParticleDistance = 0;
    // let lowestParticleDistanceArrayPath;
    // let foodsystemdistances = [];
    // for (let foodSys = 0; foodSys < world.foods.pSys2.length; foodSys++) {
    //   for (let food = 0; food < world.foods.pSys2[foodSys].foodList.length; food++) {
    //     let dist = this.loc.distance(world.foodspSys2[foodSys].foodList[food].loc);
    //     if (dist < lowestDistance) {
    //       lowestParticleDistance = dist;
    //       lowestParticleDistanceArrayPath = [foodSys, food];
    //     }
    //   }
    // }

    // let closestFood;
    // if(lowestParticleDistance == 0) {
    //   closestFood = world.foods.food2[lowestDistanceIndex];
    // } else{
      
    // }
    
    //let lowestDistanceSys = Math.min(...foodsyspartdist);
    //let lowestDistanceIndexSys = foodsystemdistances.indexOf(lowestDistanceSys);

    
    // if (lowestDistance <= lowestDistanceSys) {
    //   closestFood = world.foods.food2[lowestDistanceIndex];
    // } else {
    //   //closestFood = world.foods.pSys2[].foodList[lowestDistanceIndex];
    // }
    
  }

  seek(target) {
    let desired = JSVector.subGetNew(target.loc, this.loc);
    let ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.clr;
    ctx.fillStyle = this.clr;
    ctx.moveTo(target.loc.x, target.loc.y);
    ctx.lineTo(this.loc.x, this.loc.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    desired.normalize();
    desired.multiply(this.maxSpeed);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
    this.vel = desired;
    //this.applyForce(steer);
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