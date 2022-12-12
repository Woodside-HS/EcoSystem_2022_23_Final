class MSHerbivore1 extends Creature {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = new JSVector(loc.x,loc.y);
        this.vel = new JSVector(vel.x,vel.y);
        this.size = sz;
    }
    //  methods
    run() {
        this.update();
        this.render();
        this.checkEdges();
    }

    update() {
        this.loc.add(this.vel)
    }

    render() {
        //head
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x,this.loc.y-17,5,5,0,0,Math.PI*2);
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
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x+10,this.loc.y+10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x+10,this.loc.y-10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x-10,this.loc.y+10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x-10,this.loc.y-10,5,6,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(50,158,25,1)";
        this.ctx.fillStyle = "rgba(50,158,25,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();

        //shell
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.beginPath();
        this.ctx.ellipse(this.loc.x,this.loc.y,10,15,0,0,Math.PI*2);
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
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x+3,this.loc.y-20,1,1,0,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.loc.x,this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.ellipse(this.loc.x-3,this.loc.y-20,1,1,0,0,Math.PI*2);
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
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.moveTo(this.loc.x,this.loc.y+7);
        this.ctx.lineTo(this.loc.x,this.loc.y+15);
        this.ctx.lineTo(this.loc.x,this.loc.y+7);//
        this.ctx.lineTo(this.loc.x-5,this.loc.y+2);
        this.ctx.lineTo(this.loc.x-10,this.loc.y+7);
        this.ctx.lineTo(this.loc.x-5,this.loc.y+2);
        this.ctx.lineTo(this.loc.x-5,this.loc.y-5);
        this.ctx.lineTo(this.loc.x-9,this.loc.y-7);
        this.ctx.lineTo(this.loc.x-5,this.loc.y-5);
        this.ctx.lineTo(this.loc.x,this.loc.y-10);
        this.ctx.lineTo(this.loc.x,this.loc.y-15);
        this.ctx.lineTo(this.loc.x,this.loc.y-10);
        this.ctx.lineTo(this.loc.x+5,this.loc.y-5);
        this.ctx.lineTo(this.loc.x+9,this.loc.y-7);
        this.ctx.lineTo(this.loc.x+5,this.loc.y-5);
        this.ctx.lineTo(this.loc.x+5,this.loc.y+2);
        this.ctx.lineTo(this.loc.x+10,this.loc.y+7);
        this.ctx.lineTo(this.loc.x+5,this.loc.y+2);
        this.ctx.lineTo(this.loc.x,this.loc.y+7);
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    checkEdges(){
       
    }
}