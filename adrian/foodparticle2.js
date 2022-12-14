class Food5Particle {
    constructor(x, y, rad, clr, ctx) {
        this.loc = new JSVector(x, y);
        this.vel = new JSVector(Math.random() * 1 - 1/2, Math.random() * 1 - 1/2);
        this.rad = this.randomNumber(6, 10);
        this.initrad = this.rad;
        this.clr = clr;
        this.life = Math.floor(this.randomNumber(250, 1000));
        this.initlife = this.life;
        this.alive = true;
        this.ctx = ctx;
        this.deathdisplacement = Math.floor(this.randomNumber(25, 500));
        this.deathdisplacementinit = this.deathdisplacement;
    }

    update() {
        this.loc.add(this.vel);
        if(this.deathdisplacement >= 0) {
            this.deathdisplacement--;
        } else {
            this.life--;
        }
        
        this.rad = this.rad * ((this.life + this.deathdisplacementinit)/this.initlife);
        if (this.rad > this.initrad) {
            this.rad = this.initrad;
        }
        this.checkLife();
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
        ctx.beginPath();
        ctx.rotate(Math.PI);
        ctx.arc(this.loc.x,this.loc.y,this.rad,0,-Math.PI);//bottom of the chrry
        ctx.arc(this.loc.x+this.rad/2,this.loc.y,this.rad/2,Math.PI,Math.PI*2);//top right of the cherry
        ctx.arc(this.loc.x-this.rad/2,this.loc.y,this.rad/2,Math.PI,Math.PI*2)//top left of the cherry
        ctx.closePath();
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.fill();
        ctx.stroke();
    }

    randomNumber(min, max) { 
        let rdm = Math.random() * (max - min) + min;
        return rdm;
    } 

    randomNumber(min, max) { 
        let rdm = Math.random() * (max - min) + min;
        return rdm;
    } 
}