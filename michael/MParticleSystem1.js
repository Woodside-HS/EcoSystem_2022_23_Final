class MParticleSystem1 extends Food{
    constructor(loc,vel,sz,wrld) {   
        super(loc,vel,sz,wrld)  
        this.particles = [];
        this.count = 1000;
    }

    addParticle(){
        this.particles.push(new MPSFood1(this.loc,this.vel,this.sz,this.wrld,this.ctx));
    }

    run(){
        this.render();
        for(let i = 0;i<this.particles.length;i++){
            this.particles[i].run();
        }
        this.isDead();
        if(++this.count%100 === 0 &&  this.particles.length < 10){
            this.addParticle(); 
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

    render(){
        this.ctx.beginPath();
        this.ctx.ellipse(this.loc.x,this.loc.y,20,7,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgb(64,38,8)";
        this.ctx.fillStyle = "rgb(64,38,8)";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.ellipse(this.loc.x,this.loc.y,15,2,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgb(39,25,9)";
        this.ctx.fillStyle = "rgb(39,25,9)";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.loc.x,this.loc.y);
        this.ctx.lineTo(this.loc.x,this.loc.y-5);
        this.ctx.lineTo(this.loc.x+5,this.loc.y-15);
        this.ctx.lineTo(this.loc.x,this.loc.y-5);
        this.ctx.lineTo(this.loc.x,this.loc.y);
        this.ctx.lineTo(this.loc.x-5,this.loc.y-15);
        this.ctx.lineTo(this.loc.x,this.loc.y-5);
        this.ctx.strokeStyle = "rgb(50,143,0)";
        this.ctx.fillStyle = "rgb(50,143,0)";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();
    }

}