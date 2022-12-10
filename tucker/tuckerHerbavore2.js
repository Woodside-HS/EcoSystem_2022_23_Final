class tuckerHerbavore2 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.vel = vel;
        this.maxJump = 1;//the max acc's magnitude can be before it jumps
        this.acc = new JSVector(0, 0);
        this.jmpCooldownMax = 20;
        this.jmpCooldown = 0;
        //various movement variable above
        this.ctx = wrld.ctxMain;
        this.foodEat = null;//which thing to eat
        this.predatorsLocation = new JSVector(0, 0);
        // this.statusBlock = { this is just for reference for me
        //     searchFood: true,
        //     searchMate: true,
        //     eating: false,
        //     sprint: false,
        //     sleeping: false,
        //     attack: false,
        //     deathProc: false
        // };
        // this.dataBlock = {//  status block 
        //     health: 100,
        //     isDead: false,
        //     nourishment: 100,
        //     lifeSpan: 30000,//  miliseconds roughly 30 sec
        //     age: 0,
        //     numOffspring: 3,
        //     maxSpeed: 1,
        //     maxSprintSpeed: 1,
        //     scentValue: 100,
        //     sightValue: 100,
        //     weight: 10,
        // };
        this.clr = this.getRandomColor();
        this.rad = sz;
        //creature info variable
    }
    run() {
        this.render();
        this.update();
        //this.warpEdges(); doesnt work and I literally do not care
        //this.bounce(); this doesnt work and I dont care why
        // if(sprint){

        // } else
        if (this.statusBlock.eating == true) {
            this.consuming();
        } else if (this.foodEat != null) {
            this.foodEat = null;//returns the foodEat variable to null if it has finished eating and it is not already set to null
        }
        if (this.statusBlock.searchFood) {
            this.searchingForFood();
        }

    }
    consuming() {
        let i = this.foodEat;
        this.dataBlock.nourishment++;
        if (world.foods.food2[i]) {//makes sure the food item still exists before you render it
            if (world.foods.food2[i].statBlock.nourishment <= 2) {
                //this needs to go before the others so that it checks this forst
                //hopefully this should fix it -- It did not -- Wait it did
                world.foods.food2[i].statBlock.nourishment--;
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = true;
                this.vel = new JSVector(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
                this.foodEat = null;
            } else if (world.foods.food2[i].statBlock.nourishment > 0) {//sometimes it just doens't exist - I think its cause of some splicng error
                world.foods.food2[i].statBlock.nourishment--;
            } else {
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = true;
                this.foodEat = null;
                this.vel = new JSVector(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
            }// I need some way to restart movement after eating something
        } else {//should be checking to make sure that it goes back to check eat wont ever be run because it new thing is created
            this.statusBlock.eating = false;
            this.statusBlock.searchFood = true;
            this.vel = new JSVector(Math.random() - 0.5, Math.random() - 0.5)
        }
    }
    searchingForFood() {//makes sure that the creature is actuawlly searching for food
        //normal foods below
        for (let i = 0; i < world.foods.food3.length; i++) {//only gos thru food3 rn should be pretty easily be able to modify to work with particle sytstems
            let sightSq = this.dataBlock.sightValue * this.dataBlock.sightValue;
            if (this.loc.distanceSquared(world.foods.food2[i].loc) < sightSq) {//checks that food is within the "sight value range"
                let jmp = JSVector.subGetNew(world.foods.food2[i].loc, this.loc);
                jmp.setMagnitude(0.05);
                this.acc.add(jmp);
                if (this.loc.distanceSquared(world.foods.food2[i].loc) < 400) {//if the frog is close enough, then it will kill its velocity and end the search food and instead start eating
                    this.vel.setMagnitude(0);
                    this.acc.setMagnitude(0);
                    this.statusBlock.searchFood = false;
                    this.statusBlock.eating = true;
                    this.foodEat = i;//sets foodEat to the # of the food variable to consume nourishment from
                }
            }
        }
        //particle system below
        //IMPORTANT REMEMNBER THAT THIS IS A THING
        let runPS = false;//test code so that I can see how it works with and without PS working
        if (runPS) {
            for (let i = 0; i < world.foods.pSys2.length; i++) {
                let sightSq = this.dataBlock.sightValue * this.dataBlock.sightValue;
                if (this.loc.distanceSquared(world.foods.pSys2[i].loc) < sightSq) {
                    let pS = world.foods.pSys2[i].foodList;//goes directly to the food list
                    if (pS.length > 1) {
                        let maxNourish = pS[0].statBlock.nourishment;//will search for the one with the highest rotation so that it doesn't panic trying to go to every one
                        for (let j = 0; j<pS.length; j++) {//this for loop breaks it - causes the page to go unresponsive and idk why
                            let jmp = JSVector.subGetNew(pS[i].loc,this.loc);
                            jmp.setMagnitude(0.05);
                            this.acc.add(jmp);
                            if (this.loc.distanceSquared(pS[i].loc) < 400) {//
                                this.vel.setMagnitude(0);
                                this.acc.setMagnitude(0);
                                this.statusBlock.searchFood = false;
                                this.statusBlock.eating = true;
                                //this.foodEat = i;//sets foodEat to the # of the food variable to consume nourishment from to Do: Figure out how to eat the particle systems
                            }
                        }
                    }

                }
            }
        }

    }
    sprint(predLoc) {//predator will activate this it will send its current location to this creature every frame 


    }
    warpEdges() {
        if (this.loc.x > world.dims.right) {
            this.loc.x = world.dims.left;
        }
        if (this.loc.x < 0) {
            this.loc.x = world.dims.width;
        }
        if (this.loc.y > world.dims.height) {
            this.loc.y = 0;
        }
        if (this.loc.y < 0) {
            this.loc.y = world.dims.height;
        }
    }
    update() {
        if (this.acc.getMagnitude() > 1 && this.jmpCooldown >= this.jmpCooldownMax) {//makes sure there is already some momentum in the jump and that jump isnt on cooldown
            //this.acc.getMagnitude() > 3 &&
            this.vel.add(this.acc);
            this.jmpCooldown = 0;
            this.acc = new JSVector(0, 0);//have to reset the acc jsvector
        }
        this.jmpCooldown++;
        this.loc.add(this.vel);
        if (this.vel.getMagnitude() > 0.1) {//slows the frog down but never stops it
            this.vel.setMagnitude(this.vel.getMagnitude() - 0.0005);
        }
        if (this.vel.getMagnitude() < 0) {
            this.vel.setMagnitude(0);
        }
    }
    render() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.acc.getDirection());
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.rad, this.rad);//bottom left
        ctx.lineTo(this.rad, this.rad);//bottom right
        ctx.lineTo(this.rad, -this.rad);//top right
        ctx.lineTo(-this.rad, -this.rad);//top left
        ctx.lineTo(-this.rad, this.rad);
        ctx.restore();
        ctx.closePath();//closes the square, to be fabulized at a later date of which is not confirmed yet.
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(this.loc.x, this.loc.y);//this is the jump line so it is outside of the restore and rotation, is 4x the acc
        ctx.lineTo(this.loc.x + (this.acc.x * 4), this.loc.y + (this.acc.y * 4));
        ctx.fill();
        ctx.closePath();//closes just the line
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