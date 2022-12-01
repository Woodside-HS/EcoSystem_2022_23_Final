class NewFood {
    constructor(x, y, sz, clr, ctx) {
        this.loc = new JSVector(x, y);
        this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.initSize = sz;
        this.size = sz;
        this.initSize = this.sz;
        this.clr = clr;
        this.life = Math.floor(this.randomNumber(250, 1000));
        this.initlife = this.life;
        this.alive = true;
        this.ctx = ctx;
        this.deathdisplacement = Math.floor(this.randomNumber(25, 500));
        this.deathdisplacementinit = this.deathdisplacement;
        this.deathMultiplier = this.life/this.initlife;
    }

    update() {
        //this.loc.add(this.vel);
        if(this.deathdisplacement >= 0) {
            this.deathdisplacement--;
        } else {
            this.life--;
        }
        
        this.sz = this.sz * ((this.life + this.deathdisplacementinit)/this.initlife);
        if (this.sz > this.initsz) {
            this.sz = this.initSize;
        }
        this.checkLife();
        this.deathMultiplier = this.life/this.initlife;
    }

    checkLife() {
        if (this.life <= 0) {
          this.alive = false;
        }
    }

    run() {
        this.update();
        this.checkLife();
        this.render();
    }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(-Math.PI); 
        ctx.beginPath();
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.moveTo(-this.size*(this.deathMultiplier), 0);
        ctx.lineTo(this.size*(this.deathMultiplier), 0);
        ctx.lineTo(this.size*(this.deathMultiplier), this.size*(this.deathMultiplier));
        ctx.lineTo(this.size/2*(this.deathMultiplier), 0);
        ctx.lineTo(0, this.size*2.5*(this.deathMultiplier));
        ctx.lineTo(-this.size/6*(this.deathMultiplier), 0);
        ctx.lineTo(-this.size*(this.deathMultiplier), this.size*1.6)*(this.deathMultiplier);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    randomNumber(min, max) { 
        let rdm = Math.random() * (max - min) + min;
        return rdm;
    } 
}