class MParticleSystem1{
    constructor(loc,vel,sz,wrld,ctx) {     
        this.loc = loc;
        this.vel = vel;
        this.rad = 15;
        this.particles = [];
        this.count = 1000;
        this.ctx = ctx;
    }

    addParticle(){
        
        this.particles.push(new MPSFood1(this.loc,this.vel,this.rad,this.ctx));
    }

    run(){
        for(let i = 0;i<this.particles.length;i++){
            this.particles[i].run();
        }
        this.isDead();
        if(++this.count%50 === 0 &&  this.particles.length < 10){
            this.addParticle(this.loc, this.ctx); // new particle each time
            this.count = 0;
        }
    }

    isDead(){
        for(let i = this.particles.length-1;i>=0;i--){
            if(this.particles[i].isDead == true){
                this.particles.splice(i,1);
            }
        }
    }

}