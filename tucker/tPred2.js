class tPred2 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.rot = 0;
    }
    run() {
        this.render();
        this.update();
    }
    update(){
        this.rot++
        if(this.rot>=2){
            this.rot=0;
        }
    }
    render() {
        let ctx = world.ctxMain;
        //translate doesnt work so I us this instead
        let smlSz = this.size / 2;
        let x = this.loc.x;
        let y = this.loc.y;
        ctx.fillStyle = "black";
        ctx.save();
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
        x = this.loc.x;
        y = this.loc.y;
        //left wing
        ctx.translate(x,y);
        x = 0;
        y = 0;
        ctx.rotate(this.rot);
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
        ctx.fill();
        ctx.restore();
    }
}