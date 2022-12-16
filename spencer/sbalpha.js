class SBAlpha extends Creature {
    // properties

    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.acc = new JSVector(0,0);
        this.clr = "yellow";
        this.world = wrld;
        this.rad = 30;
        this.minBeings = 5;
        this.maxBeings = 100;
        this.beings = [];
        this.dataBlock.health = 100-Math.random()*30;
        this.world = wrld;
    }
    
    run() {
        this.search();
        this.update();
        this.bounce();
        for(let i = 0; i<this.beings.length; i++){
            this.beings[i].run(this.vel);
        }
    
    }
    
     
    update() { 
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        for(let i = 0; i<this.beings.length; i++){
            if(this.beings[i].loc.distance(this.loc)>this.rad){
                this.beings.splice(i, 1);
            }
        }
        if(this.beings.length<this.maxBeings){
            let nloc = this.loc.copy();
            let tloc = new JSVector(Math.random() * this.world.dims.width - this.world.dims.width / 2, Math.random() * this.world.dims.height - this.world.dims.height / 2);
            tloc.setMagnitude(Math.random()*this.rad);
            tloc.setDirection(Math.random()*2*Math.PI);
            nloc.add(tloc);
            let nvel = new JSVector(Math.random()*2-1, Math.random()*2-1);
            this.beings.push(new SBAlphaParticles(nloc, nvel, this.ctx));
        }
        if(this.beings.length<this.minBeings){
            let dif = this.minBeings-this.beings.length;
            for(let i = 0; i<dif; i++){
                let nloc = this.loc.copy();
                nloc.setMagnitude(Math.random()*this.rad);
                nloc.setDirection(Math.random()*2*Math.PI);
                let nvel = new JSVector(Math.random()*4-2, Math.random()*4-2);
                this.beings.push(new SBAlphaParticles(nloc, nvel, this.ctx));
            }
        }
   
    }
    
    bounce(){ //avoids walls, doesn't get stuck in corners
    if(this.loc.y < world.dims.top  + this.rad || this.loc.y > world.dims.bottom - this.rad){
        this.vel.y = -this.vel.y;
      }
    else if(this.loc.x < this.world.dims.left  + this.rad || this.loc.x > this.world.dims.right - this.rad){
        this.vel.x = -this.vel.x;
      }

    }

    search(){
        let check = this.world.creatures.pred2;
        for(let i = 0; i<check.length; i++){
            if(this.loc.distance(check[i].loc)<this.rad && !check[i].isDead){
                this.dataBlock.life += check.dataBlock.life/10;
                check[i].dataBlock.life-=10; //potentially change death per turn
                check[i].dataBlock.nourishment-=10;
                check[i].clr = "rgb(255, 0, 127)";
            }
        }
        check = this.world.creatures.pred3;
        for(let i = 0; i<check.length; i++){
            if(this.loc.distance(check[i].loc)<this.rad && !check[i].isDead){
                this.dataBlock.life += check.dataBlock.life/10;
                check[i].dataBlock.life-=50; //potentially change death per turn
                check[i].dataBlock.nourishment-=50;
                check[i].clr = "rgb(255, 0, 127)";
            }
        }
    }
}