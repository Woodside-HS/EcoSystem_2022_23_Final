class SBPSystem extends Food {
    // properties
    constructor(loc, vel, sz, wrld, death) {
        super(loc, vel, sz, wrld)
        this.death = death;
        this.vel.multiply(0);
        this.foodList = [];
        this.addParticle = 0;
    
    }
    //  methods
    run() {
        if(this.addParticle % 100 == 0){
            this.foodList.push(new PSystemFoodSB(this.loc, this.death, this.ctx, this.size));
        }
        this.addParticle++;
        this.pdeath();
        for(let i = 0; i<this.foodList.length; i++){
            this.foodList[i].run();
        }
    }


    pdeath() {
        for(let i = this.foodList.length -1; i>=0; i--){
            if(this.foodList[i].isDead){
                this.foodList.splice(i, 1);
            }
        }
    }
}
