class tFood2 extends Entity {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.spawnNew = 0;
        this.foodParticleArray = [];
        this.foodParticleArray.push(new tFood2P(this.loc, new JSVector(Math.random() * 1 - 0.5, Math.random() * 1 - 0.5), 5, this.ctx, 100));
    }
    run() {
        this.update();
        this.render();
    }
    update() {
        if (this.spawnNew > 10) {
            let velX = Math.random() * 1 - 0.5;
            let velY = Math.random() * 1 - 0.5;
            this.foodParticleArray.push(new tFood2P(this.loc, new JSVector(velX, velY), 5, this.ctx, 100));
        }
        this.spawnNew++;
        for (let i = this.foodParticleArray.length-1; i > 0; i--) {
            if (this.foodParticleArray[i].isDead == false) {
                this.foodParticleArray[i].splice(i, 1);
            }
        }
    }
    render() {
        //make a bush
    }
    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#25AA34",
            "#18CC2e",
            "#389925",
            "#11AA99",
            "#99CC00",
            "#11FF65"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}