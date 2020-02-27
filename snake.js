class Snake {

  constructor(x, y, randomness) {
    this.xPos = x;
    this.yPos = y;
    this.randomness = randomness;
    this.dir = int(random(4));
  }

  inBoundaries(grid, x, y) {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
  }

  isSnake(grid, x, y) {
    var result = false;
    if (this.inBoundaries(grid, x, y)) {
      result = grid[y][x];
    }
    return result;
  }

  move() {

    if (this.inBoundaries(grid, this.xPos, this.yPos)) {
      grid[this.yPos][this.xPos] = true;
    }

    var moved = false;
    var count = 0;
    while (!moved && count < 4) {
      if (random(1) > randomness) {
        this.dir = int(random(4));
      }
      switch (this.dir) {
        case 0:
          if (this.inBoundaries(grid, this.xPos + 1, this.yPos) && !this.isSnake(grid, this.xPos + 2, this.yPos) && !this.isSnake(grid, this.xPos + 1, this.yPos + 1) && !this.isSnake(grid, this.xPos + 1, this.yPos - 1)) {
            this.xPos += 1;
            moved = true;
          }
          break;
        case 1:
          if (this.inBoundaries(grid, this.xPos, this.yPos - 1) && !this.isSnake(grid, this.xPos, this.yPos - 2) && !this.isSnake(grid, this.xPos + 1, this.yPos - 1) && !this.isSnake(grid, this.xPos - 1, this.yPos - 1)) {
            this.yPos -= 1;
            moved = true;
          }
          break;
        case 2:
          if (this.inBoundaries(grid, this.xPos - 1, this.yPos) && !this.isSnake(grid, this.xPos - 2, this.yPos) && !this.isSnake(grid, this.xPos - 1, this.yPos + 1) && !this.isSnake(grid, this.xPos - 1, this.yPos - 1)) {
            this.xPos -= 1;
            moved = true;
          }
          break;
        case 3:
          if (this.inBoundaries(grid, this.xPos, this.yPos + 1) && !this.isSnake(grid, this.xPos, this.yPos + 2) && !this.isSnake(grid, this.xPos + 1, this.yPos + 1) && !this.isSnake(grid, this.xPos - 1, this.yPos + 1)) {
            this.yPos += 1;
            moved = true;
          }
          break;
      }

      if (!moved) {
        this.dir = (this.dir + 1) % 4;
      }

      count++;
    }
    if (moved) {
      fill(0, 0, 50);
      noStroke();
      rect(snake.xPos * size, snake.yPos * size, size, size);
    }
    if (this.inBoundaries(grid, this.xPos, this.yPos)) {
      grid[this.yPos][this.xPos] = true;
    }
    return moved;
  }
}
