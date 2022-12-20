class MSHerbivore1 extends Creature {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.acc = new JSVector(0,0);
        this.size = sz;
        this.dataBlock.health = Math.random()*100;
    }
    //  methods
    run() {
        this.update();
        this.render();
        this.checkEdges();
        this.test();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.loc.add(this.vel);
        this.dataBlock.health = this.dataBlock.health - .1;
        if(this.dataBlock.health <= 0){
            let x = Math.random()*(world.dims.right-world.dims.left)+world.dims.left; 
            let y = Math.random()*(world.dims.bottom-world.dims.top)+world.dims.top;
            this.loc = new JSVector(x,y);
            this.dataBlock.health = 100;
        }
    }

    test(){
        for(let i = 0;i<world.foods.food1.length;i++){
            if(this.dataBlock.health > 50){
            if(this.loc.distance(world.foods.food1[i].loc)<100){
                this.acc = JSVector.subGetNew(world.foods.food1[i].loc, this.loc);
                this.acc.normalize();
                this.acc.multiply(0.05);
            }
            if(this.loc.distance(world.foods.food1[i].loc)<10){
                console.log("gain")
                this.dataBlock.health = this.dataBlock.health + .01;
            }
             }
        }
    }

    render() {
        //head
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(0,-17,5,5,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        

        //feet
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(10,10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(10,-10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(-10,10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(-10,-10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        //shell
        
        
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(0,0,10,15,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(37,116,26,1)";
        this.ctx.fillStyle = "rgba(37,116,26,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        

        //eyes
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(3,-20,1,1,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        
        
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.ellipse(-3,-20,1,1,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        

        //shell detail
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection()+(Math.PI/2));
        this.ctx.moveTo(0,7);
        this.ctx.lineTo(0,15);
        this.ctx.lineTo(0,0+7);//
        this.ctx.lineTo(0-5,0+2);
        this.ctx.lineTo(0-10,0+7);
        this.ctx.lineTo(0-5,0+2);
        this.ctx.lineTo(0-5,0-5);
        this.ctx.lineTo(0-9,0-7);
        this.ctx.lineTo(0-5,0-5);
        this.ctx.lineTo(0,0-10);
        this.ctx.lineTo(0,0-15);
        this.ctx.lineTo(0,0-10);
        this.ctx.lineTo(0+5,0-5);
        this.ctx.lineTo(0+9,0-7);
        this.ctx.lineTo(0+5,0-5);
        this.ctx.lineTo(0+5,0+2);
        this.ctx.lineTo(0+10,0+7);
        this.ctx.lineTo(0+5,0+2);
        this.ctx.lineTo(0,0+7);
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        
        
    }

    checkEdges() {
        if (this.loc.x < world.dims.left) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.x > world.dims.right) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.y > world.dims.bottom) {
            this.vel.y = -this.vel.y;
        }
        if (this.loc.y < world.dims.top) {
            this.vel.y = -this.vel.y
        }
      }
}