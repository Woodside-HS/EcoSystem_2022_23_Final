class PSystemFoodSB {
    
    constructor(start, death, ctx, sz) { 
    this.loc = new JSVector(start.x + Math.random()*500-250, start.y + Math.random()*500-250);
    this.sz = sz; 
    this.life = Math.random()*30*death+30;
    this.isDead = false;
    this.ctx = ctx;
    this.clr = ["#F500A2", "rgb(10, 61, 38)"];
    this.dying = false;
  }
  
  run() {
    this.render();
    this.update();
    this.bounds();
  }
  
  update() {
    if(this.life<=0){
      this.isDead = true;
    }
    else{
    this.life--;
    }
  }
  
  render(){
    let ctx = this.ctx;
    for(let i = 1; i<8; i++){
    ctx.save();
    ctx.fillStyle = this.clr[i%2];
    ctx.beginPath();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(Math.PI/2)
    ctx.scale(0.25, 0.25);
    ctx.arc(0, 0, this.sz*i, 0, -2*Math.PI/3, true);
    ctx.arc(0, 0, this.sz*i, 0, 2*Math.PI/3, false);
    ctx.closePath();
    ctx.fill(); 
    ctx.restore();
    }
  }
  
  bounds() {
    if(this.loc.y>world.dims.bottom || this.loc.y<world.dims.top || this.loc.x>world.dims.right || this.loc.x<world.dims.left){
      this.isDead = true;
    }
  }

  die(){
    this.clr = "black";
    if(!this.dying){
      this.life = this.sz;
      this.dying = true;
    }
    this.sz = this.life;
  }

}