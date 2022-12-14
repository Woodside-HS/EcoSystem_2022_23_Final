class MMParticle extends Food {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    // this.loc = new JSVector(
    //   Math.random() * wrld.dims.width - wrld.dims.width / 2,
    //   Math.random() * wrld.dims.height - wrld.dims.height / 2
    // );
    // this.loc = loc;
    this.loc = new JSVector(
      Math.random() * (500 - 100) + 100,
      Math.random() * (500 - 100) + 100
    );
    //console.log(this.loc);
    // console.log(this.loc);
    this.vX = Math.random() * (1.1 - -0.1) + -0.1;
    this.vY = Math.random() * (1.1 - -0.1) + -0.1;
    this.vel = new JSVector(this.vX, this.vY);
    // this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    // this.statBlock = statBlock;

    this.count = 0;
    this.isDead = false;
  }
  run() {
    this.render();
    this.update();
    this.checkEdges();
  }
  render() {
    this.ctxMain.save();
    this.ctxMain.beginPath();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.statBlock.health, -10, -20);
    // this.ctxMain.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
    this.ctxMain.moveTo(0, 0);
    this.ctxMain.lineTo(20, 20);
    this.ctxMain.lineTo(-20, 20);
    this.ctxMain.fillStyle = "red";
    this.ctxMain.strokeStyle = "black";
    this.ctxMain.closePath();

    this.ctxMain.fill();
    this.ctxMain.stroke();
    this.ctxMain.restore();
  }
  update() {
    if (this.statBlock.health <= 0) {
      this.isDead = true;
    }
    if (this.count++ >= 25) {
      this.statBlock.health = this.statBlock.health - 1;
      this.count = 0;
    }
    this.loc.add(this.vel);
  }
  checkEdges() {
    let dims = this.world.dims;
    if (this.loc.x > dims.right) this.vel.x = -this.vel.x;
    if (this.loc.x < dims.left) this.vel.x = -this.vel.x;
    if (this.loc.y > dims.bottom) this.vel.y = -this.vel.y;
    if (this.loc.y < dims.top) this.vel.y = -this.vel.y;
  }
}
