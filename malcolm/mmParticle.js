class MMParticle extends Food {
  constructor(loc, vel, sz, wrld) {
    super(loc, vel, sz, wrld);
    this.loc = new JSVector(
      Math.random() * (700 - 100) + 100,
      Math.random() * (600 - 100) + 100
    );
    // this.loc = loc;
    this.vX = Math.random() * (0.1 - -0.1) + -0.1;
    this.vY = Math.random() * (0.1 - -0.1) + -0.1;
    this.vel = new JSVector(this.vX, this.vY);
    // this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.hp = Math.floor(Math.random() * (100 - 60) + 60);
    // this.hp = 55;
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
    this.ctxMain.fillText(this.hp, -10, -20);
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
    if (this.hp <= 0) {
      this.isDead = true;
    }
    if (this.count++ >= Math.random() * (300 - 20) + 20) {
      this.hp--;
      this.count = 0;
    }
    this.loc.add(this.vel);
    // console.log(this.loc);
  }
  checkEdges() {}
}
