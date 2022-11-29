class Food6 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.vel = vel;
        this.rad = sz;
        this.ctx = wrld.ctxMain;
        this.foodParticles = [];
        this.clr = this.getRandomColor();
    }
    //  methods
    run() {
        //console.log("gah");
        this.update();
        this.render();
    }

    update() {
        this.loc.add(this.vel)
    }

    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2);
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