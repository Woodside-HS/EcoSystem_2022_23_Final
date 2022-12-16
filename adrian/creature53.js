class AdrianWilsonCreature53 extends Creature {
    // properties
    constructor(loc, vel, sz, wrld) {
        super(loc, vel, sz, wrld);
        this.loc = loc;
        this.acc = new JSVector(0, 0);
        this.vel = new JSVector(Math.random() * 2 - 1, Math.random() * 2 - 1)
        this.ctx = wrld.ctxMain;
        this.clr = this.getRandomColor();
        this.rad = 10;
        this.wWidth = wrld.dims.width;
        this.wHeight = wrld.dims.height;
        this.size = 5;
        this.sizeFactor = 1;
        this.maxSpeed = 3;
        this.maxForce = 1;
        this.desiredSep = 25;
        this.desiredCoh = 15;
        this.clr = "#000000";
    }
    //  methods
    run(v) {
        this.interaction(v);
        this.update();
        this.render();
        this.checkEdges();
    }

    interaction(vehicles) {
        //  flock force is the accumulation of all forces
        let flockForce = new JSVector(0,0);
        // set up force vectors to be added to acc
        let ali = this.align(vehicles);
        let coh = this.cohesion(vehicles);
        let sep = this.separate(vehicles);
        //  add each of these to flockForce
        
        flockForce.add(ali);
        flockForce.add(coh);
        flockForce.add(sep);
        //flockForce.add(seek);
        this.acc.add(flockForce);
    }

    applyForce(force) {
      this.acc.add(force);
    }

    separate(v) {
      // A vector for average of separation forces
      let sum = new JSVector(0, 0);
      let ds = this.desiredSep*this.desiredSep;
      let steer = new JSVector(0, 0); 
      let count = 0;
      for (let other = 0; other < v.length; other++) {
        let d = this.loc.distanceSquared(v[other].loc);
        if(d < ds && d > 0){
          let diff = JSVector.subGetNew( this.loc, v[other].loc);
          diff.normalize();
          sum.add(diff);
          count++;
        }
      }
      
      if(count !== 0){
        sum.divide(count);
        sum.normalize();
        sum.multiply(this.maxSpeed);
        steer = JSVector.subGetNew(sum, this.vel);
        steer.limit(this.maxForce)
      }
      let separationForce = steer;
      return separationForce;
    }

    align(v) {
      let sum = new JSVector();
      let count = 0;
      for (let i = 0; i < v.length; i++) {
        let dS = this.loc.distanceSquared(v[i].loc);
        if (dS>0 && dS < Math.pow(this.desiredCoh,2)) {
          count++;
          sum.add(v[i].vel);
        }
      }
      if (count > 0) {
        sum.divide(count);
      } else {
        sum = new JSVector(0, 0);
      }
      let steeringForce = sum;
      return steeringForce;
    }

    cohesion = function (v) {
      let distSq = this.desiredCoh * this.desiredCoh;
      let count = 0;
      let sum = new JSVector(0, 0);
      let steer = new JSVector(0, 0);
      for (let i = 0; i < v.length; i++) {
        if (this != v[i]) {
          let d = this.loc.distanceSquared(v[i].loc);
          if (d < distSq) {
            let diff = JSVector.subGetNew(v[i].loc, this.loc);
            diff.normalize();
            sum.add(diff);
            count++;
          }
        }
      }
      if (count != 0) {
        sum.divide(count);
        sum.normalize();
        sum.multiply(this.maxSpeed);
        steer = JSVector.subGetNew(sum, this.vel);
        steer.limit(this.maxForce * 10);
      }
      let cohesionForce = steer;
      return cohesionForce;
    }

    update() {
      this.acc.limit(this.maxForce);
      this.vel.add(this.acc);
      this.acc = new JSVector();
      this.vel.limit(this.maxSpeed);
      this.loc.add(this.vel);
    }

    checkEdges() {
        if(this.loc.x<world.dims.left){
          this.vel.x = -this.vel.x;
        }
        if(this.loc.x>world.dims.right){
          this.vel.x = -this.vel.x;
        }
        if(this.loc.y>world.dims.top){
          this.vel.y = -this.vel.y;
        }
        if(this.loc.y<world.dims.bottom){
          this.vel.y = -this.vel.y;
        }
      }

    render() {
      let ctx = this.ctx;
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.rotate(this.vel.getDirection() + Math.PI / 2); //offset 90 degrees
      ctx.beginPath();
      ctx.strokeStyle = this.clr;
      ctx.fillStyle = this.clr;
      ctx.moveTo(0, -this.size);
      ctx.lineTo(-this.size, this.size);
      ctx.lineTo(0, 0);
      ctx.lineTo(this.size, this.size);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    seek(target) {
      // A vector pointing from the location to the target
      let desired = JSVector.subGetNew(target.loc, this.loc);
      desired.normalize();
      desired.multiply(this.maxSpeed);
      let steer = JSVector.subGetNew(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }

    getRandomColor() {
        //  List of hex color values for movers
        let colors = [
            "#25AA34",
            "#18CC2e",
            "#389925",
            "#11AA99",
            "#99CC00",
            "#11FF65"
        ];
        let index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

}

