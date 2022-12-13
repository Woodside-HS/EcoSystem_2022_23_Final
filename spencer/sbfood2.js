class SBFood2 extends Food {  //
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.statBlock.health = 255-Math.random()*30;
        this.statBlock.lifeSpan = 0;
        this.clr = ["rgba(00, 00, 00, 1)", "rgba(39, 196, 220," + this.statBlock.health/255 + ")", "rgba(255, 255, 255," + this.statBlock.health/255 + ")"];
        this.world = wrld;
        
    
    }
    //  methods
    run() {
        this.update();
        this.render();
    }

    update() {
        if(this.statBlock.health <= 1){
            let x = Math.random()*(world.dims.width-400)+world.dims.left+50;
            let y = Math.random()*(world.dims.height-400)+world.dims.top+50;
            this.loc = new JSVector(x, y);
            this.statBlock.health = 255-Math.random()*30;
            this.statBlock.nourishment = 100;
            this.statBlock.lifeSpan = 0;
            this.statBlock.opacity = 1.0;
            this.statBlock.foodPts = 100;
            
        }
        if(this.statBlock.lifeSpan%100 == 0){
            this.statBlock.health--;
        }
        this.statBlock.lifeSpan++;
    }

    render() {
        let ctx = this.ctx;
        this.clr[1] = "rgba(39, 196, 220," + this.statBlock.health/255 + ")";
        this.clr[2] = "rgba(255, 255, 255," + this.statBlock.health/255 + ")";
        for(let i = 1; i<=2; i++){
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.loc.x, this.loc.y);
            ctx.rotate(2*i);
            if(this.statBlock.health < 20){
                ctx.fillStyle = this.clr[0];
            }
            else{
            ctx.fillStyle = this.clr[i];
            }
            ctx.arc(0, 0, this.size, 0, Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        for(let i = 1; i<=2; i++){
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.loc.x-(this.size)*(3/2)-1, this.loc.y-(this.size)*(3/2)+5.5);
            ctx.rotate(2*i+Math.PI);
            if(this.statBlock.health < 20){
                ctx.fillStyle = this.clr[0];
            }
            else{
            ctx.fillStyle = this.clr[i];
            }
            ctx.arc(0, 0, this.size, 0, Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}