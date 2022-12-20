class MMFood3 extends Food {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = loc;
    // this.loc = new JSVector(200, 200)
    this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.isDead = false;
    this.count = 0;
    this.tickRate = Math.random() * (100 - 50) + 50;
    this.angle = 0;
  }
  run() {
    // console.log("hello world");
    this.update();
    this.render();
    this.checkEdges();
  }
  update() {
    if (this.statBlock.health <= 0) {
      this.isDead = true;
    }
    // decays health
    if (this.count++ >= this.tickRate) {
      this.statBlock.health--;
      this.count = 0;
    }
    this.loc.add(this.vel);
  }
  render() {
    this.angle += 0.01;
    this.ctxMain.save();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.statBlock.health, -10, -20);

    this.ctxMain.moveTo(-5, -5); // makes and X $$
    this.ctxMain.lineTo(5, 5);
    this.ctxMain.moveTo(5, -5);
    this.ctxMain.lineTo(-5, 5); //$$

    this.ctxMain.rotate(this.angle);
    this.ctxMain.moveTo(-8, -15); // makes a squer with no corners $$
    this.ctxMain.lineTo(8, -15);
    this.ctxMain.moveTo(15, -8);
    this.ctxMain.lineTo(15, 8);
    this.ctxMain.moveTo(8, 15);
    this.ctxMain.lineTo(-8, 15);
    this.ctxMain.moveTo(-15, 8);
    this.ctxMain.lineTo(-15, -8); //$$
    this.ctxMain.fillStyle = "black";
    this.ctxMain.strokeStyle = "black";
    this.ctxMain.stroke();
    this.ctxMain.fill();
    this.ctxMain.restore();
  }
  checkEdges() {
    let dims = this.world.dims;
    if (this.loc.x > dims.right) this.vel.x = -this.vel.x;
    if (this.loc.x < dims.left) this.vel.x = -this.vel.x;
    if (this.loc.y > dims.bottom) this.vel.y = -this.vel.y;
    if (this.loc.y < dims.top) this.vel.y = -this.vel.y;
  }
}
