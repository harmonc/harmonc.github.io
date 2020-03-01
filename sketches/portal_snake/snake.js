class Snake{
    constructor(x,y){
      this.x = x;
      this.y = y;
      this.blocks = [];
      for(var i = 20; i >= 0; i--){
        this.blocks.push([x-1*i,y]);
      }
    }

    moveNorth(){
      this.y--;
      this.move();
    }

    moveSouth(){
      this.y++;
      this.move();
    }

    moveEast(){
      this.x++;
      this.move();
    }

    moveWest(){
      this.x--;
      this.move();
    }

    move(){
      this.blocks.shift();
      this.blocks.push([this.x,this.y]);
    }
}
