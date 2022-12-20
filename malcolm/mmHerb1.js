class MMHerb1 extends Creature {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = loc;
    // this.loc = new JSVector(Math.random() * 100 - 50 + 50, Math.random() * 100 - 50 + 50);
    this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.count = 0;
    this.tickRate = Math.random() * (50 - 20) + 20;
    this.angle = 0;
    this.mated = false
  }

  run() {
    this.update();
    this.render();
    this.eatFood();
    // this.mate();
    this.checkEdges();

  }
  update() {
    if (this.dataBlock.health <= 0) {
      this.dataBlock.isDead = true;
    }
    if (this.dataBlock.health > 100) {
      this.dataBlock.health = 100;
    }
    if (this.count++ >= this.tickRate) {
      this.dataBlock.health--;
      this.count = 0;
    }
    this.loc.add(this.vel);


    let desiredDist = 20;
    for(let i = 0; i < this.world.creatures.herb1.length; i++) {
      let other = this.world.creatures.herb1[i];
      if(other != this) {
        let dist = this.loc.distance(other.loc)
        if(dist < desiredDist) {
          let diff = JSVector.subGetNew(other.loc, this.loc);
          diff.normalize();
          this.vel.add(diff);
          this.vel.limit(2);   
          if(dist < 10) {
            this.vel.x = -this.vel.x
            this.vel.y = -this.vel.y

          }
        }
      }
    }
  }
  render() {
    this.angle += 0.5
    this.ctxMain.save();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.dataBlock.health, -10, -20);
    this.ctxMain.rotate(this.angle)
    this.ctxMain.moveTo(-5, 0);
    this.ctxMain.lineTo(5, 0);
    this.ctxMain.fillStyle = "black";
    this.ctxMain.strokeStyle = "white";
    this.ctxMain.stroke();
    this.ctxMain.fill();
    this.ctxMain.restore();
  }
  eatFood() {
    let desiredDist = 50;
    for (let i = 0; i < world.foods.food1.length; i++) {
      let food = world.foods.food1[i];
      let dist = this.loc.distance(food.loc);
      if (dist < desiredDist) {
        let diff = JSVector.subGetNew(food.loc, this.loc);
        diff.normalize();
        this.vel.add(diff);
        this.vel.limit(2);
        if (dist > 10) {
          this.vel = new JSVector(0, 0);
          this.dataBlock.health += food.statBlock.health;
          food.statBlock.health = 0;
          this.vel.x = this.vX;
          this.vel.y = this.vY;
        }
      }
    }
  }
  mate() {
    if (!this.mated) {
      let desiredDist = 20;
      // console.log(world.creatures.herb1.length);
      let herb1 = world.creatures.herb1;
      for (let i = 0; i < herb1.length; i++) {
        let other = herb1[i];
        if (this != other) {
          let dist = this.loc.distance(other.loc);
          if (desiredDist > dist) {
            let diff = JSVector.subGetNew(other.loc, this.loc);
            diff.normalize();
            this.vel.add(diff);
            this.vel.limit(2);

            if (dist < 5) {
              this.vel = new JSVector(0, 0);
              world.creatures.herb1.push(
                new MMHerb1(this.loc, this.vel, this.size, this.world)
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
  checkEdges() {}
}
