class MSFood1 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.statBlock.health = Math.random()*1+.05;
    }

    //  methods
    run() {
        this.update();
        this.render();
    }

    update() {
        //this.loc.add(this.vel);
        this.statBlock.health = this.statBlock.health-.0001;
        if(this.statBlock.health >.1){
            this.statBlock.nourishment = 100;
            this.clr = "red"
            this.clr2 = "green"
            this.clr3 = "yellow"
        }
        if(this.statBlock.health <= .1){
            this.statBlock.nourishment = 50;
            this.clr = "rgb(86,57,14)"
            this.clr2 = "darkgreen"
            this.clr3 = "black"
        }

        if(this.statBlock.health <= .03){
            this.statBlock.nourishment = 25;
            this.clr = "black"
            this.clr2 = "rgb(86,57,14)"
            this.clr3 = "black"
        }

        if(this.statBlock.health <= 0){
            this.statBlock.nourishment = 0;
            this.isDead();
        }
    }

    isDead(){
        let x = Math.random()*(world.dims.right-world.dims.left)+world.dims.left; 
        let y = Math.random()*(world.dims.bottom-world.dims.top)+world.dims.top;
        this.loc = new JSVector(x,y);
        this.statBlock.health = Math.random()*1+.05;
        this.statBlock.nourishment = 100;
    }

    render() {
       this.ctx.beginPath();
       this.ctx.moveTo(this.loc.x,this.loc.y);
       this.ctx.lineTo(this.loc.x+8,this.loc.y+3);
       this.ctx.lineTo(this.loc.x+6,this.loc.y+10);
       this.ctx.lineTo(this.loc.x,this.loc.y+15);
       this.ctx.lineTo(this.loc.x-6,this.loc.y+10);
       this.ctx.lineTo(this.loc.x-8,this.loc.y+3);
       this.ctx.lineTo(this.loc.x,this.loc.y);   
       this.ctx.strokeStyle = this.clr;
       this.ctx.fillStyle = this.clr;
       this.ctx.fill();
        this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.moveTo(this.loc.x,this.loc.y);
       this.ctx.lineTo(this.loc.x+5,this.loc.y-7);
       this.ctx.lineTo(this.loc.x,this.loc.y);
       this.ctx.strokeStyle = this.clr2;
       //this.ctx.lineWidth = 3;
        this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.ellipse(this.loc.x-6,this.loc.y+5,1,1,0,0,Math.PI*2);
       this.ctx.strokeStyle = this.clr3;
       this.ctx.fillStyle = this.clr3
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.ellipse(this.loc.x+6,this.loc.y+5,1,1,0,0,Math.PI*2);
       this.ctx.strokeStyle = this.clr3;
       this.ctx.fillStyle = this.clr3
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.ellipse(this.loc.x,this.loc.y+3,1,1,0,0,Math.PI*2);
       this.ctx.strokeStyle = this.clr3;
       this.ctx.fillStyle = this.clr3
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.ellipse(this.loc.x+3,this.loc.y+8,1,1,0,0,Math.PI*2);
       this.ctx.strokeStyle = this.clr3;
       this.ctx.fillStyle = this.clr3
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.ellipse(this.loc.x-3,this.loc.y+8,1,1,0,0,Math.PI*2);
       this.ctx.strokeStyle = this.clr3;
       this.ctx.fillStyle = this.clr3
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.closePath();


       this.ctx.beginPath();
       this.ctx.ellipse(this.loc.x,this.loc.y+12,1,1,0,0,Math.PI*2);
       this.ctx.strokeStyle = this.clr3;
       this.ctx.fillStyle = this.clr3
       this.ctx.fill();
       this.ctx.stroke();
       this.ctx.closePath();
    }

    
}