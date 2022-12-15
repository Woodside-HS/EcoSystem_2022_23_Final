class tPred2 extends Creature {
    constructor(loc,vel,sz,wrld){
        super(loc,vel,sz,wrld);
    }
    run(){
        this.render();
    }
    render(){
        let ctx = world.ctxMain;
        //translate doesnt work so I us this instead
        let smlSz = this.size/2;
        let x = this.loc.x;
        let y = this.loc.y;
        ctx.fillStyle = "black";
        //tail
        ctx.beginPath();
        ctx.moveTo(x,y+this.size*2+smlSz);//tip of dragons tail
        ctx.lineTo(x+smlSz,y+smlSz);
        ctx.lineTo(x-smlSz,y+smlSz);
        ctx.closePath();//endof tail
        ctx.fill();
        //body
        ctx.beginPath();
        ctx.moveTo(x-smlSz,y+smlSz);//bottom left
        ctx.lineTo(x-this.size,y-this.size);//middle left
        ctx.lineTo(x-smlSz,y-(this.size+smlSz));//top left
        ctx.lineTo(x+smlSz,y-(this.size+smlSz));//top right
        ctx.lineTo(x+this.size,y-this.size);//middle right
        ctx.lineTo(x+smlSz,y+smlSz);//bottom right
        ctx.closePath();//endof body
        ctx.fill();
    }
}