//All creatures and food items are added to entities array
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
    // performance
    this.framecount++;
    // run the world in animation
    this.ctxMain.fillStyle = "rgb(0, 0, 55)"; //  color of outer border on Main canvas
    this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height); //  clear the canvas
    // //+++++++++++++++++++++++++++ Draw all entites
    this.ctxMain.save();
    //  move the main canvas inside of the world
    this.ctxMain.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
    //  draw all of the cells
    //run all of the entities

    this.runCreatures();
    this.runFood();

    this.ctxMain.restore();

    // // translate cnvMain according to the location of the canvas in the world
    this.ctxMain.save();
    this.ctxMain.translate(this.cnvMainLoc.x * -1, this.cnvMainLoc.y * -1);
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

    // // performance  show framerate
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

  //Load mover array
  loadEntities(numEntities, ctx, w, h) {
  }

  runCreatures() {
    let c = this.creatures;

    for (let i = c.pred1.length - 1; i >= 0; i--) {//mr ums creature(for now)
      //c.pred1[i].run();
      if (c.pred1[i].dataBlock.isDead) {
        c.pred1.splice(i, 1);
      }
    }

    for (let i = c.pred2.length - 1; i >= 0; i--) {
      //c.pred2[i].run();
      if (c.pred2[i].dataBlock.isDead) {
        c.pred2.splice(i, 1);
      }
    }
    for (let i = c.pred3.length-1; i >= 0 ; i--) {
      c.pred3[i].run();
      if (c.pred3[i].dataBlock.isDead) {
        c.pred3.splice(i, 1);
      }
    }
    for (let i = c.herb1.length - 1; i >= 0; i--) {
      //c.herb1[i].run();
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
      c.herb3[i].run();
    }

    for (let i = 0; i < c.flocks.length; i++) {}
  }

  runFood() {
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
      if (f.food2[i].statBlock.nourishment <= 0) {
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
    for (let i = f.food4.length - 1; i >= 0; i--) {}

    for (let i = f.food5.length - 1; i >= 0; i--) {}

    for (let i = f.food6.length - 1; i >= 0; i--) {}

    for (let i = f.food5.length - 1; i >= 0; i--) {}

    for (let i = f.food6.length - 1; i >= 0; i--) {}

    for (let i = f.pSys1.length - 1; i >= 0; i--) {
      f.pSys1[i].run();
    }

    for (let i = f.pSys2.length - 1; i >= 0; i--) {
      f.pSys2[i].run();
    }

    for (let i = f.pSys3.length - 1; i >= 0; i--) {}

    for (let i = f.pSys4.length - 1; i >= 0; i--) {}

    for (let i = f.pSys5.length - 1; i >= 0; i--) {}

    for (let i = f.pSys6.length - 1; i >= 0; i--) {}
  }
} //++++++++++++++++++++++++++++++  end world constructor
