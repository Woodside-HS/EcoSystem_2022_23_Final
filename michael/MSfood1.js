class MSFood2 extends Food {
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
            this.clr = "brown"
            this.clr2 = "darkgreen"
        }

        if(this.statBlock.health <= .05){
            this.clr = "black"
            this.clr2 = "brown"
        }

        if(this.statBlock.health <= 0){
            this.isDead = true;
        }
    }

    render() {
       this.ctx.beginPath();
       this.ctx.moveTo(this.loc.x,this.loc.y-7);
       this.ctx.lineTo(this.loc.x+10,this.loc.y-10);
       this.ctx.lineTo(this.loc.x+20,this.loc.y);
       this.ctx.lineTo(this.loc.x,this.loc.y+25);
       this.ctx.lineTo(this.loc.x-20,this.loc.y);
       this.ctx.lineTo(this.loc.x-10,this.loc.y-10);
       this.ctx.lineTo(this.loc.x,this.loc.y-7);
       this.ctx.strokeStyle = this.clr;
        this.ctx.stroke();
       this.ctx.closePath();

       this.ctx.beginPath();
       this.ctx.moveTo(this.loc.x-2,this.loc.y-7);
       this.ctx.lineTo(this.loc.x+5,this.loc.y-15);
       this.ctx.strokeStyle = this.clr2;
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