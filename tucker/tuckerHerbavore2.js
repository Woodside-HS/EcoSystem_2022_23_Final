class tuckerHerbavore2 extends Creature {
    constructor(loc,vel,sz, wrld,sttblk,dtblk){
        super(loc,vel,sz,wrld,sttblk,dtblk)
        this.loc = loc;
        this.vel = vel;
        this.clr = this.getRandomColor();
        this.statusBlock = sttblk;
        // this.statusBlock = {
        //     searchFood:true,
        //     searchMate:true,
        //     eating:false,
        //     sprint:false,
        //     sleeping:false,
        //     attack:false,
        //     deathProc:false
            
        //  };
        // this.dataBlock = {//  status block 
        //     health: 100,
        //     isDead: false,
        //     nourishment: 100,
        //     lifeSpan:30000,//  miliseconds
        //     age:0,
        //     numOffspring:3,
        //     maxSpeed: 1,
        //     maxSprintSpeed: 1,
        //     scentValue: 100,
        //     sightValue: 100,
        //     weight:10,
        //  };
        this.dataBlock = dtblk;
        this.maxJump = 1;
        this.acc = new JSVector(0,0);
    }
    run(){

    }
    update(){

    }
    render(){

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