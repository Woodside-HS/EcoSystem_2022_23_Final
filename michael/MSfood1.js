class MSFood1 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.statBlock.health = Math.random()*1+.05;
        this.clr = "red"
        this.clr2 = "green"
        this.isDead = false;

        
    
    }

    //  methods
    run() {
        this.update();
        this.render();
    }

    update() {
        this.statBlock.health = this.statBlock.health-.0001;
        if(this.statBlock.health <= .1){
            this.clr = "rgb(86,57,14)"
            this.clr2 = "darkgreen"
        }

        if(this.statBlock.health <= .03){
            this.clr = "black"
            this.clr2 = "rgb(86,57,14)"
        }

        if(this.statBlock.health <= 0){
            this.isDead = true;
        }
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
    }

    
}