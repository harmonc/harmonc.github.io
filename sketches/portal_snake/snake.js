class Snake {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.dir = 1;
    this.blocks = [];
    for (var i = 20; i >= 0; i--) {
      this.blocks.push([x - 1 * i, y]);
    }
  }

  updateSnake() {
    switch (this.dir) {
      case 0:
        this.moveNorth();
        break;
      case 1:
        this.moveEast();
        break;
      case 2:
        this.moveSouth();
        break;
      case 3:
        this.moveWest();
        break;
    }
  }

  headNorth() {
    this.dir = 0;
  }

  headEast() {
    this.dir = 1;
  }

  headSouth() {
    this.dir = 2;
  }

  headWest() {
    this.dir = 3;
  }

  moveNorth() {
    if (this.y != 0) {
      this.y--;
      this.move();
    }
  }

  moveSouth() {
    if (this.y != this.s - 1) {
      this.y++;
      this.move();
    }
  }

  moveEast() {
    if (this.x != this.s - 1) {
      this.x++;
      this.move();
    }
  }

  moveWest() {
    if (this.x != 0) {
      this.x--;
      this.move();
    }
  }

  move() {
    this.blocks.shift();
    this.blocks.push([this.x, this.y]);
  }
}
