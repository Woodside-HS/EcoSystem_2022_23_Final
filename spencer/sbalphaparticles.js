class SBAlphaParticles {

    constructor(loc, vel, ctx){
        this.loc = loc;
        this.vel = vel;
        this.ctx = ctx;
        this.clrList = ["yellow", "white"]; //"#ADD8E6"];
        let c = Math.random()*this.clrList.length;
        this.clr = this.clrList[Math.floor(c)];
        this.counter = 0;
    }

    run(avel){ //avel = vel from alpha
        this.vel.limit(1);
        let temp = JSVector.addGetNew(this.vel, avel);
        this.loc.add(temp);
        this.render(avel);
    }

    render(avel){
        if(this.counter%60){ //alternating colors if wanted
            let ind = (this.clrList.indexOf(this.clr)+1)%this.clrList.length;
            this.clr = this.clrList[ind];
        }
        let ctx = this.ctx;
        ctx.strokeStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, 1, 0, Math.PI*2);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = this.clr;
        ctx.fill();
    }




}