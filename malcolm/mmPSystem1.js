class MMPSystem1 {
  constructor(loc, vel, sz, wrld) {
    // super(loc, vel, sz, wrld);
    this.loc = loc;
    this.vel = vel;
    this.size = sz;
    this.world = wrld;
    this.ctxMain = wrld.ctxMain;
    this.mmParticles = [];
    this.loadParticles(30);
  }
  run() {
    this.render();
    this.update();
  }
  loadParticles(n) {
    for (let i = 0; i < n; i++) {
      this.addParticles();
    }
  }
  addParticles() {
    this.mmParticles.push(new MMParticle(this.loc, this.vel, 10, this.world));
    if (this.mmParticles.length < 3) {
      this.mmParticles.push(new MMParticle(this.loc, this.vel, 10, this.world));
    }
  }

  render() {
    for (let i = 0; i < this.mmParticles.length; i++) {
      this.mmParticles[i].run();
    }
  }
  update() {
    for (let i = 0; i < this.mmParticles.length; i++) {
      if (this.mmParticles[i].statBlock.health == 50) {
        this.addParticles();
        this.mmParticles[i].statBlock.health--;
      }
    }
    for (let i = 0; i < this.mmParticles.length; i++) {
      if (this.mmParticles[i].isDead) {
        this.mmParticles.splice(i, 1);
      }
    }
  }
}
