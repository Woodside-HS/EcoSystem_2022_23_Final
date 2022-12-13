class tPred3 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        //loc,vel,wrld,statblock all inherited by super
        this.hurtyBit = [];
        this.size = sz;
        this.spwanNew = 0;
        this.hungy = 0;
        this.dataBlock.sightValue = 50;
        this.dataBlock.maxSpeed = 3;
        this.foodId = null;
    }
    run() {
        if(this.dataBlock.nourishment <=0 ||  this.dataBlock.health<=0 || this.dataBlock.age >= this.dataBlock.lifeSpan){
            this.dataBlock.isDead = true;
        }
        this.dataBlock.age++;
        if (this.hungy > 5) {
            this.dataBlock.nourishment--;
            this.hungy = 0;
        }
        this.hungy++;
        this.update();
        this.render();
        this.bounceEdges();
        this.orbitals();
        if(this.statusBlock.searchFood){
            this.searchFood();
            this.foodId = null;
        }
        if(this.statusBlock.eating){
            this.eat
        }
        
    }
    orbitals() {
        if (this.hurtyBit.length < 10) {//&& this.spawnNew>=10
            this.hurtyBit.push(new tPred3P(this.loc, this.getRandomColor(), 10));
        }
        for (let i = this.hurtyBit.length - 1; i >= 0; i--) {
            this.hurtyBit[i].run(this.loc);
        }
        //want to have a "particle system" of orbitals which will slow everything down
    }
    searchFood() {
        let food = world.creatures.herb2;
        let siteSq = this.dataBlock.sightValue * this.dataBlock.sightValue;
        for (let i = 0; i < food.length; i++) {
            if (!food[i].isDead && this.loc.distanceSquared(food[i].loc) <= siteSq) {
                world.creatures.herb2[i].sprint(this.loc);
                let attk = JSVector.subGetNew(food[i].loc, this.loc);
                attk.setMagnitude(0.05);
                this.acc.add(attk);
                console.log(this.acc.getMagnitude());
            }
            if(this.loc.distanceSquared(food[i].loc) <= 100){
                this.statusBlock.eating = true;
                this.statusBlock.searchFood = false;
                this.foodId = i;
                this.vel = new JSVector(0,0);
                world.creatures.herb2[i].vel = new JSVector();
            }
        }
    }
    eat(){
        this.dataBlock.nourishment++;

        let i = this.foodId;
        world.creatures.herb2[i].health--;
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
        this.acc = new JSVector(0,0);
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