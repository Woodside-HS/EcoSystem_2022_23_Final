class MMFood1 extends Food {
  // properties
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = loc;
    this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.isDead = false;
    this.count = 0;
    this.tickRate = Math.random() * (50 - 20) + 20; //the tickrate of health decay
    // this.tickRate = 1;
    this.clr = "pink";
    this.angle = Math.random() * (60 - 0);

    // this.statBlock = {//  properties  //! del later
    //     health: 100,
    //     nourishment: 100,
    //     lifeSpan:30000,
    //     opacity:1.0,
    //     foodPts:100
    // };
  }
  //  methods
  run() {
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
    this.angle += 0.1;
    this.ctxMain.save();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.statBlock.health, -15, -15);
    this.ctxMain.rotate(this.angle);
    this.ctxMain.moveTo(0, -10);
    this.ctxMain.lineTo(-10, -10);
    this.ctxMain.lineTo(-10, 0);
    this.ctxMain.lineTo(10, 0);
    this.ctxMain.lineTo(10, 10);
    this.ctxMain.lineTo(0, 10);
    this.ctx.closePath();
    this.ctxMain.fillStyle = this.clr;
    this.ctxMain.strokeStyle = "black";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  getRandomColor() {
    //  List of hex color values for movers
    let colors = [
      "#25AA34",
      "#18CC2e",
      "#389925",
      "#11AA99",
      "#99CC00",
      "#11FF65",
    ];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
  checkEdges() {
    let dims = this.world.dims;
    if (this.loc.x > dims.right) this.vel.x = -this.vel.x;
    if (this.loc.x < dims.left) this.vel.x = -this.vel.x;
    if (this.loc.y > dims.bottom) this.vel.y = -this.vel.y;
    if (this.loc.y < dims.top) this.vel.y = -this.vel.y;
  }
}
