//All creatures and food items are added to entities array
class World {
  //  Commit 1: 221109
  constructor() {
    this.cnvMain = document.getElementById('cnv1');
    this.ctxMain = this.cnvMain.getContext('2d');
    this.cnvMainLoc = new JSVector(0, 0);
    this.dims = {
      top: -1500,
      left: -2000,
      bottom: 1500,
      right: 2000,
      width: 4000,
      height: 3000
    }
    this.showGrid = true;
    this.numRows = 90;
    this.numCols = 120;
    this.rowHeight = this.dims.height / this.numRows;
    this.colWidth = this.dims.width / this.numCols;
    //  calculate the rows and cols of the grid that we want to render
    this.cnvMainRow = (this.cnvMainLoc.y - this.dims.top) / this.rowHeight;
    this.cnvMainCol = (this.cnvMainLoc.x - this.dims.left) / this.colWidth;
    this.rowRange = Math.floor(this.cnvMain.height / this.rowHeight);
    this.colRange = Math.floor(this.cnvMain.width / this.colWidth);;

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
      pSys1: [],
      pSys2: [],
      pSys3: []
    };

    //this.entities = [];
    // performance -- change the number of entities to see the effect on framerate
    this.loadEntities(150, this.ctxMain, this.dims.width, this.dims.height);
    // performance
    this.framerate = 60;
    this.framecount = 0;
    // every second (250 ms), see how many times that world.run() has
    // executed.
    setInterval(
      function () {
        world.framerate = world.framecount;
        world.framecount = 0;
      },
      1000
    )
  }

  run() {
    // performance
    this.framecount++;
    // run the world in animation
    this.ctxMain.fillStyle = 'rgb(0, 0, 55)';//  color of outer border on Main canvas
    this.ctxMain.clearRect(0, 0, this.cnvMain.width, this.cnvMain.height);//  clear the canvas
    // //+++++++++++++++++++++++++++ Draw all entites
    this.ctxMain.save();
    //  move the main canvas inside of the world
    this.ctxMain.translate(-this.cnvMainLoc.x, -this.cnvMainLoc.y);
    // for (let i = 0; i < this.entities.length; i++) {//  All food and creatures
    //   this.entities[i].run();
    // }
    //  draw all of the cells
    //run all of the entities

    this.runCreatures();
    this.runFood();

    this.ctxMain.restore();

    // // translate cnvMain according to the location of the canvas in the world
    this.ctxMain.save();
    this.ctxMain.translate(this.cnvMainLoc.x * (-1), this.cnvMainLoc.y * (-1));
    //bounds of the world in cnvMain
    this.ctxMain.strokeStyle = "rgba(0, 140, 240, 1)"
    this.ctxMain.beginPath();
    this.ctxMain.lineWidth = 12;
    this.ctxMain.strokeRect(this.dims.left, this.dims.top, this.dims.width, this.dims.height);
    this.ctxMain.stroke();
    this.ctxMain.restore();

    // // performance  show framerate
    this.ctxMain.font = "20px  bold";
    this.ctxMain.fillStyle = "orange";
    let fps = this.framerate + " FPS";  // frames per second
    this.ctxMain.fillText(fps, 20, this.cnvMain.height - 105);
    this.ctxMain.fillText("Rows = " + this.numRows, 20, this.cnvMain.height - 130);
    this.ctxMain.fillText("Cols = " + this.numCols, 20, this.cnvMain.height - 155);
    let numEnts = this.creatures.pred1.length + this.creatures.pred2.length;
    this.ctxMain.fillText("Ents = " + numEnts, 20, this.cnvMain.height - 85);
  }
  //Load mover array
  loadEntities(numEntities, ctx, w, h) {
    for (let i = 0; i < 500; i++) {
      let x = Math.random() * (this.dims.width - 20) - (this.dims.width / 2 - 10);
      let y = Math.random() * (this.dims.height - 20) - (this.dims.height / 2 - 10);
      let loc = new JSVector(x, y);
      this.creatures.herb1.push(new Creature5(loc, new JSVector(0, 0), 6, this));//  Added to creatures object
    }

    let c = this.creatures;

    for (let i = 0; i < numEntities; i++) {
      let x = Math.random() * this.cnvMain.width;
      let y = Math.random() * this.cnvMain.height
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2
      let vel = new JSVector(dx, dy);
      c.pred1.push(new Creature(loc, vel, 12, this));
    }

    for (let i = 0; i < numEntities; i++) {
      let x = Math.random() * this.cnvMain.width;
      let y = Math.random() * this.cnvMain.height
      let loc = new JSVector(x, y);
      let dx = Math.random() * 4 - 2;
      let dy = Math.random() * 4 - 2
      let vel = new JSVector(dx, dy);
      c.pred2.push(new Creature(loc, vel, 3, this));
    }

    for(let i = 0;i<100;i++){
      let loc = new JSVector(Math.random() * this.cnvMain.width, Math.random() * this.cnvMain.height)
      let vel = new JSVector(Math.random() * .5 - .25,Math.random() * .5 - .25)
      this.foods.food1.push(new MSFood1(loc, vel,10,this))
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
    for (let i = 0; i < c.pred3.length; i++) {

    }
    for (let i = c.herb1.length - 1; i >= 0; i--) {
      c.herb1[i].run();
      if (c.herb1[i].dataBlock.isDead) {
        c.herb1.splice(i, 1);
      }
    }
    
    for (let i = 0; i < c.herb2.length; i++) {

    }
    for (let i = 0; i < c.herb3.length; i++) {

    }
    for (let i = 0; i < c.flocks.length; i++) {

    }
  }

  runFood() {
    for(let i = 0;i<this.foods.food1.length;i++){
      this.foods.food1[i].run();
    }

  }


}//++++++++++++++++++++++++++++++  end world constructor
