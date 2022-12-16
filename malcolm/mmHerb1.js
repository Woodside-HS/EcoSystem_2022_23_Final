class MMHerb1 extends Creature {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    // this.loc = loc;
    this.loc = new JSVector(300, 300);
    this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.count = 0;
    this.tickRate = Math.random() * (50 - 20) + 20;
  }

  run() {
    this.update();
    this.render();
    this.eatFood();
    this.mate();
    this.checkEdges();
  }
  update() {
    if (this.statusBlock.health <= 0) {
      this.statusBlock.isDead = true;
    }
    if (this.statusBlock.health > 100) {
      this.statusBlock.health = 100;
    }
    if (this.count++ >= this.tickRate) {
      this.statusBlock.health--;
      this.count = 0;
    }
    this.loc.add(this.vel);
  }
  render() {
    this.ctxMain.save();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.moveTo(-10, -10);
    this.ctxMain.lineTo(0, 0);
    this.ctxMain.stroke();
    this.ctxMain.fill();
    this.ctxMain.restore();
  }
  eatFood() {
    let desiredDist = 50;
    for (let i = 0; i < world.foods.food1.length; i++) {
      let food1 = world.foods.food1[i];
      let dist = this.loc.distance(food1.loc);
      if (dist < desiredDist) {
        let diff = JSVector.subGetNew(food1.loc, thisloc);
        diff.normalize();
        this.vel.add(diff);
        this.vel.limit(2);
        if (dist > 10) {
          this.vel = new JSVector(0, 0);
          this.statusBlock.health += food1.statusBlock.health;
          food1.statusBlock.health = 0;
          this.vel.x = this.vX;
          this.vel.y = this.vY;
        }
      }
    }
  }
  mate() {}
  checkEdges() {}
}
