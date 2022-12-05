class SBCreature3 extends Creature {
    // properties

    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.numSegs = this.dataBlock.health/20;
        this.segLength = 10;
        this.segments = [];
        this.acc = new JSVector(0,0);
        this.loadSegments();
        this.clr = "lime";
        this.hrad = 14;
        this.world = wrld;
        this.counter = 0;
        this.food;
    }

    loadSegments() {
        let ploc = new JSVector(this.loc.x, this.loc.y);
        for(let i = 0; i<this.numSegs; i++){
            let vel2 = new JSVector(this.vel.x, this.vel.y);
            vel2.setMagnitude(this.segLength);
            let vec = JSVector.subGetNew(ploc, vel2);
            this.segments.push(vec); //potential error
            ploc = new JSVector(vec.x, vec.y);
        }
    
    }
    
    run() {
        //console.log(this.vel);
        if(this.statusBlock.eating){
            this.eat();
        }
        else{
            this.search();
            this.update();
            this.bounce();
        }
        this.render();
    
    }
    
    
    update() {
        this.loc.add(this.vel);
        let temp;
        let ploc = new JSVector(this.loc.x, this.loc.y);
        let dis;
        for(let i = 0; i<this.segments.length; i++){
            temp= new JSVector(this.segments[i].x, this.segments[i].y);
            temp = JSVector.subGetNew(temp, ploc);
            temp.limit(this.vel.getMagnitude());
            temp.multiply(-1);
            this.segments[i].add(temp);
            dis = this.segments[i].distance(ploc);
            if(dis<this.segLength){
                temp.setMagnitude(this.segLength-dis);
                this.segments[i].sub(temp); 
            }
            ploc = this.segments[i];
        }
    }
    
    
    render() {
        this.ctx.save();
        this.ctx.translate(this.loc.x, this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(25, 8);
        this.ctx.strokeStyle = "lime";
        this.ctx.stroke();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(25, -8);
        this.ctx.stroke();
        this.ctx.restore();
        let ploc = new JSVector(this.loc.x, this.loc.y);
        for(let i = 0; i<this.segments.length; i++){
            this.ctx.moveTo(ploc.x, ploc.y);
            ploc = new JSVector(this.segments[i].x, this.segments[i].y);
            this.ctx.beginPath();
            this.ctx.arc(this.segments[i].x, this.segments[i].y, 2.5*this.hrad/(i+2), 0, 2 * Math.PI); 
            this.ctx.strokeStyle = this.clr;  
            this.ctx.fillStyle = "black";   
            this.ctx.fill(); 
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.beginPath();
        this.ctx.arc(this.loc.x, this.loc.y, this.hrad, 0, 2 * Math.PI); 
        this.ctx.strokeStyle = this.clr;  
        this.ctx.fillStyle = "black";   
        this.ctx.fill(); 
        this.ctx.stroke(); 
        this.ctx.closePath();
    
    }
    
    bounce(){
    if(this.loc.y < world.dims.top || this.loc.y > world.dims.bottom){
        this.vel.y = -this.vel.y;
      }
      if(this.loc.x < this.world.dims.left || this.loc.x > this.world.dims.right){
        this.vel.x = -this.vel.x;
      }
    }

    search(){
        for(let i = 0; i<this.world.foods.food2; i++){
            let check = this.world.foods.food2;
            if(this.loc.distance(check[i].loc)<200 && this.loc.distance(check[i].loc)>20 && !check[i].isDead){
                this.acc = JSVector.subGetNew(check[i].loc, this.loc);
                this.acc.normalize.mulitply(0.05);
                console.log("a");
            }
            else if(this.loc.distance(check[i].loc)<20){
                console.log("b");
                this.statusBlock.search = false;
                this.statusBlock.eating = true;
                this.food = check[i].foodList[j];
            }
         }
            
        
        
        for(let i = 0; i<this.world.foods.pSys2; i++){
            let check2 = this.world.foods.pSys2;
            if(this.loc.distance(check2[i].loc)<600){
                for(let j = 0; j<check2[i].foodList.length; j++){
                    if(this.loc.distance(check2[i].foodList[j]) <150 && this.loc.distance(check2[i].foodList[j])>20){
                        this.acc = JSVector.subGetNew(check2[i].loc, this.loc);
                        this.acc.normalize.mulitply(0.05);
                        console.log("c");
                    }
                    else if(this.loc.distance(check2[i].foodList[j])<20){
                        this.statusBlock.search = false;
                        this.statusBlock.eating = true;
                        this.food = check2[i].foodList[j];
                        console.log("d");

                    }
                }
            }

        }
    }

    eating(){
        //lets plant know its being eaten
        if(this.food.statBlock.health <1){
            this.statusBlock.eating = false;
            this.statusBlock.search = true;
        }
        this.food.statBlock.life--;
        this.dataBlock.health++;
        this.counter++;
        if(this.counter%30){
            let vel2 = new JSVector(this.vel.x, this.vel.y);
            vel2.setMagnitude(this.segLength);
            let vec = JSVector.subGetNew(this.sengments[this.segments.length-1], vel2);
            this.segments.push(vec);
            this.size++;
            
        }
        
    }
    
}