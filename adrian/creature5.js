class Creature5 extends Creature {
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
        this.rotation = 0;
        this.maxSpeed = 2;
        this.desiredSep = 25;
        this.maxSpeed = 2;
        this.maxForce = 1;
    }
    //  methods
    run(c) {
        this.interaction(c);
        this.update();
        this.render();
        this.checkEdges();
    }

    interaction(c) {
      let netForce = new JSVector(0,0);
      let coh = this.cohesion(c);
      let sep = this.seperate(c);
      netForce.add(coh);
      netForce.add(sep)
      this.acc.add(netForce);
      if (this.searchForFood) {
        this.searchForFood();
      }
    }

    update() {
        this.rotation++;
        this.vel.add(this.acc);
        this.vel.limit(1);
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
        ctx.beginPath();
        ctx.rotate(Math.PI/360 * this.rotation);
        ctx.strokeStyle = this.clr;
        ctx.fillStyle = this.clr;
        ctx.moveTo(-this.size * this.sizeFactor, 0);
        ctx.lineTo(this.size * this.sizeFactor, 0);
        ctx.lineTo(this.size * this.sizeFactor, 5);
        ctx.lineTo(this.size * this.sizeFactor + 10, 0);
        ctx.lineTo(this.size * this.sizeFactor, -5);
        ctx.lineTo(0, -this.size * this.sizeFactor - 10);
        ctx.lineTo(-this.size * this.sizeFactor, -5);
        ctx.lineTo(-this.size * this.sizeFactor - 10, 0);
        ctx.lineTo(-this.size * this.sizeFactor, 5);
        ctx.lineTo(0, this.size * this.sizeFactor + 10);
        ctx.lineTo(this.size * this.sizeFactor, 5);
        ctx.lineTo(this.size * this.sizeFactor, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    cohesion(c) {
      let neighbordist = 300;
      let sum = new JSVector(0, 0);
      let count = 0;
      let steeringForce = new JSVector(0, 0);
      for (let other = 0; other < c.length; other++) {
        let d = this.loc.distanceSquared(c[other].loc);
        if ((d > 0) && (d < neighbordist)) {
          sum.add(c[other].loc);
          count++;
        }
      }
    
      if (count > 0) {
        sum.divide(count);
        sum.normalize();
        sum.multiply(this.maxSpeed);
        let steer = JSVector.subGetNew(sum, this.vel);
        steeringForce = steer;
      } else {
        steeringForce = new JSVector(0, 0);
      }
    
      return steeringForce;
    }

    seperate(c) {
      // A vector for average of separation forces
      let sum = new JSVector(0, 0);
      let ds = this.desiredSep*this.desiredSep;
      let steer = new JSVector(0, 0); 
      let count = 0;
      for (let other = 0; other < c.length; other++) {
        let d = this.loc.distanceSquared(c[other].loc);
        if(d < ds && d > 0){
          let diff = JSVector.subGetNew( this.loc, c[other].loc);
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

    searchForFood() {
      for (let food = 0; food < world.foods.food2.length; food++) {
        let dist = this.loc.distance(world.foods.food2[food].loc);
        if (dist < 200 && dist >= world.foods.food2[food].size + this.size) {
          this.seek(world.foods.food2[food]);
          this.eating = false;
        }
        else if (dist < world.foods.food2[food].size + this.size) {
          this.eat(world.foods.food2[food]);
          this.eating = true;
        }
      }
    }

    seek(target) {
      let desired = JSVector.subGetNew(target.loc, this.loc);
      desired.normalize();
      desired.multiply(this.maxSpeed);
      let steer = JSVector.subGetNew(desired, this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }

    applyForce(force) {
      this.acc.add(force);
    }

    eat(foodEaten) {
      this.acc.normalize();
      if(this.nourishment > 0) {
        this.nourishment--;
        foodEaten.size = foodEaten.size * (this.nourishment/100);
      }
      else {
      }

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