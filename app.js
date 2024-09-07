const ball = document.querySelector(".ball");
const player1 = document.querySelector(".player_1");
const player2 = document.querySelector(".player_2");
const player1point = document.querySelector(".player1point");
const player2point = document.querySelector(".player2point");

let moveBallInterval;

let P1Point = 0;
let P2Point = 0;

const startGame = (b) => {
  setTimeout(() => {
    moveBallInterval = setInterval(() => {
      moveBall(b);
    }, 10);
  }, 3000);
};

startGame();

const createRandom = () => {
  const random = Math.random();

  if (random > 0.5) {
    return 1;
  } else {
    return -1;
  }
};

let xSpeed = 2 + Math.random() * 3 * createRandom();
let ySpeed = 2 + Math.random() * 2 * createRandom();

const additionalSpeed = 0.5;

const WindowWidth = window.innerWidth;
const WindowHeight = window.innerHeight;

const movePlayer = (event) => {
  const player1Position = player1.getBoundingClientRect();
  const player1Height = player1Position.height;
  const player1Center = player1Position.y + player1Height / 2;
  const player1Start = player1Position.y;
  const player1End = player1Position.y + player1Height;

  const player2Position = player2.getBoundingClientRect();
  const player2Height = player2Position.height;
  const player2Center = player2Position.y + player2Height / 2;
  const player2Start = player2Position.y;
  const player2End = player2Position.y + player2Height;

  const playerSpeed = 20;

  if (event.key === "ArrowUp" && player2Start > 0) {
    player2.style = "top: " + (player2Center - playerSpeed) + "px";
  } else if (event.key === "ArrowDown" && player2End < WindowHeight) {
    player2.style.top = player2Center + playerSpeed + "px";
  } else if ((event.key === "w" || event.key === "W") && player1Start > 0) {
    player1.style.top = player1Center - playerSpeed + "px";
  } else if (
    (event.key === "s" || event.key === "S") &&
    player1End < WindowHeight
  ) {
    player1.style.top = player1Center + playerSpeed + "px";
  }
};

document.addEventListener("keydown", (event) => {
  movePlayer(event);
});

const moveBall = (b) => {
  const balll = b || ball;
  const currentPositionOfBall = balll.getBoundingClientRect();

  const x = currentPositionOfBall.x + currentPositionOfBall.width / 2;
  const y = currentPositionOfBall.y + currentPositionOfBall.width / 2;

  calculateBallBounce(x, y, balll);

  const newPositionX = x + xSpeed;
  const newPositionY = y + ySpeed;

  balll.style.top = newPositionY + "px";
  balll.style.left = newPositionX + "px";
};

const calculateBallBounce = (x, y, balll) => {
  const player1Position = player1.getBoundingClientRect();
  const player2Position = player2.getBoundingClientRect();

  const player1X = player1Position.x;
  const player1Y = player1Position.y;
  const player1Width = player1Position.width / 2;

  const player2X = player2Position.x;
  const player2Y = player2Position.y;

  if (x <= 0) {
    P2Point += 1;
    restartGame(balll);
  } else if (x >= WindowWidth) {
    P1Point += 1;
    restartGame(balll);
  } else if (y >= WindowHeight || y <= 0) {
    ySpeed *= -1;
  } else if (x <= player1X + player1Width) {
    if (y >= player1Y && y <= player1Y + player1Position.height) {
      xSpeed = xSpeed > 0 ? xSpeed + additionalSpeed : xSpeed - additionalSpeed;
      xSpeed *= -1;
    }
  } else if (x >= player2X) {
    if (y >= player2Y && y <= player2Y + player2Position.height) {
      xSpeed = xSpeed > 0 ? xSpeed + additionalSpeed : xSpeed - additionalSpeed;
      xSpeed *= -1;
    }
  }
};

const createNewBall = () => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("ball");

  document.body.appendChild(newDiv);
  startGame(newDiv);
};

const restartGame = (balll) => {
  console.log(P1Point, P2Point);
  player1point.innerHTML = P1Point;
  player2point.innerHTML = P2Point;
  balll.remove();
  clearInterval(moveBallInterval);
  createNewBall();
  xSpeed = 2 + Math.random() * 3 * createRandom();
  ySpeed = 2 + Math.random() * 2 * createRandom();
};
