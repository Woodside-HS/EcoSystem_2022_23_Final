class AdrianWilsonCreature53 extends Creature {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.acc = new JSVector(0, 0);
        this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1)
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.rad = 10;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.size = 5;
        this.sizeFactor = 1;
        this.maxSpeed = 3;
        this.maxForce = 1;
        this.desiredSep = 25;
        this.clr = "#000000";
        this.numSegs = 10;
        this.segLength = 5;
        this.segments = [];
        this.dataBlock.nourishment = getRandomInt(30, 500);
    }

    loadSegments() {
      let loc = new JSVector(this.loc.x, this.loc.y);
      for(let i = 0; i < this.numSegs; i++){
          let vel = new JSVector(this.vel.x, this.vel.y);
          vel.setMagnitude(this.segLength);
          let newVector = JSVector.subGetNew(loc, vel);
          this.segments.push(newVector); 
          loc = new JSVector(newVector.x, newVector.y);
      }
  }

    //  methods
    run(v) {
        this.interaction(v);
        this.update();
        this.render();
        this.checkEdges();
    }

    interaction(vehicles) {
      this.dataBlock.nourishment--;
      this.checkHealth();
        //  flock force is the accumulation of all forces
        let flockForce = new JSVector(0,0);
        // set up force vectors to be added to acc
        let ali = this.align(vehicles);
        let sep = this.separate(vehicles);
        //  add each of these to flockForce
        
        flockForce.add(ali);
        flockForce.add(sep);
        //flockForce.add(seek);
        this.acc.add(flockForce);

        this.searchForFood();
    }

    checkHealth() {
      if (this.dataBlock.nourishment <= 0){
        this.dataBlock.health--;
      }
      if (this.dataBlock.health <= 0) {
        this.dataBlock.isDead = true;
      }
    }

    applyForce(force) {
      this.acc.add(force);
    }

    separate(v) {
      // A vector for average of separation forces
      let sum = new JSVector(0, 0);
      let ds = this.desiredSep*this.desiredSep;
      let steer = new JSVector(0, 0); 
      let count = 0;
      for (let other = 0; other < v.length; other++) {
        let d = this.loc.distanceSquared(v[other].loc);
        if(d < ds && d > 0){
          let diff = JSVector.subGetNew( this.loc, v[other].loc);
          diff.normalize();
          sum.add(diff);
          count++;
        }
      }
      
      if(count !== 0){
        sum.divide(count);
        sum.normalize();
        sum.multiply(this.maxSpeed);
        steer = JSVector.subGetNew(sum, this.vel);
        steer.limit(this.maxForce)
      }
      let separationForce = steer;
      return separationForce;
    }

    align(v) {
      let sum = new JSVector();
      let count = 0;
      for (let i = 0; i < v.length; i++) {
        let dS = this.loc.distanceSquared(v[i].loc);
        if (dS>0 && dS < Math.pow(this.desiredCoh,2)) {
          count++;
          sum.add(v[i].vel);
        }
      }
      if (count > 0) {
        sum.divide(count);
      } else {
        sum = new JSVector(0, 0);
      }
      let steeringForce = sum;
      return steeringForce;
    }

    update() {
      this.acc.limit(this.maxForce);
      this.vel.add(this.acc);
      this.acc = new JSVector();
      this.vel.limit(this.maxSpeed);
      this.loc.add(this.vel);


      let loc = new JSVector(this.loc.x, this.loc.y);
      let distance;
      for(let i = 0; i<this.segments.length; i++){
        tempVector = new JSVector(this.segments[i].x, this.segments[i].y);
        tempVector = JSVector.subGetNew(tempVector, loc);
        tempVector.limit(this.vel.getMagnitude());
        tempVector.multiply(-1);
        this.segments[i].add(tempVector);
        distance = this.segments[i].distance(loc);
        if(distance<this.segLength){
          tempVector.setMagnitude(this.segLength - distance);
          this.segments[i].sub(tempVector); 
        }
        loc = this.segments[i];
      }
    }

    checkEdges() {
        if(this.loc.x<world.dims.left){
          this.vel.x = -this.vel.x;
        }
        if(this.loc.x>world.dims.right){
          this.vel.x = -this.vel.x;
        }
        if(this.loc.y>world.dims.top){
          this.vel.y = -this.vel.y;
        }
        if(this.loc.y<world.dims.bottom){
          this.vel.y = -this.vel.y;
        }
      }

    render() {
      let ctx = this.ctx;
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
      ctx.beginPath();
      ctx.strokeStyle = this.clr;
      ctx.fillStyle = this.clr;
      ctx.moveTo(0, -this.size);
      ctx.lineTo(-this.size, this.size);
      ctx.lineTo(0, 0);
      ctx.lineTo(this.size, this.size);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    searchForFood() { //search for food
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

  findClosestFood() { // locate closest food
    let foodsdistances = [];
    for (let food = 0; food < world.foods.food3.length; food++) {
      let dist = this.loc.distance(world.foods.food3[food].loc);
      foodsdistances.push(dist);
    }

    let lowestDistance = Math.min(...foodsdistances);
    let lowestDistanceIndex = foodsdistances.indexOf(lowestDistance);
    let closestFood = world.foods.food3[lowestDistanceIndex];
    return closestFood;
  }

  seek(target) { // chase anything it needs too
    let desired = JSVector.subGetNew(target.loc, this.loc);
    let ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#1dc714";
    ctx.fillStyle = "#1dc714";
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(target.loc.x, target.loc.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();  
    desired.normalize();
    desired.multiply(this.maxSpeed);
    let steer = JSVector.subGetNew(desired, this.vel);
    steer.limit(this.maxForce);
      
    this.vel = desired;
  }

  eat(foodEaten) {
    if (foodEaten.statBlock.nourishment > 0) {
      foodEaten.statBlock.nourishment--;
      foodEaten.size = foodEaten.size * (foodEaten.statBlock.nourishment / 100);
      this.dataBlock.nourishment++;
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

