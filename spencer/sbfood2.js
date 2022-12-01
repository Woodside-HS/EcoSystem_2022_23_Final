class SBFood2 extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.statBlock.health = 255-Math.random()*30;
        this.lifespan = 0;
        this.clr = ["black", "rgba(39, 196, 220," + this.statBlock.health + ")", "rgba(255, 255, 255," + this.statBlock.health + ")"];
        this.production = [0, 120];
        this.isDead = false;
        this.world = wrld;
        
    
    }
    //  methods
    run() {
        if(!this.isDead){
        this.update();
        this.render();
        }
    }

    update() {
        if(this.statBlock.health <= 1){
            this.isDead = true;
        }
        if(this.production[0]%this.production[1]==0){
            let x = Math.random()*world.dims.width-world.dims.left;
            let y = Math.random()*world.dims.height-world.dims.top;
            let nloc = new JSVector(x, y);
            let nvel = new JSVector(0, 0);
            let nsize = 15;
            let rWorld = this.world;
            //world.foods.food2.push(new SBFood2(nloc, nvel, nsize, world));
        }
        this.production[0]++;
        if(this.lifespan%100 == 0){
            this.statBlock.health--;
        }
        this.lifespan++;
        this.clr[1] = "rgba(39, 196, 220," + this.statBlock.health + ")";
        this.clr[2] = "rgba(255, 255, 255," + this.statBlock.health + ")";
    }

    render() {
        let ctx = this.ctx;
        for(let i = 1; i<=2; i++){
            ctx.beginPath();
            ctx.save();
            ctx.translate(this.loc.x, this.loc.y);
            ctx.rotate(2*i);
            ctx.fillStyle = this.clr[i];
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
            ctx.fillStyle = this.clr[i];
            ctx.arc(0, 0, this.size, 0, Math.PI/2, false);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
}