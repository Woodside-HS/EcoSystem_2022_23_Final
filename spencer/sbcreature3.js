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
        this.counter2 = 0;
        this.food;
        this.dataBlock.health = 100-Math.random()*30;
    }

    loadSegments() { //loads segments at the start and when reviving
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
            this.eating();
        }
        else{
            this.search();
            this.update();
            this.bounce();
        }
        this.render();
    
    }
    
    
    update() { //updates snake and all segments
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.loc.add(this.vel);
        this.counter2++;
        if(this.dataBlock.health<2){
            this.revive();
        }
        if(this.counter2%100 == 0){
            this.dataBlock.health--;
            }
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
        if(this.dataBlock.health <2){
            this.statusBlock.deathProc = true;
        }
    }
    
    
    render() { //renders head, body and antennas
        if(this.dataBlock.health  == 10){ //color near death
            this.clr = "red";
         }
        else if(this.dataBlock.health >10){ //color when alive
        this.clr = "lime";
        }
        this.ctx.save();
        this.ctx.translate(this.loc.x, this.loc.y);
        this.ctx.rotate(this.vel.getDirection());
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(25, 8);
        this.ctx.strokeStyle = this.clr;
        this.ctx.stroke();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(25, -8);
        this.ctx.strokeStyle = this.clr;
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
    
    bounce(){ //avoids walls, doesn't get stuck in corners
        if((this.loc.y < world.dims.top  + 30 || this.loc.y > world.dims.bottom - 30) && (this.loc.x < this.world.dims.left  + 30 || this.loc.x > this.world.dims.right - 30)){
            this.acc = new JSVector.subGetNew(new JSVector(Math.random()*200-100, Math.random()*200-100), this.loc);
            this.acc.normalize;
        }
        else if(this.loc.y < world.dims.top  + 30 || this.loc.y > world.dims.bottom - 30){
        this.vel.y = -this.vel.y;
      }
      else if(this.loc.x < this.world.dims.left  + 30 || this.loc.x > this.world.dims.right - 30){
        this.vel.x = -this.vel.x;
      }
      if(this.loc.y < world.dims.top +10  || this.loc.y > world.dims.bottom -10 ){
        this.acc = JSVector.subGetNew(new JSVector(Math.random()*400-200, Math.random()*400-200), this.loc);
        this.acc.normalize();
        this.acc.multiply(0.5);
      }
      else if(this.loc.x < this.world.dims.left +10 || this.loc.x > this.world.dims.right -10){
        this.acc = JSVector.subGetNew(new JSVector(Math.random()*400-200, Math.random()*400-200), this.loc);
        this.acc.normalize();
        this.acc.multiply(0.5);
      }

    }

    search(){ //finds food
        let check = this.world.foods.food2;
        for(let i = 0; i<check.length; i++){
            if(this.loc.distance(check[i].loc)<200 && this.loc.distance(check[i].loc)>16 && !check[i].isDead){
                this.acc = JSVector.subGetNew(check[i].loc, this.loc);
                this.acc.normalize();
                this.acc.multiply(0.05);
            }
            else if(this.loc.distance(check[i].loc)<16){
                this.statusBlock.search = false;
                this.statusBlock.eating = true;
                this.food = check[i]; 
            }
         }
            
        
        
        for(let i = 0; i<this.world.foods.pSys2.length; i++){
            let check2 = this.world.foods.pSys2;
            if(this.loc.distance(check2[i].loc)<600){
                for(let j = 0; j<check2[i].foodList.length; j++){
                    if(this.loc.distance(check2[i].foodList[j]) <150 && this.loc.distance(check2[i].foodList[j])>20){
                        this.acc = JSVector.subGetNew(check2[i].loc, this.loc);
                        this.acc.normalize();
                        this.acc.multiply(0.05);
                    }
                    else if(this.loc.distance(check2[i].foodList[j])<30){
                        this.statusBlock.search = false;
                        this.statusBlock.eating = true;
                        this.food = check2[i].foodList[j];

                    }
                }
            }

        }
    }

    eating(){ //if isEating is on, it stands still and eats
        //lets plant know its being eaten
        if(this.food.statBlock.health <2 || this.food.statBlock.nourishment <2 || this.food.loc.distance(this.loc)>20){
            this.statusBlock.eating = false;
            this.statusBlock.search = true;
        }
        this.food.statBlock.health--;
        if(this.counter%50){
            this.dataBlock.health++;
        }
        this.food.statBlock.nourishment--;
        this.counter++;
        if(this.counter%500 == 0 && this.statusBlock.eating && this.food.loc.distance(this.loc)<10){ //adds another segment if it eats enough
            let vel2 = new JSVector(this.vel.x, this.vel.y);
            vel2.setMagnitude(this.segLength);
            let vec = JSVector.subGetNew(this.segments[this.segments.length-1], vel2);
            this.segments.push(vec);
            this.size++;
            
        }
    }

    revive(){ //spawns the creature as a new creature after death
        let x = Math.random()*(world.dims.width-400)+world.dims.left+50;
        let y = Math.random()*(world.dims.height-400)+world.dims.top+50;
        this.loc = new JSVector(x, y);
        this.vel = new JSVector(Math.random()*4-2, Math.random()*4-2);
        this.segments = [];
        this.segLength = 10;
        this.loadSegments();
        this.acc = new JSVector(0,0);
        this.counter = 0;
        this.counter2 = 0;
        this.dataBlock.health = 100;
        this.dataBlock.isDead = false;
        this.dataBlock.nourishment = 100;
        this.dataBlock.lifeSpan = Math.random()*3000;//  miliseconds
        this.dataBlock.age = 0;
        this.clr = "lime";
    }
    
}