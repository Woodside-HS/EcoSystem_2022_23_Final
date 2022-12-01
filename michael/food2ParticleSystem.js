class Food2ParticleSystem{
    constructor(){
        this.loc = new JSVector(100,100)
    }

    run(){
    this.render();
    }

    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.loc.x,this.loc.y,30,0,Math.PI*2);
        this.ctx.strokeStyle = "rgba(230,50,100)";
        this.ctx.fillStyle = "rgba(230,50,100)";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();
    }
}