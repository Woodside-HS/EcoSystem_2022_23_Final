class MPSFood1{
    // properties
    constructor(loc, vel, rad, ctx) {
        console.log("hello");
        this.loc = new JSVector(loc.x,loc.y);
        this.vel = new JSVector(Math.random()*1-.5,Math.random()*1-.5);
        this.acc = new JSVector(0, .05);
        this.ctx = ctx;
        this.death = 1;
        this.isDead = false;
        this.rad = rad;
    }
    //  methods
    run() {
        this.update();
        this.life();
        this.render();
        this.checkEdges;
    }

    update() {
        this.loc.add(this.vel);
        //this.vel.add(this.acc);
    }

    life () {
        this.death = this.death-.001;
        if(this.death <= 0){ 
            this.isDead = true;
        }
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(230,50,100, " + this.death + ")";
        this.ctx.fillStyle = "rgba(230,50,100, " + this.death + ")";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();
    }

    checkEdges(){
        if(this.loc.x > world.dims.left){
            this.vel.x = -this.vel.x;
          }
          if(this.loc.x < world.dims.right){
            this.vel.x = -this.vel.x;
          }
          if(this.loc.y > world.dims.top){
            this.vel.y = -this.vel.y;
          }
          if(this.loc.y < world.dims.bottom){
            this.vel.y = -this.vel.y;
          }
    }

}