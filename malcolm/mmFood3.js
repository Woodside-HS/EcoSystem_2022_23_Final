class MMFood3 extends Food {
  // properties
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = new JSVector(loc.x, loc.y);
    // this.vel = new JSVector(vel.x, vel.y);
    this.vX = Math.random() * (0.5 - -0.5) + -0.5;
    this.vY = Math.random() * (0.5 - -0.5) + -0.5;
    this.vel = new JSVector(this.vX, this.vY);
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.hp = Math.floor(Math.random() * (100 - 60) + 60);
    this.isDead = false;
    this.count = 0;
    //! temp stat block to look at
    //   this.statBlock = {//  properties
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
    this.loc.add(this.vel);

    if (this.count++ >= 30) {
      this.hp--;
      this.count = 0;
    }
    if (this.hp <= 0) {
      this.isDead = true;
    }
    if (this.statBlock.lifeSpan <= 0) {
      this.isDead = true;
    }
  }

  render() {
    this.ctxMain.save();
    this.ctxMain.beginPath();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.hp, -10, -20);
    this.ctxMain.arc(0, 0, this.size, 0, 2 * Math.PI, false);
    this.ctxMain.closePath();
    this.ctxMain.fillStyle = "black";
    this.ctxMain.strokeStyle = "black";
    this.ctxMain.fill();
    this.ctxMain.stroke();
    this.ctxMain.restore();
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
