class Snake {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xdir = 1;
    this.ydir = 0;
    this.speed = 1;
    this.tail = [];
    this.eaten = false;
    this.offset = 0;  // to create an initial starting length for debug purposes
  }

  update() {
    if (this.offset > 0) {
      this.tail.push(createVector(this.x, this.y));
      this.offset--;
    } else if (this.eaten) {
      this.tail.push(createVector(this.x, this.y));
      this.eaten = false;
    } else {
      if (this.tail.length > 0) {
        this.tail.push(createVector(this.x, this.y));
      }
      this.tail.shift();
    }

    this.x += this.xdir * this.speed * gridSize;
    this.y += this.ydir * this.speed * gridSize;

    let death = false;
    // check if collide with wall= height
    if (this.x < 0 || this.x >= width || this.y < 0 || this.y >= height) {
      death = true;
    }
    this.x = constrain(this.x, 0, width - gridSize);
    this.y = constrain(this.y, 0, height - gridSize);

    return !(this.checkCollide(createVector(this.x, this.y)) || death)
  }

  checkCollide(pos) {
    for (let i = 0; i < this.tail.length; i++) {
      let d = dist(pos.x, pos.y, this.tail[i].x, this.tail[i].y);
      if (d < 1) {
        return true;
      }
    }
    return false;
  }

  checkOverlap(pos) {
    if (this.x == pos.x && this.y == pos.y) { return true; }
    return this.checkCollide(pos);
  }

  show() {
    // draw head
    fill("green");
    rect(this.x, this.y, gridSize, gridSize, gridSize / 5);
    fill("white");
    if (this.xdir == 1 && this.ydir == 0) {  // right
      triangle(
        this.x + gridSize, this.y,
        this.x + 2 * gridSize / 3, this.y + gridSize / 2,
        this.x + gridSize, this.y + gridSize
      )
    } else if (this.xdir == -1 && this.ydir == 0) {  // left
      triangle(
        this.x, this.y,
        this.x + gridSize / 3, this.y + gridSize / 2,
        this.x, this.y + gridSize
      )
    } else if (this.xdir == 0 && this.ydir == 1) {  // down
      triangle(
        this.x, this.y + gridSize,
        this.x + gridSize / 2, this.y + 2 * gridSize / 3,
        this.x + gridSize, this.y + gridSize
      )
    } else {  // up
      triangle(
        this.x, this.y,
        this.x + gridSize / 2, this.y + gridSize / 3,
        this.x + gridSize, this.y
      )
    }

    // draw tail
    fill("green");
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, gridSize, gridSize, gridSize / 5);
    }
  }

  setDirection(x, y) {
    if (this.xdir == -x) { return; }
    if (this.ydir == -y) { return; }
    this.xdir = x;
    this.ydir = y;
  }

  eat(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.eaten = true;
      return true;
    } else {
      this.eaten = false;
      if (this.x >= width || this.x < 0 || this.y == height || this.y < 0) {
        return true;
      }
      return false;
    }
  }
}