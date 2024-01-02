let gameBoard = [[null, null, null],
                 [null, null, null],
                 [null, null, null]];
let boardHighlight = [[false, false, false],
                      [false, false, false],
                      [false, false, false]];
let gridSize = 100;
let margin = 0.1 * gridSize;
let currentPlayer = "cross";
let gameState = 1;


function setup() {
  canvas = createCanvas(3 * gridSize, 3 * gridSize);
  canvas.parent("sketch-holder");

  let startButton = createButton("New Game");
  startButton.parent("sketch-holder");
  startButton.position(3 * gridSize + margin, margin);
  startButton.mousePressed(resetGame);

  let textLabel = createElement("span", "<b>Current Player:</b> " + currentPlayer);
  textLabel.parent("sketch-holder");
  textLabel.id("textLabel");
  textLabel.position(3 * gridSize + margin, margin + 30);
}

function draw() {
  strokeWeight(3);
  background(3 * gridSize);

  for (let i=0; i < 3; i++) {
    for (let j=0; j < 3; j++) {
      let x = i * gridSize;
      let y = j * gridSize;
      if (boardHighlight[i][j]) {
        fill("yellow");
      }
      rect(x, y, gridSize, gridSize);
      fill("white");

      if (gameBoard[i][j] == "cross") {
        leftX = x + margin;
        rightX = x + gridSize - margin;
        topY = y + margin;
        bottomY = y + gridSize - margin;
        stroke("blue");
        line(leftX, topY, rightX, bottomY);
        line(rightX, topY, leftX, bottomY);
      } else if (gameBoard[i][j] == "circle") {
        centerX = x + floor(gridSize / 2);
        centerY = y + floor(gridSize / 2);
        diameter = gridSize - 2 * margin;
        stroke("red");
        noFill();
        ellipse(centerX, centerY, diameter);
        fill("white");
      }
      stroke("black");
    }
  }
}

function resetGame() {
  gameBoard = [[null, null, null],
               [null, null, null],
               [null, null, null]];
  boardHighlight = [[false, false, false],
                    [false, false, false],
                    [false, false, false]];
  gameState = 1;
  currentPlayer = "cross";
  updateText("<b>Current Player:</b> " + currentPlayer);
}

function updateText(value) {
  document.getElementById("textLabel").innerHTML = value;
}

function mouseClicked() {
  let i = floor(mouseX / gridSize);
  let j = floor(mouseY / gridSize);

  if (gameState == 0 || (i > 2 || j > 2)) {
    return;
  }
  if (gameBoard[i][j] != null) {
    return;
  }
  if (currentPlayer == "cross") {
    gameBoard[i][j] = "cross";
    currentPlayer = "circle";
  } else {
    gameBoard[i][j] = "circle";
    currentPlayer = "cross";
  }
  winner = checkWinStatus();
  if (winner == "draw") {
    updateText("Draw!");
  } else if (winner != null) {
    updateText("<b>Winner:</b> " + winner);
  } else {
    updateText("<b>Current Player:</b> " + currentPlayer);
  }
}

function checkWinStatus() {
  full = true;
  for (i=0; i < 3; i++) {
    for (j=0; j < 3; j++) {
      if (gameBoard[i][j] == null) {
        full = false;
      }
    }
  }

  winner = null;
  for (const player of ["cross", "circle"]) {
    for (i=0; i < 3; i++) {
      rowWin = gameBoard[i][0] == player &&
               gameBoard[i][1] == player &&
               gameBoard[i][2] == player;
      columnWin = gameBoard[0][i] == player &&
                  gameBoard[1][i] == player &&
                  gameBoard[2][i] == player;
      if (rowWin || columnWin) {
        winner = player;
        if (rowWin) {
          boardHighlight[i][0] = true;
          boardHighlight[i][1] = true;
          boardHighlight[i][2] = true;
        } else {
          boardHighlight[0][i] = true;
          boardHighlight[1][i] = true;
          boardHighlight[2][i] = true;
        }
        break;
      }
    }

    diagLeftWin = gameBoard[0][0] == player &&
                  gameBoard[1][1] == player &&
                  gameBoard[2][2] == player;
    diagRightWin = gameBoard[0][2] == player &&
                   gameBoard[1][1] == player &&
                   gameBoard[2][0] == player;
    if (diagLeftWin || diagRightWin) {
      winner = player;
      if (diagLeftWin) {
        boardHighlight[0][0] = true;
        boardHighlight[1][1] = true;
        boardHighlight[2][2] = true;
      } else {
        boardHighlight[0][2] = true;
        boardHighlight[1][1] = true;
        boardHighlight[2][0] = true;
      }
    }
  }

  if (winner == null && full) { // draw
    gameState = 0;
    winner = "draw";
  }
  if (winner != null) {
    gameState = 0;
  }
  return winner;
}