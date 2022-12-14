class tPred3 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        //loc,vel,wrld,statblock all inherited by super
        this.hurtyBit = [];
        this.size = sz;
        this.spwanNew = 0;
        this.new = 0;
        this.hungy = 0;
        this.dataBlock.sightValue = 50;
        this.dataBlock.maxSpeed = 3;
        this.foodId = null;
        this.stuckLol = 0;
    }
    run() {
        if (this.dataBlock.nourishment <= 0 || this.dataBlock.health <= 0 || this.dataBlock.age >= this.dataBlock.lifeSpan) {
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
        
        if(this.dataBlock.nourishment >=500 && this.dataBlock.age>=100){
            this.statusBlock.searchMate = true;
            this.statusBlock.searchFood = false;
            this.statusBlock.eating = false;
        }


        //status block stuff below
        if (this.statusBlock.searchFood) {
            this.searchFood();
            this.foodId = null;
        }
        if (this.statusBlock.eating) {
            this.eat();
        }
    }
    orbitals() {
        if (this.hurtyBit.length < 9) {//&& this.spawnNew>=10
            if (this.new >= Math.PI / 5) {
                this.new = 0;
                this.hurtyBit.push(new tPred3P(this.loc, this.getRandomColor(), 10));
            } else {
                this.new += Math.PI / 50;
            }

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
                attk.setMagnitude(0.5);
                this.vel.add(attk);//you aren't being added
            }
            if (this.loc.distanceSquared(food[i].loc) <= 100) {
                this.statusBlock.eating = true;
                this.statusBlock.searchFood = false;
                this.foodId = i;
                this.vel = new JSVector(0, 0);
                world.creatures.herb2[i].vel = new JSVector(0, 0);
            }
        }
    }
    eat() {//doesnt get to here
        if (this.hurtyBit.length > 0) {
            this.stuckLol++;
            if (this.stuckLol >= 50) {
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = true;
                this.stuckLol = 0;
                this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
            }
            this.dataBlock.nourishment += 50;
            let i = this.foodId;
            if (world.creatures.herb2[i]) {
                if (world.creatures.herb2[i].dataBlock.isDead != true) {
                    if (this.loc.distanceSquared(food[i].loc) >= 100) {
                        this.statusBlock.eating = false;
                        this.statusBlock.searchFood = true;
                    }
                    if (world.creatures.herb2[i].dataBlock.health <= 30) {
                        world.creatures.herb2[i].dataBlock.health -= 25;
                        console.log(world.creatures.herb2[i].dataBlock.health);
                        this.foodId = null;
                        this.statusBlock.eating = false;
                        this.statusBlock.searchFood = true;
                    } else {
                        world.creatures.herb2[i].dataBlock.health -= 25;
                        console.log(this.dataBlock.nourishment);
                    }
                    this.hurtyBit.splice(this.hurtyBit.length - 1, 0)
                }
            }
        }
        //for some reason it can just go to that instane of the  creature
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
        this.acc = new JSVector(0, 0);
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