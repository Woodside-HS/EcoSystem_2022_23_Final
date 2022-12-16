class tPred3 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        //loc,vel,wrld,statblock all inherited by super
        this.hurtyBit = [];//this is the array of particle system of orbitals
        this.size = sz;//this is size of creature
        this.new = 0;//this is referencing when it will make a new particle
        this.hungy = 0;//this counts up to 5, once it reaches 5, nourishment will decrease
        this.foodId = {
            id: -1,
            or: -1
        };//this is the ID of the food item that is currently being eaten
        this.stuckLol = 0;//this is a variable that intends to "unstuck" the creature in case of me not wanting to fix bugs
        this.cooldown = 0;//keeps the creature from sprialing out of control with its numbers
        //below overwrites various creature stats so that it works more betterly
        this.dataBlock.sightValue = 50;
        this.dataBlock.maxSpeed = 1.5;
        this.dataBlock.lifeSpan = Math.random() * 10000 + 1000;
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
        if (this.dataBlock.nourishment >= 130 && this.dataBlock.age >= 3000) {
            this.statusBlock.searchMate = true;
            this.statusBlock.searchFood = false;
            this.statusBlock.eating = false;
        }
        //status block stuff below
        if (this.statusBlock.searchFood) {
            this.foodId.id = -1;//this CANNOT be after search food because oither wise it will just be overwritten every time
            this.foodId.id = -1;
            this.searchFood();
        }
        if (this.statusBlock.eating) {
            this.eat();
        }
        if (this.statusBlock.searchFood && this.statusBlock.eating && this.dataBlock.nourishment < 100) {//test code to alert if it has stuck
            this.statusBlock.searchFood = true;//both of these if statements are redundencies in case ther eis a bug that I dont care about fixing
            this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
        }
        if (!this.statusBlock.searchFood && !this.statusBlock.eating && this.dataBlock.nourishment < 100) {
            this.statusBlock.searchFood = true;
            this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
        }
        if (this.statusBlock.searchMate) {
            this.cooldown++
            this.searchMate();
        }
    }
    orbitals() {
        if (this.hurtyBit.length < 10) {
            if (this.new >= Math.random() *10 + 40) {
                this.new = 0;
                this.hurtyBit.push(new tPred3P(this.loc, this.getRandomColor(), 10));
            } else {
                this.new += 1;
            }

        }
        for (let i = this.hurtyBit.length - 1; i >= 0; i--) {
            this.hurtyBit[i].run(this.loc);
        }
        //want to have a "particle system" of orbitals which will slow everything down
    }
    searchFood() {
        let food = world.creatures.herb2;
        let food2 = world.creatures.herb3;
        let siteSq = this.dataBlock.sightValue * this.dataBlock.sightValue;
        for (let i = 0; i < food.length; i++) {
            if (!food[i].isDead && this.loc.distanceSquared(food[i].loc) <= siteSq) {
                world.creatures.herb2[i].sprint(this.loc);
                let attk = JSVector.subGetNew(food[i].loc, this.loc);
                attk.setMagnitude(0.5);
                this.vel.add(attk);//gets past here
            }
            if (this.loc.distanceSquared(food[i].loc) <= 100) {
                //console.log(world.creatures.herb2[i].dataBlock.health);//gets to here
                this.statusBlock.eating = true;
                this.statusBlock.searchFood = false;
                this.foodId.or = true;
                this.foodId.id = i;
                this.eat();//check to make sure that it is actually eating and there isnt a bug in between here and the next few lines

                world.creatures.herb2[i].vel = new JSVector(0, 0);
            }
        }
        for (let i = 0; i < food2.length; i++) {
            if (!food2[i].isDead && this.loc.distanceSquared(food2[i].loc) <= siteSq) {
                //food2[i].sprint(this.loc);
                let attk = JSVector.subGetNew(food2[i].loc, this.loc);
                attk.setMagnitude(0.5);
                this.vel.add(attk);//gets past here
            }
            if (this.loc.distanceSquared(food2[i].loc) <= 100) {
                //console.log(world.creatures.herb2[i].dataBlock.health);//gets to here
                this.statusBlock.eating = true;
                this.statusBlock.searchFood = false;
                this.foodId.or = false;
                this.foodId.id = i;
                this.eat();//check to make sure that it is actually eating and there isnt a bug in between here and the next few lines

                world.creatures.herb3[i].vel = new JSVector(0, 0);
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
            this.dataBlock.nourishment += 25;
            let i = this.foodId.id;//works until here
            if (world.creatures.herb2[i] && i != null && this.foodId.or) {
                if (world.creatures.herb2[i].dataBlock.isDead != true) {
                    if (this.loc.distanceSquared(world.creatures.herb2[i].loc) >= 100) {//this checks to make sure that the creature hasnt "escaped"
                        this.statusBlock.eating = false;
                        this.statusBlock.searchFood = true;
                        this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);//have to reset speed so it doesnt get stuck
                    }
                    if (world.creatures.herb2[i].dataBlock.health <= 30) {
                        world.creatures.herb2[i].dataBlock.health -= 30;
                        this.foodId.id = -1;
                        this.foodId.id = -1;
                        this.statusBlock.eating = false;
                        this.statusBlock.searchFood = true;
                        this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);//have to reset speed so it doesnt get stuck
                    } else {
                        world.creatures.herb2[i].dataBlock.health -= 30;//this bit works fine
                        //console.log(world.creatures.herb2[i].dataBlock.health);//the code never gets to this point
                    }
                    this.hurtyBit.splice(this.hurtyBit.length - 1, 1);//acts as if the orbitals attack thje creature instead of it just vibin there
                    this.new = 0;
                }
            } else if (world.creatures.herb3[i] && i != null && !this.foodId.or) {
                if (world.creatures.herb3[i].dataBlock.isDead != true) {
                    if (this.loc.distanceSquared(world.creatures.herb3[i].loc) >= 100) {//this checks to make sure that the creature hasnt "escaped"
                        this.statusBlock.eating = false;
                        this.statusBlock.searchFood = true;
                        this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);//have to reset speed so it doesnt get stuck
                    }
                    if (world.creatures.herb3[i].dataBlock.health <= 30) {
                        world.creatures.herb3[i].dataBlock.health -= 30;
                        this.foodId.id = -1;
                        this.foodId.or = -1;
                        this.statusBlock.eating = false;
                        this.statusBlock.searchFood = true;
                        this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);//have to reset speed so it doesnt get stuck
                    } else {
                        world.creatures.herb3[i].dataBlock.health -= 30;//this bit works fine
                        //console.log(world.creatures.herb2[i].dataBlock.health);//the code never gets to this point
                    }
                    this.hurtyBit.splice(this.hurtyBit.length - 1, 1);//acts as if the orbitals attack thje creature instead of it just vibin there
                    this.new = 0;
                }
            }//end of hurty if statement
        }
    }
    searchMate() {
        for (let i = 0; i < world.creatures.pred3.length; i++) {
            let siteSq = this.dataBlock.sightValue * this.dataBlock.sightValue;
            if (this.loc.distanceSquared(world.creatures.pred3[i].loc) <= siteSq && world.creatures.pred3[i].statusBlock.searchMate) {
                //checks that mate is in range and looking for baby
                let mate = world.creatures.pred3[i];
                let mte = JSVector.subGetNew(mate.loc, this.loc);
                mte.setMagnitude(0.05);
                this.acc.add(mte);
            }
            if (this.loc.distanceSquared(world.creatures.pred3[i].loc) <= 100 && this.cooldown >= 50) {
                this.dataBlock.nourishment -= 25;//I intend for it to be 50 but since both of them are probably gonna be running this it is 1/2
                world.creatures.pred3[i].dataBlock.nourishment -= 25;
                let x = Math.random() * world.dims.width - world.dims.width / 2;
                let y = Math.random() * world.dims.height - world.dims.height / 2;
                let dx = Math.random() * 4 - 2;
                let dy = Math.random() * 4 - 2
                world.creatures.pred3.push(new tPred3(new JSVector(x, y), new JSVector(dx, dy), this.size, world));
                this.statusBlock.searchMate = false;
                world.creatures.pred3[i].statusBlock.searchFood = false;
                this.cooldown = 0;
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
        let truMax = this.dataBlock.sightValue;
        if (this.dataBlock.age <= 100) {//simulating a newborn creature that cant REALLY move
            this.truMax = this.dataBlock.maxSpeed * 0.5;
        }
        if (this.dataBlock.age <= (this.dataBlock.lifeSpan * 0.75)) {//old and slow
            this.truMax = this.dataBlock.maxSpeed * 0.25;
        }
        this.vel.add(this.acc);
        this.vel.limit(truMax);
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
