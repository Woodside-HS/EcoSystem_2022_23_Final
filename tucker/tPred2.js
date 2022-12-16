class tPred2 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.rot = 0;
        this.foodDirect = 0;
        this.no = false
        this.dataBlock.sightValue = 100;
        this.foodId = {
            creatTp : -1,
            creatId : -1
        }
    }
    run() {
        this.render();
        this.runChecks();
        this.update();
    }
    runChecks(){
        if(this.statusBlock.nourishment >=200 && this.statusBlock.age >=500 && this.no){
            this.statusBlock.searchMate =true;
            this.statusBlock.eating = false;
            this.statusBlock.searchFood = false;
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

        }
    }
    searchMate(){

    }
    searchFood(){
        let food1 = world.creatures.pred3;
        let food2 = world.creatures.herb1;
        for(let i = 0; i <food1.length;i++){
            let siteSq = this.statusBlock.sightValue*this.statusBlock.sightValue;
            if(this.loc.distanceSquared(food1[i].loc)<siteSq && food[i]){
                console.log("skrg");
                let mv = JSVector.subGetNew(food[i].loc,this.loc)
                this.foodDirect = mv.getDirection();
                mv.setMagnitude(0.05);
                this.acc.add(mv);
            }
        }
    }
    eat(){

    }
    update(){
        //deals with the rotation of the wings 
        if(this.vel.getMagnitude()<=0.5){
            this.rot+=0.05;
        } else {
            this.rot+=0.1;
        }
        if(this.rot>=1.1){
            this.rot=0;
        }
        //general movement
        this.vel.add(this.acc)
        this.vel.limit(this.dataBlock.maxSpeed);
        this.loc.add(this.vel)
    }
    render() {
        //if(){ Need to make it so that when outside of viewing area it disappears but that seems snnoying to make

        //}
        let ctx = world.ctxMain;
        //translate doesnt work so I us this instead
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
        ctx.translate(x, y);
        x = 0;
        y = 0;
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(x + this.size, y - this.size);
        ctx.lineTo(x + this.size * 3, y - this.size - smlSz);
        ctx.arc(x + this.size * 3, y, this.size * 1.5, 6 * Math.PI / 4, 0);//DONT TOUNC (IT GONNA DIE)
        ctx.lineTo(x + this.size * 4, y + smlSz);
        ctx.lineTo(x + this.size * 3.5, y);
        ctx.lineTo(x + this.size * 3, y + smlSz);
        ctx.lineTo(x + this.size * 2.5, y);
        ctx.lineTo(x + this.size * 2, y + smlSz);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        //x = this.loc.x;
        //y = this.loc.y;
        //left wing
        ctx.translate(x,y);
        x = 0;
        y = 0;
        ctx.rotate(-this.rot);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(x - this.size, y - this.size);
        ctx.lineTo(x - this.size * 3, y - this.size - smlSz);
        ctx.arc(x - this.size * 3, y, this.size * 1.5, Math.PI, 6 * Math.PI / 4);//DONT TOUNC (IT GONNA DIE)
        ctx.lineTo(x - this.size * 4.5, y);
        ctx.lineTo(x - this.size * 4, y + smlSz);
        ctx.lineTo(x - this.size * 3.5, y);
        ctx.lineTo(x - this.size * 3, y + smlSz);
        ctx.lineTo(x - this.size * 2.5, y);
        ctx.lineTo(x - this.size * 2, y + smlSz);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
        //x = this.loc.x;
        //y = this.loc.y;
        //head
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#560000";//dark red for head but for some reason it overlaps
        
        ctx.translate(this.loc.x,this.loc.y-(this.size + smlSz));
        ctx.rotate(this.foodDirect);
        //ctx.rotate();//head rotation, to look directly at nearest creature tbd
        ctx.moveTo(0,0);
        ctx.lineTo(-smlSz/4,0);
        ctx.lineTo(-2*smlSz/4,smlSz);//tip of horn
        ctx.lineTo(-3*smlSz/4,0);
        ctx.lineTo(-2*smlSz/4,-this.size);
        ctx.lineTo(2*smlSz/4,-this.size);
        ctx.lineTo(3*smlSz/4,0);
        ctx.lineTo(2*smlSz/4,smlSz);//tip of horn 2
        ctx.lineTo(smlSz/4,0)
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}