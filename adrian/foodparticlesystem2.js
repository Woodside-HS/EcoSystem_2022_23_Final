class FoodParticleSystem2BigBalls extends Food {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.vel = vel;
        this.size = sz;
        this.world = wrld;
        this.rad =  this.randomNumber(2, 10);
        this.clr = this.getTrueRandomColor();
        this.foodList = [];
        this.loadParticles(10);
    }
    //  methods
    run() {
        this.update();
    }

    update() {
        for (let i = this.foodList.length - 1; i > 0; i--) {
            this.foodList[i].run();
            if(!this.foodList[i].alive) {
              this.foodList.splice(i, 1);
              this.foodList.push(new Food5Particle(this.loc.x, this.loc.y, this.rad, this.clr, this.ctx));
            }
        }
    }

    loadParticles(n) {
        for(let i = 0; i < n; i++) {
            this.foodList[i] = new Food5Particle(this.loc.x, this.loc.y, this.rad, this.clr, this.ctx);
          }
    }

    getTrueRandomColor() {
        let r = Math.floor(this.randomNumber(100,255));
        let g = Math.floor(this.randomNumber(100,255));
        let b = Math.floor(this.randomNumber(100,255));
        let color = this.RGBToHex(r, g, b);
        return color;
    }

    RGBToHex(r,g,b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
      
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
    }

    randomNumber(min, max) { 
        let rdm = Math.random() * (max - min) + min;
        return rdm;
    } 

}