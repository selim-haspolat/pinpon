const ball = document.querySelector(".ball");
const player1 = document.querySelector(".player_1");
const player2 = document.querySelector(".player_2");

let xSpeed = 1 + Math.random() * 5;
let ySpeed = 1 + Math.random() * 3;

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
  } else if ((event.key === "w" || event.key === 'W') && player1Start > 0) {
    player1.style.top = player1Center - playerSpeed + "px";
  } else if ((event.key === "s" || event.key === "S") && player1End < WindowHeight) {
    player1.style.top = player1Center + playerSpeed + "px";
  }
};

document.addEventListener("keydown", (event) => {
  movePlayer(event);
});

setTimeout(() => {
  const moveBallInterval = setInterval(() => {
    moveBall(ball);
  }, 10);
}, 3000);

const moveBall = (ball) => {
  const currentPositionOfBall = ball.getBoundingClientRect();

  const x = currentPositionOfBall.x + currentPositionOfBall.width / 2;
  const y = currentPositionOfBall.y + currentPositionOfBall.width / 2;

  calculateBallBounce(x, y);

  const newPositionX = x + xSpeed;
  const newPositionY = y + ySpeed;

  ball.style.top = newPositionY + "px";
  ball.style.left = newPositionX + "px";
};

const calculateBallBounce = (x, y) => {
  const player1Position = player1.getBoundingClientRect();
  const player2Position = player2.getBoundingClientRect();

  const player1X = player1Position.x;
  const player1Y = player1Position.y;
  const player1Width = player1Position.width / 2;

  const player2X = player2Position.x;
  const player2Y = player2Position.y;

  console.log(player1Y);

  if (x >= WindowWidth || x <= 0) {
    xSpeed *= -1;
  } else if (y >= WindowHeight || y <= 0) {
    ySpeed *= -1;
  } else if (x <= player1X + player1Width) {
    if (y >= player1Y && y <= player1Y + player1Position.height) {
      xSpeed *= -1;
    }
  } else if (x >= player2X) {
    if (y >= player2Y && y <= player2Y + player2Position.height) {
      xSpeed *= -1;
    }
  }
};


