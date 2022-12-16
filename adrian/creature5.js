class AdrainCreature5 extends Creature {
  // properties
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = loc; // creature location
    this.acc = new JSVector(0, 0); // creature acceleration
    this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1) // creature velocity
    this.ctx = wrld.ctxMain; //ctx
    this.clr = this.getRandomColor(); // creature get random color
    this.tempclr = this.clr; // reference color used as constant
    this.rad = 10; // radius references for everything made in this creature
    this.wWidth = wrld.dims.width;
    this.wHeight = wrld.dims.height;
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
    this.maxAge = getRandomInt(400, 3000); // age
    this.searchingForFood = true;
    this.mateInterval = getRandomInt(1000, 5000); // how long between mating sessions
    this.mateTime = 0; // mating tick
  }
  //  methods
  run(c) {
    this.checkEdges(); // check edges
    this.interaction(c); // update func
    this.render(); // render
  }

  interaction(c) { // everything goes down here
    if (!this.isDead && !this.eating) { // if not dead or not eating do this
      if (this.movement <= this.stamina) { // make sure its not out of stamina
        this.clr = this.tempclr;
        this.sleeping = false;
        this.age++;
        this.movement++;
        let netForce = new JSVector(0, 0);
        netForce.add(coh);
        netForce.add(sep)
        this.acc.add(netForce); // seperation and cohesion forces applied to netforce and added to acc
        if (this.searchingForFood) {
          this.searchForFood(); //search for food
        }
        this.looseNourishment();
        this.checkHealth();
        this.searchMate();
        this.update();
      }
      else { // if movement has overgone stamina it will get to tired and need to regen so here it sleeps it becomes grey when sleeping
        this.sleeping = true;
        this.clr = "#808080";
        this.movement++;
        if (this.movement >= this.sleepTime + this.stamina) {
          this.movement = 0;
        }
      }
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
    this.rotation++;
    this.vel.add(this.acc);
    this.vel.limit(1);
    this.loc.add(this.vel);
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

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.beginPath();
        ctx.rotate(Math.PI/360 * this.rotation);
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

