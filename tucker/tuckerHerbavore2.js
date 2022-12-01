class tuckerHerbavore2 {
    constructor(loc,vel,sz, wrld){
        this.loc = loc;
        this.vel = vel;
        this.clr = this.getRandomColor();
        this.ctx = wrld.ctxMain;
        this.rad = sz;
        this.statusBlock = {
            searchFood:true,
            searchMate:true,
            eating:false,
            sprint:false,
            sleeping:false,
            attack:false,
            deathProc:false
         };
        this.dataBlock = {//  status block 
            health: 100,
            isDead: false,
            nourishment: 100,
            lifeSpan:30000,//  miliseconds roughly 30 sec
            age:0,
            numOffspring:3,
            maxSpeed: 1,
            maxSprintSpeed: 1,
            scentValue: 100,
            sightValue: 100,
            weight:10,
         };
        this.maxJump = 1;
        this.acc = new JSVector(0,0);
    }
    run(){
        this.render();
        this.update();
        // if(sprint){

        // } else
        if(this.statusBlock.searchFood){
            for(let i = 0; i<world.foods.food2.length;i++){
                let sightSq = this.dataBlock.sightValue+this.dataBlock.sightValue;
                if(this.loc.distanceSquared(world.foods.food2[i].loc)<sightSq){
                    let jmp = JSVector.subGetNew(world.foods.foods[i].loc,this.loc);
                    jmp.setMagnitude(0.05)
                    this.acc.add(jmp);
                }
            }
        }

    }
    sprint(predLoc){//predator will activate this 

    }
    update(){
        if(this.acc.getMagnitude()>3){
            this.vel.add(this.acc);
        }
        this.loc.add(this.vel);
        if(this.vel.getMagnitude()>0){
            this.vel.setMagnitude(this.vel.getMagnitude()-0.5);
        }
        if(this.vel.getMagnitude()<0){
            this.vel.setMagnitude(0);
        }
    }
    render(){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.loc.x,this.loc.y,this.rad,0,Math.PI*2);
        ctx.fill();
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