class Food5 extends Entity {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld)
        this.loc = loc;
        this.ctx = wrld.ctxMain;
        this.size = sz * 3/2;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.statBlock = {
        };
        this.speedFactor = 5;
        this.lifeSpan = getRandomInt(500/this.speedFactor, 1000/this.speedFactor);
        this.life = this.lifeSpan;
        this.isDead = false;
        this.sizeFactor = this.life/this.lifeSpan;
        this.growing = false;
        this.livingSpan = getRandomInt(50/this.speedFactor, 1750/this.speedFactor);
        this.living = false;
    }

    run() {
        this.update();
        this.render();
    }

    update() {
        if (this.growing) {
            this.life++;
            this.sizeFactor = this.life/this.lifeSpan;
            if (this.life >= this.lifeSpan) {
                this.growing = false;
                this.living = true;
                this.life = this.livingSpan;
            }
        } else if (this.living) {
            this.life--;
            this.sizeFactor = 1;
            if (this.life <= 0) {
                this.life = this.lifeSpan;
                this.growing = false;
                this.living = false;
            }
        } else {
            this.life--;
            this.sizeFactor = this.life/this.lifeSpan;
            if (this.life <= 0) {
                this.isDead = true;
                this.respawn();
            }
        }
    }

    respawn() {
        let x = Math.random() * (world.dims.width-20) - (world.dims.width / 2 - 10);
        let y = Math.random() * (world.dims.height-20) - (world.dims.height / 2 - 10);
        this.loc = new JSVector(x, y);
        this.lifeSpan = getRandomInt(500/this.speedFactor, 1000/this.speedFactor);
        this.life = 0;
        this.isDead = false;
        this.growing = true;
    }

    render() {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(-Math.PI); //offset 90 degrees
        ctx.beginPath();
        ctx.strokeStyle = "#1dc714";
        ctx.fillStyle = "#1dc714";
        ctx.moveTo(-this.size * this.sizeFactor, 0);
        ctx.lineTo(this.size * this.sizeFactor, 0);
        ctx.lineTo(this.size * this.sizeFactor, this.size * this.sizeFactor);
        ctx.lineTo(this.size/2 * this.sizeFactor, 0);
        ctx.lineTo(0, this.size*2 * this.sizeFactor);
        ctx.lineTo(-this.size/2 * this.sizeFactor, 0);
        ctx.lineTo(-this.size * this.sizeFactor, this.size * this.sizeFactor);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}