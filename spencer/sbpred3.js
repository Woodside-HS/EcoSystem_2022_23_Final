class SBPred3 extends Creature { 
    constructor(loc, vel, sz, wrld){
        super(loc, vel, sz, wrld);
        this.world = wrld;
        this.clrlist = ['#065535','#fdd800', '#0b7a85', '#00A36C', '#8b324d', '#c39797', '#9e58c7'];
        this.clr = this.clrlist[Math.floor(Math.random()*this.clrlist.length)];
        this.orbs = [];
        let start = 0;
        this.acc = new JSVector(0, 0);
        let n = Math.random()*4+2;
        for(let i = 0; i<n; i++){
            this.orbs[i] = new OrbiterSB(7, start, this.loc, this.ctx, this.clrlist.indexOf(this.clr)); // start vector at planet and end at position
      //diameter, angle, orbit radius, planet location (takes in JSVector)
        start+= (Math.PI*2)/(n);
        }
  }
  
  run(){
    this.render();
    this.vel.limit(2);
    this.update();
    for(let i = 0; i<this.orbs.length; i++){
      this.orbs[i].ploc.x = this.loc.x;
      this.orbs[i].ploc.y = this.loc.y;
      this.orbs[i].run();
      this.bounce();
    }
  }
  
  render(){ 
    this.ctx.beginPath();  //closed path intentionally left out
    this.ctx.lineTo(this.loc.x-this.size/2, this.loc.y+this.size/2);
    this.ctx.lineTo(this.loc.x-this.size/2, this.loc.y-this.size/2);
    this.ctx.lineTo(this.loc.x+this.size/2, this.loc.y-this.size/2);
    this.ctx.lineTo(this.loc.x+this.size/2, this.loc.y+this.size/2);
    this.ctx.fillStyle = this.clr; 
    this.ctx.fill(); 
    this.ctx.stroke(); 
  }
  
  update() {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
  }

  bounce(){
    if(this.loc.y < world.dims.top +30  || this.loc.y > world.dims.bottom -30 ){
      this.vel.y = -this.vel.y;
    }
    else if(this.loc.x < this.world.dims.left +30 || this.loc.x > this.world.dims.right -30){
      this.vel.x = -this.vel.x;
    }
    if(this.loc.y < world.dims.top +10  || this.loc.y > world.dims.bottom -10 ){
      this.acc = JSVector.subGetNew(new JSVector(Math.random()*400-200, Math.random()*400-200), this.loc);
      this.acc.normalize();
      this.acc.multiply(0.5);
    }
    else if(this.loc.x < this.world.dims.left +10 || this.loc.x > this.world.dims.right -10){
      this.acc = JSVector.subGetNew(new JSVector(Math.random()*400-200, Math.random()*400-200), this.loc);
      this.acc.normalize();
      this.acc.multiply(0.5);
    }

  }


  eating(){

  }

  preyDeath(){ //render prey black, random velocities, create new sbprey 3

  }

  searching(){

  }


}