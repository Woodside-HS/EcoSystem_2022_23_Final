class Food4 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.ctx = wrld.ctxMain;
        this.size = sz;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.clrr = this.getRandomColor();
        this.deathdisplacement = Math.floor(this.randomNumber(25, 500));
        this.deathdisplacementinit = this.deathdisplacement;
        this.life = Math.floor(this.randomNumber(2500, 10000));
        this.initlife = this.life;
        this.deathMultiplier = this.life/this.initlife;
        this.initSize = sz;
        this.size = sz;
        this.initSize = this.sz;
      
        
        this.alive = true;
        this.statBlock = {
        };
    }

    run() {
        this.update();
        this.render();
    }

    

    update(){
        if(this.deathdisplacement >= 0) {
            this.deathdisplacement--;
        } else {
            this.life--;
        }
        
        this.sz = this.sz * ((this.life + this.deathdisplacementinit)/this.initlife);
        if (this.sz > this.initsz) {
            this.sz = this.initSize;
        }


        // for (let i = 0; i<foodItems.length; i++) {
        //     //this.foodItems[i].run();
        //     if(!this.foodItems[i].alive) {
        //       this.foodItems.splice(i, 1);
        //       this.foodItems[i].push(new Food4(loc,new JSVector(0, 0), 6,this));
        //     }
        // }
        this.checkLife();
        this.deathMultiplier = this.life/this.initlife;
    }

    checkLife() {
        if (this.life <= 0) {
          this.alive = false;
        }
    }
    
    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(-Math.PI); 
        ctx.beginPath();
        ctx.strokeStyle = this.clrr;
        ctx.fillStyle = this.clrr;
        ctx.moveTo(-this.size*(this.deathMultiplier), 0);
        ctx.lineTo(this.size*(this.deathMultiplier), 0);
        ctx.lineTo(this.size*(this.deathMultiplier), this.size*(this.deathMultiplier));
        ctx.lineTo(this.size*(3/4)*(this.deathMultiplier), 0);
        ctx.lineTo(this.size*(3/4)*(this.deathMultiplier), this.size*(this.deathMultiplier));
        //ctx.lineTo(this.size/2, 0);
        //ctx.lineTo(this.size/2, this.size);
        ctx.lineTo(this.size/4*(this.deathMultiplier), 0);
        ctx.lineTo(this.size/4*(this.deathMultiplier), this.size);
        //ctx.lineTo(this.size, 0);
        //ctx.lineTo(this.size, this.size);
        ctx.lineTo(-this.size/4*(this.deathMultiplier), 0);
        ctx.lineTo(-this.size/4*(this.deathMultiplier), this.size*(this.deathMultiplier));
        //ctx.lineTo(-this.size/2, 0);
        //ctx.lineTo(-this.size/2, this.size);
        ctx.lineTo(-this.size*(3/4)*(this.deathMultiplier), 0);
        ctx.lineTo(-this.size*(3/4)*(this.deathMultiplier), this.size*(this.deathMultiplier));
        ctx.lineTo(-this.size*(this.deathMultiplier), 0);


        
        
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    getRandomColor() {
        
        let colors = [
            "#1dc714",
            "#26bd9c",
            "#1b8220"
            
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

    randomNumber(min, max) { 
        let rdm = Math.random() * (max - min) + min;
        return rdm;
    } 

}