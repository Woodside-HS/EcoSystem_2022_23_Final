class tPred3 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        //loc,vel,wrld,statblock all inherited by super
        this.hurtyBit = [];
        this.size = sz;
        this.spwanNew = 0;
    }
    run() {
        this.update();
        this.render();
        this.bounceEdges();
        this.orbitals();
    }
    orbitals() {
        if(this.hurtyBit.length<10 ){//&& this.spawnNew>=10
            this.hurtyBit.push(new tPred3P(this.loc, this.getRandomColor(), 10));
        }
        for (let i = this.hurtyBit.length - 1; i >= 0; i--) {
            this.hurtyBit[i].run(this.loc);
        }
        //want to have a "particle system" of orbitals which will slow everything down
    }
    searchFood(){
        let food = world.creatures.herb2;
        let siteSq = this.dataBlock.sightVale*this.dataBlock.sightVale;
        for(let i = 0; i<food.length;i++){
            if(!food[i].isDead && this.loc.distanceSquared(food[i].loc)<=siteSq){
                world.creatures.herb2[i].sprint(this.loc);
            }
        }
    }
    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.dataBlock.maxSpeed);
        this.loc.add(this.vel);
    }
    bounceEdges() {
        if (this.loc.x > world.dims.right) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.x < world.dims.left) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.y > world.dims.bottom) {
            this.vel.y = -this.vel.y;
        }
        if (this.loc.y < world.dims.top) {
            this.vel.y = -this.vel.y;
        }
    }
    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#7102AB",
            "#ab0256",
            "#0285ab",
            "#02ab1a",
            "#ab5302",
            "#773e26",
            "#ab0256",
            "#257874",
            "#78254e",
            "#787725"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}