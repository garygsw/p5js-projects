let canvasSize = 300;
let gridSize = 10;
let margin = 50;
let gameState = 1;
let points = 0;

let snake;
let food;

function setup() {
  frameRate(10);
  canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent("sketch-holder");

  let startButton = createButton("New Game");
  startButton.parent("sketch-holder");
  startButton.position(canvasSize + margin, margin);
  startButton.mousePressed(resetGame);

  let pointsLabel = createElement("span", "<b>Points</b>: " + points);
  pointsLabel.parent("sketch-holder");
  pointsLabel.id("pointsLabel");
  pointsLabel.position(canvasSize + margin, margin + 30);

  let textLabel = createElement("span", "");
  textLabel.parent("sketch-holder");
  textLabel.id("textLabel");
  textLabel.position(canvasSize + margin, margin + 50);

  resetGame();
}


function resetGame() {
  gameState = 1;
  points = 0;
  let cols = floor(width / gridSize / 2);
  let rows = floor(height / gridSize / 2);
  snake = new Snake(floor(random(cols)) * gridSize,
                    floor(random(rows)) * gridSize);
  generateNewFood();
  updatePoints();
  updateText("");
}

function updatePoints() {
  document.getElementById("pointsLabel").innerHTML = "<b>Points</b>: " + points;
}

function updateText(value) {
  document.getElementById("textLabel").innerHTML = value;
 }

function draw() {
  background("white");
  strokeWeight(0);

  if (gameState == 1) {

    if (snake.eat(food)) {
      points++;
      updatePoints();
      generateNewFood();
    }

    if (!snake.update()) {
      gameState = 0;
      updateText("Game Over!");
    }
  }

  // render snake
  snake.show();
  // render food
  fill("red");
  circle(food.x + gridSize / 2, food.y + gridSize / 2, gridSize);

  // border
  stroke("black");
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);
}

function generateNewFood() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  food = createVector(floor(random(cols)) * gridSize,
                      floor(random(rows)) * gridSize);
  if (snake.checkOverlap(food)) {
    generateNewFood();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setDirection(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    snake.setDirection(0, 1);
  } else if (keyCode == LEFT_ARROW) {
    snake.setDirection(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    snake.setDirection(1, 0);
  }
}
