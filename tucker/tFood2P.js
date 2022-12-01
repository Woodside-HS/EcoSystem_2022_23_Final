class tFood2P {
    constructor(loc, vel, sz, wrld, dist) {
        this.loc = loc.copy;
        this.vel = vel.copy;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.distance = dist;
        this.life = Math.random() * 300 + 100;
        this.nurishment = 1000;
        this.isDead = false;
        this.ctx = wrld;
        this.clr = this.getRandomColor();
    }
    run() {
        this.update();
        this.render();
    }
    update() {
        this.life--;
        if (this.life < 0) {
            this.isDead = true;
        }
    }
    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
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