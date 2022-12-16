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
        this.victims = [];
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
        this.vel.limit(2);
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
        for(let i = this.victims.length -1; i>=0; i--){
            this.victims[i].dataBlock.health-=0.5;
            this.victims[i].dataBlock.nourishment-=0.5;
            this.victims[i].clr = "rgb(255, 0, 127)";
            if(this.victims[i].dataBlock.health<2 || this.victims[i].dataBlock.nourishment<2){
                this.victims.splice(i, 1);
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
    if(this.loc.y < world.dims.top || this.loc.y > world.dims.bottom || this.loc.x < this.world.dims.left || this.loc.x > this.world.dims.right){
        let temp = JSVector.subGetNew(new JSVector(0, 0), this.loc);
        temp.setMagnitude(this.rad);
        this.loc.add(temp);

    }

    }

    search(){

        let check = this.world.creatures.herb3;
        for(let i = 0; i<check.length; i++){
            if(this.loc.distance(check[i].loc)<300){
                this.acc = JSVector.subGetNew(check[i].loc, this.loc);
                this.acc.normalize();
                this.acc.multiply(0.5);
            }
            if(this.loc.distance(check[i].loc)<100 && !check[i].isDead){
                this.dataBlock.health += check[i].dataBlock.health/10;
                if(this.maxBeings<300 && this.maxRad<150){
                    this.maxBeings+=10;
                    this.rad+=5;
                }
                check[i].vel.multiply(0);
                check[i].acc = new JSVector(0, 0); //in case there is for some reason scalar acceleration
                this.victims.push(check[i]);
            }
        }

        check = this.world.creatures.pred2;
        for(let i = 0; i<check.length; i++){
            if(this.loc.distance(check[i].loc)<300){
                this.acc = JSVector.subGetNew(check[i].loc, this.loc);
                this.acc.normalize();
                this.acc.multiply(0.5);
            }
            if(this.loc.distance(check[i].loc)<100 && !check[i].isDead){
                this.dataBlock.health += check[i].dataBlock.health/10;
                if(this.maxBeings<300 && this.maxRad<150){
                    this.maxBeings+=10;
                    this.rad+=5;
                }
                check[i].vel.multiply(0);
                check[i].acc = new JSVector(0, 0); //in case there is for some reason scalar acceleration
                this.victims.push(check[i]);
            }
        }

        check = this.world.creatures.pred3;
        for(let i = 0; i<check.length; i++){
            if(this.loc.distance(check[i].loc)<300){
                this.acc = JSVector.subGetNew(check[i].loc, this.loc);
                this.acc.normalize();
                this.acc.multiply(0.5);
            }
            if(this.loc.distance(check[i].loc)<100 && !check[i].isDead){
                this.dataBlock.health += check[i].dataBlock.health/10;
                if(this.maxBeings<300 && this.maxRad<150){
                    this.maxBeings+=10;
                    this.rad+=5;
                }
                check[i].vel.multiply(0);
                check[i].acc = new JSVector(0, 0); //in case there is for some reason scalar acceleration
                this.victims.push(check[i]);
            }
        }
    }
}