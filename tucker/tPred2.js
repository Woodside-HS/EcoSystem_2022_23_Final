class tPred2 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.id = "tPred2";
        this.rot = Math.random()*2;
        this.foodDirect = 0;
        this.no = false
        this.dataBlock.sightValue = 50;
        this.foodId = {
            creatTp : -1,//this is the type of the creature that it is eating
            creatId : -1//this is the ID of the creature being eaten
        }
    }
    run() {
        if (this.dataBlock.nourishment <= 0 || this.dataBlock.health <= 0 || this.dataBlock.age >= this.dataBlock.lifeSpan) {
            this.dataBlock.isDead = true;
        }
        this.render();
        this.checkEdges();
        this.runChecks();
        this.update();
    }
    runChecks(){
        if(this.statusBlock.nourishment >=200 && this.statusBlock.age >=500 && this.no){
            // this.statusBlock.searchMate =true;
            // this.statusBlock.eating = false;
            // this.statusBlock.searchFood = false;
        }
        if(this.nourishment <= 150){
            this.statusBlock.searchMate = false;
            this.statusBlock.searchFood = true;
        }
        if(this.statusBlock.searchFood){
            this.searchFood();
        }
        if(this.statusBlock.searchMate){
            this.searchMate();
        }
        if(this.statusBlock.eating){
            this.eat();
        }
    }
    searchMate(){
        let pred = world.creatures.pred3
        for(let i = 0; i<pred.length;i++){
            if(this.id == pred[i].id && this != pred[i]){
                //makes sure it is the same type of creature and it isnt looking at itself
                let siteSq = this.statusBlock.sightValue*this.statusBlock.sightValue;
                if(this.distanceSquared(pred[i].loc)<=siteSq){

                }
            }
        }
    }
    // let siteSq = this.dataBlock.sightValue * this.dataBlock.sightValue;
    //         if (this.loc.distanceSquared(world.creatures.pred3[i].loc) <= siteSq && world.creatures.pred3[i].statusBlock.searchMate && world.creatures.pred3 ) {
    //             //checks that mate is in range and looking for baby
    //             let mate = world.creatures.pred3[i];
    //             let mte = JSVector.subGetNew(mate.loc, this.loc);
    //             mte.limit(0.05);
    //             this.acc.add(mte);
    //         }
    //         if (this.loc.distanceSquared(world.creatures.pred3[i].loc) <= 100 && this.cooldown >= 50 && world.creatures.pred3.length <100) {
    //             this.dataBlock.nourishment -= 25;//I intend for it to be 50 but since both of them are probably gonna be running this it is 1/2
    //             world.creatures.pred3[i].dataBlock.nourishment -= 25;
    //             let x = Math.random() * world.dims.width - world.dims.width / 2;
    //             let y = Math.random() * world.dims.height - world.dims.height / 2;
    //             let dx = Math.random() * 4 - 2;
    //             let dy = Math.random() * 4 - 2
    //             world.creatures.pred3.push(new tPred3(new JSVector(x, y), new JSVector(dx, dy), this.size, world));
    //             this.statusBlock.searchMate = false;
    //             world.creatures.pred3[i].statusBlock.searchFood = false;
    //             this.cooldown = 0;
    //         }
    searchFood(){
        let food1 = world.creatures.pred3;
        let food2 = world.creatures.herb1;
        for(let i = 0; i <food1.length;i++){
            let siteSq = this.dataBlock.sightValue*this.dataBlock.sightValue;
            if(food1[i]){
                if(this.loc.distanceSquared(food1[i].loc)<siteSq && food1[i] && this != food1[i]){
                    let mv = JSVector.subGetNew(food1[i].loc,this.loc)
                    this.foodDirect = mv.getDirection();
                    mv.limit(0.05);
                    this.acc.add(mv);
                }
                if(this.loc.distanceSquared(food1[i].loc)<100){
                    this.foodId.creatTp = 0;//0 is predator 3, 1 is herbavore 1
                    this.foodId.creatId = i;
                    this.statusBlock.eating = true;
                    this.eat();
                }
            }//end of food 1 existance if statement
        }//end of food1 for loop
        for(let i = 0; i <food2.length;i++){
            let siteSq = this.dataBlock.sightValue*this.dataBlock.sightValue;
            if(food2[i]){
                if(this.loc.distanceSquared(food2[i].loc)<siteSq && food2[i] && this != food2[i]){
                    let mv = JSVector.subGetNew(food2[i].loc,this.loc)
                    this.foodDirect = mv.getDirection();
                    mv.limit(0.05);
                    this.acc.add(mv);
                }
                if(this.loc.distanceSquared(food2[i].loc)<100){
                    this.foodId.creatTp = 0;//0 is predator 3, 1 is herbavore 1
                    this.foodId.creatId = i;
                    this.statusBlock.eating = true;
                    this.eat();
                }
            }//end of food 1 existance if statement
        }//end of food1 for loop
    }
    eat(){
        //set up variables for this thing
        this.dataBlock.nourishment += 50;
        let food1 = world.creatures.pred3;
        let food2 = world.creatures.herb1;
        let i = this.foodId.creatId;//using this cause I like i

        if(food1[i] && this.foodId.foodId == 0 && this.loc.distanceSquared(food1[i].loc)<=100){
            food1[i].statusBlock.health -= 50;
            this.vel = new JSVector(0,0);
            if(food1[i].statusBlock.health <= 10 ||food1[i].isDead ){//resets the creature to a default state
                food2[i].statusBlock.health -= 50;
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = false;
                this.foodId.creatTp = -1;
                this.foodId.creatId = -1;
                this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);//have to make sure that the creature cotinues to move after eating
            }
        } else if (food2[i] && this.foodId.creatId == 1 && this.loc.distanceSquared(food2[i].loc)<=100) {
            food2[i].statusBlock.health -= 50;
            this.vel = new JSVector(0,0);
            if(food2[i].statusBlock.health <= 10 || food2[i].isDead){//this resets the creature to a default state
                food2[i].statusBlock.health -= 50;
                this.statusBlock.eating = false;
                this.statusBlock.searchFood = false;
                this.foodId.creatTP = -1;
                this.foodId.creatId = -1;
                this.vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
            }
        }//end of existance if statement 
    }
    update(){
        //deals with the rotation of the wings 
        if(this.vel.getMagnitude()<=0.5){
            this.rot+=0.025;
        } else {
            this.rot+=0.05;
        }
        if(this.rot>=1.1){
            this.rot=0;
        }
        //general movement
        this.vel.add(this.acc)
        this.vel.limit(this.dataBlock.maxSpeed);
        this.loc.add(this.vel)
        this.acc = new JSVector(0,0);
    }
    render() {
        //imma be honest I dont know how half of this works but it does
        let ctx = world.ctxMain;
        let smlSz = this.size / 2;
        let x = this.loc.x;
        let y = this.loc.y;
        ctx.fillStyle = "black";
        ctx.save();
        ctx.translate(this.loc.x,this.loc.y);
        ctx.rotate(this.vel.getDirection()+Math.PI/2);
        x = 0;
        y = 0;
        //tail
        ctx.beginPath();
        ctx.moveTo(x, y + this.size * 2 + smlSz);//tip of dragons tail
        ctx.lineTo(x + smlSz, y + smlSz);
        ctx.lineTo(x - smlSz, y + smlSz);
        ctx.closePath();//endof tail
        ctx.fill();
        //body
        ctx.beginPath();
        ctx.moveTo(x - smlSz, y + smlSz);//bottom left
        ctx.lineTo(x - this.size, y - this.size);//middle left
        ctx.lineTo(x - smlSz, y - (this.size + smlSz));//top left
        ctx.lineTo(x + smlSz, y - (this.size + smlSz));//top right
        ctx.lineTo(x + this.size, y - this.size);//middle right
        ctx.lineTo(x + smlSz, y + smlSz);//bottom right
        ctx.closePath();//endof body
        ctx.fill();
        //right wing I want these bois to rotate but thats for later
        ctx.save();
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(x + this.size, y - this.size);//top of the wing
        ctx.lineTo(x + this.size * 3, y - this.size - smlSz);
        ctx.arc(x + this.size * 3, y, this.size * 1.5, 6 * Math.PI / 4, 0);//DONT TOUNC (IT GONNA DIE)
        ctx.lineTo(x + this.size * 4, y + smlSz);
        ctx.lineTo(x + this.size * 3.5, y);
        ctx.lineTo(x + this.size * 3, y + smlSz);//pokey at the bottom of the wing
        ctx.lineTo(x + this.size * 2.5, y);
        ctx.lineTo(x + this.size * 2, y + smlSz);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        //left wing
        ctx.save();
        ctx.rotate(-this.rot);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(x - this.size, y - this.size);//top of the wing
        ctx.lineTo(x - this.size * 3, y - this.size - smlSz);
        ctx.arc(x - this.size * 3, y, this.size * 1.5, Math.PI, 6 * Math.PI / 4);//DONT TOUNC (IT GONNA DIE)
        ctx.lineTo(x - this.size * 4.5, y);//this has to be here for some reason
        ctx.lineTo(x - this.size * 4, y + smlSz);
        ctx.lineTo(x - this.size * 3.5, y);
        ctx.lineTo(x - this.size * 3, y + smlSz);//these bits are the pokey bits at the bottom of the wing
        ctx.lineTo(x - this.size * 2.5, y);
        ctx.lineTo(x - this.size * 2, y + smlSz);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        //head
        ctx.beginPath();
        ctx.fillStyle = "#560000";
        ctx.rotate(this.vel.foodDirect - Math.PI/2);
        let xy =  -(this.size + smlSz)
        ctx.moveTo(0,xy);
        ctx.lineTo(-smlSz/4,xy);
        ctx.lineTo(-2*smlSz/4,xy+smlSz);//tip of horn
        ctx.lineTo(-3*smlSz/4,xy);
        ctx.lineTo(-2*smlSz/4,xy-this.size);
        ctx.lineTo(2*smlSz/4,xy-this.size);
        ctx.lineTo(3*smlSz/4,xy);
        ctx.lineTo(2*smlSz/4,xy+smlSz);//tip of horn 2
        ctx.lineTo(smlSz/4,xy)
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    checkEdges() {
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
}