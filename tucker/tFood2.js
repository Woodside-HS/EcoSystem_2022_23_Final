class tFood2 {
    constructor(loc, vel, sz, wrld) {
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.spawnNew = 0;
        this.spawnNewMax = Math.random()*500+150;
        this.foodList = [];
        //adds a beginner particle to kick off the array
        this.foodList.push(new tFood2P(this.loc, new JSVector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5), 3, this.ctx, Math.random()*20+20));
        this.trunkClr = this.getRandomColor();
        this.leaveClr = this.LgetRandomColor();
    }
    run() {
        this.update();
        this.render();
    }
    
    update() {
        if(this.foodList.length<10){
            if (this.spawnNew > this.spawnNewMax) {
                let velX = Math.random() * 1 - 0.5;
                let velY = Math.random() * 1 - 0.5;
                //I could get some way to get the things to be pushed out in a rotating pattern but I am lazy
                this.foodList.push(new tFood2P(this.loc, new JSVector(velX, velY), 3, this.ctx, 20));//Math.random()*20+20));
                this.spawnNew = 0;//resets the span new integer so a new cherry is spawned every 10 frames as of now
            }
        }
        
        this.spawnNew++;
        for (let i = this.foodList.length-1; i > 0; i--) {
            this.foodList[i].run();
            if (this.foodList[i].isDead == true) {//cuts out any dead particles
                console.log("should splice");
                this.foodList.splice(i, 1);
            }
        }
    }
    render() {
        //make a bush
        let ctx = this.ctx;
        ctx.beginPath();//beginning of leafs
        ctx.fillStyle = this.leaveClr;
        ctx.arc(this.loc.x,this.loc.y-(this.rad*2),.75*this.rad,0,Math.PI*2);
        ctx.arc(this.loc.x-this.rad,this.loc.y-(this.rad*2),this.rad*.5,0,Math.PI*2);
        ctx.arc(this.loc.x+this.rad,this.loc.y-(this.rad*2),this.rad*.5,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();//end of leaves
        ctx.beginPath();//beginning of trunk
        ctx.fillStyle = this.trunkClr;
        ctx.moveTo(this.loc.x,this.loc.y);//center of trunk of tree
        ctx.lineTo(this.loc.x+(this.rad/3),this.loc.y);
        ctx.lineTo(this.loc.x+(this.rad/2),this.loc.y-this.rad);
        ctx.lineTo(this.loc.x+this.rad,this.loc.y-(this.rad*2));
        ctx.lineTo(this.loc.x,this.loc.y-(this.rad*1.5));
        ctx.lineTo(this.loc.x+(this.rad/4),this.loc.y-(this.rad*2));
        ctx.lineTo(this.loc.x,this.loc.y-(this.rad*1.75));//midpoint of tree
        ctx.lineTo(this.loc.x-(this.rad*.25),this.loc.y-(this.rad*2));
        ctx.lineTo(this.loc.x,this.loc.y-(this.rad*1.5));
        ctx.lineTo(this.loc.x-this.rad,this.loc.y-(this.rad*2));
        ctx.lineTo(this.loc.x-(this.rad*.5),this.loc.y-this.rad);
        ctx.lineTo(this.loc.x-(this.rad/3),this.loc.y);
        ctx.lineTo(this.loc.x,this.loc.y);//end of tree
        ctx.closePath();
        ctx.fill();//end of trunk
    }
    getRandomColor() {
        //  List of hex color values for movers
        let colors = [//array of various dark green bush colors
            "#773700",
            "#2F1600",
            "#140900",
            "#4D2400"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
    LgetRandomColor() {
        //  List of hex color values for movers
        let colors = [//array of various dark green bush colors
            "#0F4800",
            "#004400",
            "#071707",
            "#000800"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}