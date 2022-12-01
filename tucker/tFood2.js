class tFood2 extends Entity {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.spawnNew = 0;
        this.foodParticleArray = [];
        this.foodParticleArray.push(new tFood2P(this.loc, new JSVector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5), 5, this.ctx, Math.random()*20+20));
    }
    run() {
        this.update();
        this.render();
    }
    update() {
        if (this.spawnNew > 10) {
            let velX = Math.random() * 1 - 0.5;
            let velY = Math.random() * 1 - 0.5;
            this.foodParticleArray.push(new tFood2P(this.loc, new JSVector(velX, velY), 5, this.ctx, Math.random()*20+20));
            this.spawnNew = 0;
        }
        this.spawnNew++;
        for (let i = this.foodParticleArray.length-1; i > 0; i--) {
            this.foodParticleArray[i].run();
            if (this.foodParticleArray[i].isDead == true) {
                this.foodParticleArray.splice(i, 1);
            }
        }
    }
    render() {
        //make a bush
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
    }
    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#0F4800",
            "#004400",
            "#071707",
            "#000800"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}