class tuckerHerbavore2 {
    constructor(loc, vel, sz, wrld) {
        this.loc = loc;
        this.vel = vel;
        this.maxJump = 1;//the max acc's magnitude can be before it jumps
        this.acc = new JSVector(0, 0);
        this.jmpCooldownMax = 100;
        this.jmpCooldown = 0;
        //various movement variable above

        this.ctx = wrld.ctxMain;
        this.foodEat = null;

        this.statusBlock = {
            searchFood: true,
            searchMate: true,
            eating: false,
            sprint: false,
            sleeping: false,
            attack: false,
            deathProc: false
        };
        this.dataBlock = {//  status block 
            health: 100,
            isDead: false,
            nourishment: 100,
            lifeSpan: 30000,//  miliseconds roughly 30 sec
            age: 0,
            numOffspring: 3,
            maxSpeed: 1,
            maxSprintSpeed: 1,
            scentValue: 100,
            sightValue: 1000,
            weight: 10,
        };
        this.clr = this.getRandomColor();
        this.rad = sz;
        //creature info variable
    }
    run() {
        this.render();
        this.update();
        //this.bounce(); this doesnt work and I dont care why
        // if(sprint){

        // } else
        if (this.statusBlock.eating == true) {
            let i = this.foodEat;
            this.dataBlock.nourishment++;
            if (world.foods.food2[i]) {//makes sure the food item still exists before you render it
                if (world.foods.food2[i].statBlock.nourishment >= 0) {//sometimes it just doens't exist - I think its cause of some splicng error
                    //current theory: item has been spliced out of the array, everything moves back and now it dont exist
                    world.foods.food2[i].statBlock.nourishment--;
                } else {
                    this.statusBlock.eating = false;
                    this.statusBlock.searchFood = true;
                    this.vel = new JSVector(Math.random() - 0.5, Math.random() - 0.5);
                }// I need some way to restart movement after eating something
            } else {
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = true;
                this.vel = new JSVector(Math.random() - 0.5, Math.random() - 0.5)
            }
        } else if (this.foodEat != null) {
            this.foodEat = null;//returns the foodEat variable to null if it has finished eating and it is not already set to null
        }
        if (this.statusBlock.searchFood) {//makes sure that the creature is actuawlly searching for food
            for (let i = 0; i < world.foods.food2.length; i++) {//only gos thru food2 rn
                let sightSq = this.dataBlock.sightValue + this.dataBlock.sightValue;
                if (this.loc.distanceSquared(world.foods.food2[i].loc) < sightSq) {//checks that food is within the "sight value range"
                    let jmp = JSVector.subGetNew(world.foods.food2[i].loc, this.loc);
                    jmp.setMagnitude(0.05);
                    this.acc.add(jmp);
                    if (this.loc.distanceSquared(world.foods.food2[i].loc) < 100) {//if the frog is close enough, then it will kill its velocity and end the search food and instead start eating
                        this.vel.setMagnitude(0);
                        this.acc.setMagnitude(0);
                        this.statusBlock.searchFood = false;
                        this.statusBlock.eating = true;
                        this.foodEat = i;//sets foodEat to the # of the food variable to consume nourishment from
                    }
                }
            }
        }

    }
    sprint(predLoc) {//predator will activate this 

    }
    update() {
        if (this.acc.getMagnitude() > 3 && this.jmpCooldown >= this.jmpCooldownMax) {//makes sure there is already some momentum in the jump and that jump isnt on cooldown
            this.vel.add(this.acc);
            this.jmpCooldown = 0;
            this.acc = new JSVector(0, 0);//have to reset the acc jsvector
        }
        this.jmpCooldown++;
        this.loc.add(this.vel);
        if (this.vel.getMagnitude() > 0) {//slows the frog down
            this.vel.setMagnitude(this.vel.getMagnitude() - 0.0005);
        }
        if (this.vel.getMagnitude() < 0) {
            this.vel.setMagnitude(0);
        }
    }
    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.loc.x, this.loc.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.loc.x, this.loc.y);
        ctx.lineTo(this.loc.x + (this.acc.x * 4), this.loc.y + (this.acc.y * 4));
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }
    bounce() {
        if (this.loc.x > world.dims.width) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.x < 0) {
            this.vel.x = -this.vel.x;
        }
        if (this.loc.y > world.dims.height) {
            this.vel.y = -this.vel.y;
        }
        if (this.loc.y < 0) {
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