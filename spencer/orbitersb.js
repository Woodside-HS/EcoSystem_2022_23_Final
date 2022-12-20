class OrbiterSB{
    constructor(d, a, p, ctx, clr){ //diameter, angle, orbit radius, planet location (takes in JSVector), color index
    this.ploc = new JSVector(p.x, p.y);
    this.orad = 20;
    this.ang = a;
    this.ctx = ctx;
    this.loc = new JSVector(this.ploc.x+this.orad*Math.cos(this.ang), this.ploc.y+this.orad*Math.sin(this.ang)) //add location vector
    this.angvelocity = Math.PI/36;
    this.diam = d;
    this.clrlist = ['#551206','#b100fd', '#852b0b', '#a31b00', '#4d8b32', '#97c397', '#c7b358'];
    this.clr = this.clrlist[clr];
}
  
  run(){
    this.render();
    this.update();
  }

  
  render() {
    this.ctx.arc(this.loc.x, this.loc.y, this.diam, 0, 2*Math.PI); 
    this.ctx.fillStyle = this.clr; 
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }
  
  update() {//does not work at all: must rotate from planet with angle
    this.ang+=this.angvelocity;
    this.loc.x = this.ploc.x + this.orad*Math.cos(this.ang);
    this.loc.y = this.ploc.y + this.orad*Math.sin(this.ang);
    //draw a line
  }
}