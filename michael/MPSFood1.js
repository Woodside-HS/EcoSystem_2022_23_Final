class MPSFood1{
    // properties
    constructor(loc, rad, ctx) {
        this.loc = new JSVector(loc.x + Math.random()*100-50,loc.y+Math.random()*100-50);
        this.vel = new JSVector(Math.random()*.1-.05,Math.random()*.1-.05);
        this.acc = new JSVector(0, .05);
        this.ctx = ctx;
        this.death = Math.random()*1;
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
        this.death = this.death-.0001;
        if(this.death <= 0){ 
            this.isDead = true;
        }
    }

    render() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.loc.x,this.loc.y);
        this.ctx.lineTo(this.loc.x,this.loc.y-5);
        this.ctx.lineTo(this.loc.x+5,this.loc.y-15);
        this.ctx.lineTo(this.loc.x,this.loc.y-5);
        this.ctx.lineTo(this.loc.x,this.loc.y);
        this.ctx.lineTo(this.loc.x-5,this.loc.y-15);
        this.ctx.lineTo(this.loc.x,this.loc.y-5);
        this.ctx.strokeStyle = "rgba(50,143,0, " + this.death + ")";
        this.ctx.fillStyle = "rgba(50,143,0," + this.death + ")";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.loc.x,this.loc.y);
        this.ctx.lineTo(this.loc.x+7,this.loc.y+2);
        this.ctx.lineTo(this.loc.x,this.loc.y+20);
        this.ctx.lineTo(this.loc.x-7,this.loc.y+2);
        this.ctx.lineTo(this.loc.x,this.loc.y);
        this.ctx.strokeStyle = "rgba(255,139,0," + this.death + ")";
        this.ctx.fillStyle = "rgba(255,139,0," + this.death + ")";
        this.ctx.fill();
        this.ctx.stroke()
        this.ctx.closePath();
    }

    checkEdges(){
        
    }

}