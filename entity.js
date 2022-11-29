class Entity {
  constructor(loc, vel, sz, wrld) {
    //mover properties
    this.loc = loc;
    this.vel = vel;
    this.acc = new JSVector(0, 0);
    this.clr = this.getRandomColor();
    this.size = sz;
    this.maxSpeed = 0.1;
    this.ctx = wrld.ctxMain;
    this.wWidth = wrld.dims.width;
    this.wHeight = wrld.dims.height;
    this.wrld = wrld;
    this.row = (this.loc.y - wrld.dims.top) / this.wrld.rowHeight;
    this.col = (this.loc.x - wrld.dims.left) / this.wrld.colWidth;
    this.ents = this.wrld.entities;
    this.closest = 100000;
    this.clsIndex = -1;
  }//++++++++++++++++++++++++++++++++ end Entity constructor

  //++++++++++++++++++++++++++++++++ Entity methods
  run() {
    this.update();
    this.checkEdges();
    this.render();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
    this.row = Math.floor((this.loc.y - this.wrld.dims.top) / this.wrld.rowHeight);
    this.col = Math.floor((this.loc.x - this.wrld.dims.left) / this.wrld.colWidth);
    //  draw a line to the closest entity in my cell
    this.closest = 1000000;
    this.clsIndex = -1;

    for (let i = 0; i < this.ents.length; i++) {
      if (this !== this.ents[i] && this.ents[i].row === this.row && this.ents[i].col === this.col) {
        let d = this.loc.distanceSquared(this.ents[i].loc);
        //let d = this.loc.distance(this.ents[i].loc);
        if (d < this.closest) {
          this.closest = d;
          this.clsIndex = i;
        }
      }
    }
  }

  checkEdges() {
    if (this.loc.x >= world.dims.width / 2 || this.loc.x <= -world.dims.width / 2) {
      this.vel.x *= -1;
    }
    if (this.loc.y >= world.dims.height / 2 || this.loc.y < -world.dims.height / 2) {
      this.vel.y *= -1;
    }
  }

  render() {
    //  render balls in world
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = this.clr;
    ctx.arc(this.loc.x, this.loc.y, this.size, 0, 2 * Math.PI, false);
    ctx.fill();

    if (this.clsIndex >= 0) {
      ctx.beginPath();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.moveTo(this.loc.x, this.loc.y);
      ctx.lineTo(this.ents[this.clsIndex].loc.x, this.ents[this.clsIndex].loc.y);
      ctx.stroke();
    }
  }

  getRandomColor() {
    //  List of hex color values for movers
    let colors = [
      "#FFFFFF",
    ];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

}//###############################################  end Entity class
