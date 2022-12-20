class MMPred2 extends Creature {
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld) 
        this.loc = loc
        // this.loc = new JSVector(200, 200)
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
    // this.angle += 0.5
    this.ctxMain.save();
    this.ctxMain.translate(this.loc.x, this.loc.y);
    this.ctxMain.fillText(this.dataBlock.health, -10, -20);
    this.ctxMain.moveTo(0, -10)
    this.ctxMain.lineTo( 10, 0)
    this.ctxMain.lineTo(0, 10)
    this.ctxMain.lineTo(-10, 0)
    this.ctxMain.fillStyle = "black";
    this.ctxMain.strokeStyle = "white";
    this.ctxMain.stroke();
    this.ctxMain.fill();
    this.ctxMain.restore();

    }
    eat() {
        let desiredDist = 50;
        for (let i = 0; i < world.creatures.pred3.length; i++) {
          let pred3 = world.creatures.pred3[i];
          let dist = this.loc.distance(pred3.loc);
          if (dist < desiredDist) {
            let diff = JSVector.subGetNew(pred3.loc, this.loc);
            diff.normalize();
            this.vel.add(diff);
            this.vel.limit(2);
            if (dist > 10) {
              this.vel = new JSVector(0, 0);
              this.dataBlock.health += pred3.dataBlock.health;
              pred3.dataBlock.health = 0;
              this.vel.x = this.vX;
              this.vel.y = this.vY;
            }
          }
        }

        for (let i = 0; i < world.creatures.herb1.length; i++) {
          let herb1 = world.creatures.herb1[i];
          let dist = this.loc.distance(herb1.loc);
          if (dist < desiredDist) {
            let diff = JSVector.subGetNew(herb1.loc, this.loc);
            diff.normalize();
            this.vel.add(diff);
            this.vel.limit(2);
            if (dist > 10) {
              this.vel = new JSVector(0, 0);
              this.dataBlock.health += herb1.dataBlock.health;
              herb1.dataBlock.health = 0;
              this.vel.x = this.vX;
              this.vel.y = this.vY;
            }
          }
        }
        

    }
    checkEdges() {
        let dims = this.world.dims;
        if (this.loc.x > dims.right) this.vel.x = -this.vel.x;
        if (this.loc.x < dims.left) this.vel.x = -this.vel.x;
        if (this.loc.y > dims.bottom) this.vel.y = -this.vel.y;
        if (this.loc.y < dims.top) this.vel.y = -this.vel.y;
    }
}