class tFood2 extends Entity {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.spawnNew = 0;
        this.spawnNewMax = Math.random()*150+50;
        this.foodParticleArray = [];
        //adds a beginner particle to kick off the array
        this.foodParticleArray.push(new tFood2P(this.loc, new JSVector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5), 5, this.ctx, Math.random()*20+20));
    }
    run() {
        this.update();
        this.render();
    }
    update() {
        if (this.spawnNew > this.spawnNewMax) {
            let velX = Math.random() * 1 - 0.5;
            let velY = Math.random() * 1 - 0.5;
            //I could get some way to get the things to be pushed out in a rotating pattern but I am lazy
            this.foodParticleArray.push(new tFood2P(this.loc, new JSVector(velX, velY), 10, this.ctx, 20));//Math.random()*20+20));
            this.spawnNew = 0;//resets the span new integer so a new cherry is spawned every 10 frames as of now
        }
        this.spawnNew++;
        for (let i = this.foodParticleArray.length-1; i > 0; i--) {
            this.foodParticleArray[i].run();
            if (this.foodParticleArray[i].isDead == true) {//cuts out any dead particles
                this.foodParticleArray.splice(i, 1);
            }
        }
    }
    render() {
        //make a bush
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);//I know cherries dont grow on bushed but I dont care
        ctx.fill();
    }
    getRandomColor() {
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