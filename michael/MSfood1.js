class MSFood1 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.statBlock.health = Math.random()*1+.05;
        this.clr = "green"
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
            this.clr = "darkbrown"
        }

        if(this.statBlock.health <= .05){
            this.clr = "black"
        }

        if(this.statBlock.health <= 0){
            this.isDead = true;
        }
    }

    render() {
       this.ctx.beginPath();
       this.ctx.moveTo(this.loc.x,this.loc.y);
       this.ctx.lineTo(this.loc.x,this.loc.y-30);
       this.ctx.strokeStyle = this.clr;
        this.ctx.stroke();
       this.ctx.closePath();
       this.ctx.beginPath();
       //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)
       this.ctx.ellipse(this.loc.x,this.loc.y-10,5,15,0,.6,Math.PI);
       this.ctx.strokeStyle = this.clr;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
       this.ctx.arc(this.loc.x,this.loc.y-25,5,5,Math.PI/2,1);
       this.ctx.strokeStyle = this.clr;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    isDead(){
        for(let i = this.foods.food1.length-1;i>=0;i--){
            if(this.foods.food1[i].isDead == true){
                this.foods.food1.splice(i,1);
            }
        }
    }
}