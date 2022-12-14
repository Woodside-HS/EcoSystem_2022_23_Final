class MMHerb2 extends Creature {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    // this.loc = loc;
    this.loc = new JSVector(300, 300);
    this.vX = Math.random() * (0.5 - -0.5) + -0.5;
    this.vY = Math.random() * (0.5 - -0.5) + -0.5;
    this.vel = new JSVector(this.vX, this.vY);
    this.size = sz;
    this.world = wrld;
    this.isDead = false;
    // this.hp = 100;
    this.count = 0;
    // this.clrR = "red";
    // this.clrG = "green";
    this.clr = "green";
    // this.statusBlock = { //! using this for refrence
    //     searchFood:true,
    //     searchMate:true,
    //     eating:false,
    //     sprint:false,
    //     sleeping:false,
    //     attack:false,
    //     deathProc:false
    //  };
    //  this.dataBlock = {//  status block
    //     health: 100,
    //     isDead: false,
    //     nourishment: 100,
    //     lifeSpan:Math.random()*3000,//  miliseconds
    //     age:0,
    //     numOffspring:3,
    //     maxSpeed: 1,
    //     maxSprintSpeed: 1,
    //     scentValue: 100,
    //     sightValue: 100,
    //     weight:10,
    //  };
  }
  run() {
    this.render();
    this.update();

    this.eatFood();
    this.checkEdges();
  }
  render() {
    let ctxMain = world.ctxMain;
    ctxMain.save();
    ctxMain.beginPath();
    ctxMain.translate(this.loc.x, this.loc.y);
    ctxMain.fillText(this.dataBlock.health, -10, -20);
    ctxMain.moveTo(-10, -10);
    ctxMain.lineTo(10, -10);
    ctxMain.lineTo(10, 10);
    ctxMain.lineTo(-10, 10);
    ctxMain.closePath();
    ctxMain.fillStyle = this.clr;
    ctxMain.strokeStyle = "black";
    ctxMain.fill();
    ctxMain.stroke();
    ctxMain.restore();
  }
  update() {
    this.loc.add(this.vel);

    if (this.dataBlock.health <= 0) {
      //   this.isDead = true;
      this.dataBlock.isDead = true;
    }
    if (this.count++ == 10) {
      this.dataBlock.health--;
      this.count = 0;
    }
    if (this.dataBlock.health > 100) {
      this.dataBlock.health = 100;
    }
  }
  eatFood() {
    let desiredDist = 50;

    for (let i = 0; i < world.foods.food2.length; i++) {
      // start of food 2
      let food2 = world.foods.food2[i]; //! temp value that ill del later
      let dist = this.loc.distance(food2.loc);
      if (dist < desiredDist) {
        let diff = JSVector.subGetNew(food2.loc, this.loc);
        diff.normalize();
        this.vel.add(diff);
        this.vel.limit(2);
        this.clr = "red";
        if (dist < 10) {
          food2.vel = new JSVector(0, 0);
          this.vel = new JSVector(0, 0);
          //   this.vel.multiply(0.1);
          this.dataBlock.health =
            this.dataBlock.health + food2.statBlock.health;
          food2.statBlock.health = 0;
          this.vel.x = this.vX;
          this.vel.y = this.vY;
        }
      } else {
        this.clr = "green";
      }
    } // end of food2

    for (let i = 0; i < world.foods.pSys1.length; i++) {
      for (let j = 0; j < world.foods.pSys1[i].mmParticles.length; j++) {
        let particle = world.foods.pSys1[i].mmParticles[j];
        let dist = this.loc.distance(particle.loc);
        if (dist < desiredDist) {
          let diff = JSVector.subGetNew(particle.loc, this.loc);
          diff.normalize();
          this.vel.add(diff);
          this.vel.limit(2);
          this.clr = "red";
          if (dist < 10) {
            particle.vel = new JSVector(0, 0);
            this.vel = new JSVector(0, 0);
            // this.vel.multiply(0.1);
            this.dataBlock.health =
              this.dataBlock.health + particle.statBlock.health;
            particle.statBlock.health = 0;
            this.vel.x = this.vX;
            this.vel.y = this.vY;
          }
        } else {
          this.clr = "green";
        }
      }
    }
  }
  checkEdges() {
    let dims = this.world.dims;
    if (this.loc.x > dims.right) this.vel.x = -this.vel.x;
    if (this.loc.x < dims.left) this.vel.x = -this.vel.x;
    if (this.loc.y > dims.bottom) this.vel.y = -this.vel.y;
    if (this.loc.y < dims.top) this.vel.y = -this.vel.y;
  }
}
