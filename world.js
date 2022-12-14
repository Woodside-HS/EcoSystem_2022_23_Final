class World {
  //  Commit 1: 221109
  constructor() {
    this.cnvMain = document.getElementById("cnv1");
    this.ctxMain = this.cnvMain.getContext("2d");
    this.cnvMainLoc = new JSVector(0, 0);
    this.dims = {
      top: -1500,
      left: -2000,
      bottom: 1500,
      right: 2000,
      width: 4000,
      height: 3000,
    };
    this.backgroundMusic = new Audio("resources/sounds/mario.mp3");
    this.showGrid = true;
    this.numRows = 90;
    this.numCols = 120;
    this.rowHeight = this.dims.height / this.numRows;
    this.colWidth = this.dims.width / this.numCols;
    //  calculate the rows and cols of the grid that we want to render
    this.cnvMainRow = (this.cnvMainLoc.y - this.dims.top) / this.rowHeight;
    this.cnvMainCol = (this.cnvMainLoc.x - this.dims.left) / this.colWidth;
    this.rowRange = Math.floor(this.cnvMain.height / this.rowHeight);
    this.colRange = Math.floor(this.cnvMain.width / this.colWidth);

    this.grid = [];
    for (let row = 0; row < this.numRows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.numCols; col++) {
        this.grid[row][col] = new Cell(this, this.ctxMain, row, col);
      }
    }

    this.entities = [];
    this.foodItems = [];

    this.creatures = {
      pred1: [],
      pred2: [],
      pred3: [],
      herb1: [],
      herb2: [],
      herb3: [],
      flocks: [],
    };

    this.foods = {
      food1: [],
      food2: [],
      food3: [],
      food4: [],
      food5: [],
      food6: [],
      pSys1: [],
      pSys2: [],
      pSys3: [],
      pSys4: [],
      pSys5: [],
      pSys6: [],
    };

    // performance -- change the number of entities to see the effect on framerate
    this.numEntities = 50;
    this.loadEntities(
      this.numEntities,
      this.ctxMain,
      this.dims.width,
      this.dims.height
    );
    // performance
    this.framerate = 60;
    this.framecount = 0;
    // every second (250 ms), see how many times that world.run() has
    // executed.
    setInterval(function () {
      world.framerate = world.framecount;
      world.framecount = 0;
    }, 1000);
  }

  run() {
    this.backgroundMusic.play();
    // performance
    this.framecount++;
    // run the world in animation
    this.ctxMain.fillStyle = "rgb(0, 0, 55)"; //  color of outer border on Main canvas
    this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height); //  clear the canvas
    // //+++++++++++++++++++++++++++ Draw all entites
    this.ctxMain.save();
    //  move the main canvas inside of the world
    this.ctxMain.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
    for (let i = 0; i < this.entities.length; i++) {//  All food and creatures
      this.entities[i].run();
      
    }
  
    
    // for (let i = 0; i < this.entities.length; i++) {//  All food and creatures
    //   this.entities[i].run();
    // }
    //  draw all of the cells
    //run all of the entities

    this.runCreatures();
    this.runFood();

    // for (let i = 0; i < this.foods.food2.length; i++) {
    //   this.foods.food2[i].run();
    // }
    
    this.ctxMain.restore();

    // // translate cnvMain according to the location of the canvas in the world
    this.ctxMain.save();

    this.ctxMain.translate(this.cnvMainLoc.x * (-1), this.cnvMainLoc.y * (-1));
    //bounds of the world in cnvMain
    this.ctxMain.strokeStyle = "rgba(0, 140, 240, 1)";
    this.ctxMain.beginPath();
    this.ctxMain.lineWidth = 12;
    this.ctxMain.strokeRect(
      this.dims.left,
      this.dims.top,
      this.dims.width,
      this.dims.height
    );
    this.ctxMain.stroke();

    this.ctxMain.restore();

    // framerate
    this.ctxMain.font = "20px  bold";
    this.ctxMain.fillStyle = "orange";
    let fps = this.framerate + " FPS"; // frames per second
    this.ctxMain.fillText(fps, 20, this.cnvMain.height - 105);
    // this.ctxMain.fillText(
    //   "Rows = " + this.numRows,
    //   20,
    //   this.cnvMain.height - 130
    // );
    // this.ctxMain.fillText(
    //   "Cols = " + this.numCols,
    //   20,
    //   this.cnvMain.height - 155
    // );
    // let numEnts = 0;
    // this.ctxMain.fillText("Ents = " + numEnts, 20, this.cnvMain.height - 85);
    // this.ctxMain.fillText(
    //   "Tucker's Creatures = " + this.creatures.herb2.length,
    //   20,
    //   this.cnvMain.height - 65
    // );

    for (let i = 0; i < this.foods.length; i++) {
      //  All food and creatures
      this.foods[i].run();
    }
  }
  
  loadEntities(numEntities, ctx, w, h) {
    //++++++++++++++++++++++++++++  load entities

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Predetor 1 - 3
    // Malcolm food 1
    for (let i = 0; i < 50; i++) {
      let x =
        Math.random() * (this.dims.width - 20) - (this.dims.width / 2 - 10);
      let y =
        Math.random() * (this.dims.height - 20) - (this.dims.height / 2 - 10);
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      this.foods.food1.push(new MMFood1(loc, vel, 20, this));
    }
    //loads spencers triangle
    // }//++++++++++++++++++++++++++++  load entities

    let c = this.creatures;
    let f = this.foods;

    //SB Alpha Pred
    for (let i = 0; i < 12; i++) {
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2
      let vel = new JSVector(dx, dy);
      c.pred1.push(new SBAlpha(loc, vel, 3, this));
    }
    //Tucker's Predator 2 (Bird) 
    for (let i = 0; i < numEntities / 2; i++) {
      let x = Math.random() * (this.dims.width - 20) - (this.dims.width / 2 - 10);
      let y = Math.random() * (this.dims.height - 20) - (this.dims.height / 2 - 10);
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      c.pred2.push(new tPred2(loc, vel, 3, this));
    }
    //TUCKER PREDATOR 3 (spinny guy)
    for (let i = 0; i < numEntities / 2; i++) { 
      let x = Math.random() * (this.dims.width - 20) - (this.dims.width / 2 - 10);
      let y = Math.random() * (this.dims.height - 20) - (this.dims.height / 2 - 10);
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      c.pred3.push(new tPred3(loc, vel, 3, this));
    }
    
      //  Spencer Predator 3
      for (let i = 0; i < 50; i++) {
        let x = Math.random() * this.dims.width - (this.dims.width / 2);
        let y = Math.random() * this.dims.height - (this.dims.height / 2);
        let loc = new JSVector(x, y);
        let dx = Math.random() * 4 - 2;
        let dy = Math.random() * 4 - 2
        let vel = new JSVector(dx, dy);
        this.creatures.pred3.push(new SBPred3(loc, vel, 30, this))
      }

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Herbavour 1 - 3

    //Adrian Herb 1
    for (let i = 0; i < numEntities; i++) {
      let x =
        Math.random() * (this.dims.width - 20) - (this.dims.width / 2 - 10);
      let y =
        Math.random() * (this.dims.height - 20) - (this.dims.height / 2 - 10);
      let loc = new JSVector(x, y);
      this.creatures.herb1.push(
        new Creature5(loc, new JSVector(0, 0), 6, this)
      ); //  Added to creatures object
    } //adrains creatures
    //tucker's herbavore
    //Malcolm mmHerb1 &&&&&&&&&&&&
    for (let i = 0; i < numEntities; i++) {
      let loc = new JSVector(
        Math.random() * this.dims.width - this.dims.width / 2,
        Math.random() * this.dims.height - this.dims.height / 2
      );
      let vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
      this.creatures.herb1.push(new MMHerb1(loc, vel, 10, this));
    } //&&&&&&&&&&&&&&

    for (let i = 0; i < 150; i++) {
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      c.herb2.push(
        new tuckerHerbavore2(new JSVector(x, y), new JSVector(dx, dy), 5, this)
      );
    } 

    //Spencer Herb3
    for (let i = 0; i < numEntities / 2; i++) {
      c.herb3.push(
        new SBCreature3(
          new JSVector(
            Math.random() * this.dims.width + this.dims.left,
            Math.random() * this.dims.height + this.dims.top
          ),
          new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2),
          30,
          this
        )
      );
    }

    //adrains flocking creatures
    for (let i = 0; i < 500; i++) {
      let x =
        Math.random() * (this.dims.width - 20) - (this.dims.width / 2 - 10);
      let y =
        Math.random() * (this.dims.height - 20) - (this.dims.height / 2 - 10);
      let loc = new JSVector(x, y);
      this.creatures.herb3.push(new AdrianWilsonCreature53(loc, new JSVector(0, 0), 6, this));//  Added to creatures object
    }//adrains flocking creatures

    



    for(let i = 0; i < 100; i++){ //evan hervivore purple circle
      let x = Math.random() * this.dims.width - (this.dims.width / 2);
      let y = Math.random() * this.dims.height - (this.dims.height / 2);
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2
      let vel = new JSVector(dx, dy);
      this.creatures.herb3.push(new EvanHerbivore3(loc, vel, 20, this));
    }

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Food 1 - 6
    //spencer food 2(blue and white lil thing)
    for (let i = 0; i < numEntities; i++) {
      this.foods.food2.push(
        new SBFood2(
          new JSVector(
            Math.random() * this.dims.width + this.dims.left,
            Math.random() * this.dims.height + this.dims.top
          ),
          new JSVector(0, 0),
          8,
          this
        )
      );
    }
    // Tucker Cherry Food Particle System
    for (let i = 0; i < numEntities; i++) {
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      f.pSys2.push(new tFood2(loc, vel, 7, this));
    } 

     // malcolm food 3
     for (let i = 0; i < 20; i++) {
      let loc = new JSVector(
        Math.random() * (this.dims.right - this.dims.left) + this.dims.left,
        Math.random() * (this.dims.bottom - this.dims.top) + this.dims.top
      );
      let dx = Math.random() * 3 - 2;
      let dy = Math.random() * 3 - 2;
      let vel = new JSVector(dx, dy);
      this.foods.food3.push(new MMFood3(loc, vel, 20, this));
    }
    
    //  Evans Food4
    // for (let i = 0; i < 50; i++) {
    //   let x = Math.random() * this.dims.width - this.dims.width / 2;
    //   let y = Math.random() * this.dims.height - this.dims.height / 2;
    //   let loc = new JSVector(x, y);
    //   let dx = Math.random() * 4 - 2;
    //   let dy = Math.random() * 4 - 2;
    //   let vel = new JSVector(dx, dy);
    //   this.foods.food4.push(new Food4Plant(loc, vel, 7, this));
    // }
    

    // for (let i = 0; i < 50; i++) {
    //   let x = Math.random() * this.dims.width - this.dims.width / 2;
    //   let y = Math.random() * this.dims.height - this.dims.height / 2;
    //   let loc = new JSVector(x, y);
    //   let dx = Math.random() * 4 - 2;
    //   let dy = Math.random() * 4 - 2;
    //   let vel = new JSVector(dx, dy);
    //   this.foods.food4.push(new Food4Plant(loc, vel, 7, this));
    // }
    
    //  Adrain Food2Grass
    for (let i = 0; i < 200; i++) {
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      this.foods.food2.push(new Food2Grass(loc, vel, 7, this));
    } 

    //Malcolm food2 blob
    for (let i = 0; i < 50; i++) {
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      f.food2.push(new MMFood2(loc, vel, 10, this));
    }

    for (let i = 0; i < numEntities; i++) {
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      f.food3.push(new Food6(loc, vel, 5, this));
    } //  Tucker heart Food

    //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Particle Systems 1-3
    //michael's particle system 1
    for (let i = 0; i < 25; i++) {
      let loc = new JSVector(
        Math.random() * (this.dims.right - this.dims.left) + this.dims.left,
        Math.random() * (this.dims.bottom - this.dims.top) + this.dims.top
      );
      let vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
      this.foods.pSys1.push(new MParticleSystem1(loc, vel, 10, this));
    } //michael's particle system

    //  Evans Food4 Particle System
    for (let i = 0; i< 50; i++){
      let x = Math.random() * this.dims.width - (this.dims.width / 2);
      let y = Math.random() * this.dims.height - (this.dims.height / 2);
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      this.foods.pSys2.push(new NewFoodPS(loc, vel, 7, this))
    }
    //Malcolms PS1 spinning spike ball
    for(let i = 0; i < 1; i++) {
      let loc = new JSVector(
        Math.random() * (this.dims.right - this.dims.left) + this.dims.left,
        Math.random() * (this.dims.bottom - this.dims.top) + this.dims.top
      );
      let vel = new JSVector(Math.random() * 4 - 2, Math.random() * 4 - 2)
      f.pSys1.push(new MMParticle(loc, vel, 5, this))
    }
    
    //SB PSystem
    for(let i = 0; i<3; i++){
      let x = Math.random() * this.dims.width - this.dims.width / 2;
      let y = Math.random() * this.dims.height - this.dims.height / 2;
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      this.foods.pSys2.push(new SBPSystem(loc, new JSVector(0,0), 8, this, 225));
    }
    //Adrians Particle System
    for (let i = 0; i < 50; i++) {
      let x = Math.random() * this.dims.width - (this.dims.width / 2);
      let y = Math.random() * this.dims.height - (this.dims.height / 2);
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2;
      let vel = new JSVector(dx, dy);
      f.pSys2.push(new FoodParticleSystem2BigBalls(loc, vel, 1, this));
      
    }
  }
  
  
  runCreatures() {
    let c = this.creatures;

    for (let i = c.pred1.length - 1; i >= 0; i--) {
      c.pred1[i].run();
      if (c.pred1[i].dataBlock.isDead) {
        c.pred1.splice(i, 1);
      }
    }

    for (let i = c.pred2.length - 1; i >= 0; i--) {
      c.pred2[i].run();
      if (c.pred2[i].dataBlock.isDead) {
        c.pred2.splice(i, 1);
      }
    }
    for (let i = c.pred3.length - 1; i >= 0; i--) {
      c.pred3[i].run();
      if (c.pred3[i].dataBlock.isDead) {
        c.pred3.splice(i, 1);
      }

    }
    for (let i = c.herb1.length - 1; i >= 0; i--) {
      c.herb1[i].run();
      if (c.herb1[i].dataBlock.isDead) {
        c.herb1.splice(i, 1);
      }
    }

    for (let i = 0; i < c.herb2.length; i++) {
      c.herb2[i].run();
      if (c.herb2[i].dataBlock.isDead) {
        c.herb2.splice(i, 1);
      }
    } //tuckers creature
    for (let i = 0; i < c.herb3.length; i++) {
      c.herb3[i].run(c.herb3);
      if (c.herb3[i].dataBlock.isDead) {
        c.herb3.splice(i, 1);
      }
    }

    for (let i = 0; i < c.flocks.length; i++) { }
  }
  
  

  runFood() {
    for(let i = 0; i<this.foods.pSys2.length; i++){
      this.foods.pSys2[i].run();
    }
    let f = this.foods;

    //! Malcolm food 1 run
    for (let i = f.food1.length - 1; i >= 0; i--) {
      f.food1[i].run();
      if (f.food1[i].isDead) {
        f.food1.splice(i, 1);
      }
    }

    //for (let i = c.food1.length - 1; i >= 0; i--) {

    //}

    for (let i = f.food2.length - 1; i >= 0; i--) {
      f.food2[i].run();
      if (f.food2[i].statBlock.nourishment <= 0 || f.food2[i].statBlock.health <= 0) {
        //cuts the food from the array if it is dead
        f.food2.splice(i, 1);
      }
    }

    for (let i = f.food3.length - 1; i >= 0; i--) {
      f.food3[i].run();
      if (f.food3[i].statBlock.nourishment <= 0) {
        //cuts the food from the array if it is dead
        f.food3.splice(i, 1);
      }
    }
    for (let i = f.food4.length - 1; i >= 0; i--) { }

    for (let i = f.food4.length - 1; i >= 0; i--) {
      f.food4[i].run();
      if (f.food4[i].statBlock.nourishment <= 0) {
        f.food4.splice(i, 1);
      }
    }

    for (let i = f.food5.length - 1; i >= 0; i--) { }

    for (let i = f.food6.length - 1; i >= 0; i--) { }

    for (let i = f.pSys1.length - 1; i >= 0; i--) {
      f.pSys1[i].run();
    }

    for (let i = f.pSys2.length - 1; i >= 0; i--) {
      f.pSys2[i].run();
    }

    for (let i = f.pSys3.length - 1; i >= 0; i--) { }

    for (let i = f.pSys4.length - 1; i >= 0; i--) { }

    for (let i = f.pSys5.length - 1; i >= 0; i--) { }

    for (let i = f.pSys6.length - 1; i >= 0; i--) { }
  }
} //++++++++++++++++++++++++++++++  end world constructor


