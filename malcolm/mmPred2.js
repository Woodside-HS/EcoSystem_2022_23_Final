class MMPred2 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld) 
        // this.loc = loc
        this.loc = new JSVector(200, 200)
        this.vel = vel
        this.size = sz
        this.world = wrld
        this.ctxMain = wrld.ctxMain
        this.count = 0;
        this.tickRate = Math.random() * (50 - 20) + 20;
        this.angle = 0;
        this.mated = false  
    }

    run() {
        this.update();
        this.render();
        this.eat();
        this.checkEdges()
    }
    update() {
        if (this.dataBlock.health <= 0) {
            this.dataBlock.isDead = true;
          }
          if (this.dataBlock.health > 100) {
            this.dataBlock.health = 100;
          }
          if (this.count++ >= this.tickRate) {
            this.dataBlock.health--;
            this.count = 0;
          }
        this.loc.add(this.vel)
    }
    render() {
    this.angle += 0.5
    this.ctxMain.save();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.dataBlock.health, -10, -20);
    this.ctxMain.moveTo(0, 0)
    this.ctxMain.lineTo(100, 0)
    this.ctxMain.fillStyle = "black";
    this.ctxMain.strokeStyle = "white";
    this.ctxMain.stroke();
    this.ctxMain.fill();
    this.ctxMain.restore();

    }
    eat() {

    }
    checkEdges() {

    }
}