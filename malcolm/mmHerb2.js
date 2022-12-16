class MMHerb2 extends Creature {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    // this.loc = loc;
    this.loc = new JSVector(
      Math.random() * (500 - 100) + 100,
      Math.random() * (500 - 100) + 100
    );
    this.vX = Math.random() * (0.5 - -0.5) + -0.5;
    this.vY = Math.random() * (0.5 - -0.5) + -0.5;
    this.vel = new JSVector(this.vX, this.vY);
    this.size = sz;
    this.world = wrld;
    this.tickRate = 40;
    this.count = 0;
    this.angle = 0;
    this.mated = false;

    this.clr = "red";
  }
  run() {
    this.render();
    this.update();

    this.eatFood();
    this.checkEdges();
    this.mate();
  }
  render() {
    let ctxMain = world.ctxMain;
    this.angle += 0.5;
    ctxMain.save();
    ctxMain.beginPath();
    ctxMain.translate(this.loc.x, this.loc.y);
    ctxMain.fillText(this.dataBlock.health, -10, -20);
    ctxMain.rotate(this.angle);
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
      this.dataBlock.isDead = true;
    }
    if (this.count++ == this.tickRate) {
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
      let food2 = world.foods.food2[i];
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
      let pS1 = world.foods.pSys1[i].particles;
      // if (mmPS1 > 1) {
      for (let j = 0; j < pS1.length; j++) {
        let particle = pS1[j];
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
      // }
    }
  }
  checkEdges() {
    let dims = this.world.dims;
    if (this.loc.x > dims.right) this.vel.x = -this.vel.x;
    if (this.loc.x < dims.left) this.vel.x = -this.vel.x;
    if (this.loc.y > dims.bottom) this.vel.y = -this.vel.y;
    if (this.loc.y < dims.top) this.vel.y = -this.vel.y;
  }
  mate() {
    if (!this.mated) {
      let desiredDist = 20;
      // console.log(world.creatures.herb2.length);
      let herb2 = world.creatures.herb2;
      for (let i = 0; i < herb2.length; i++) {
        let other = herb2[i];
        if (this != other) {
          let dist = this.loc.distance(other.loc);
          if (desiredDist > dist) {
            let diff = JSVector.subGetNew(other.loc, this.loc);
            diff.normalize();
            this.vel.add(diff);
            this.vel.limit(2);

            if (dist < 5) {
              this.vel = new JSVector(0, 0);
              world.creatures.herb2.push(
                new MMHerb2(this.loc, this.vel, this.size, this.world)
              );
              this.vel.x = this.vX;
              this.vel.y = this.vY;

              this.mated = true;
            }
          }
        }
      }
    }
  }
  sprint(predLoc) {

  }
}
