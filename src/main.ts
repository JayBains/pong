import "/styles/style.scss";

let game = document.getElementById("gameContainer") as HTMLElement;
let scoreCounter = document.getElementById("score") as HTMLElement;
let highscoreCounter = document.getElementById("highscore") as HTMLElement;
let ball = document.getElementById("ball") as HTMLElement;
let paddle = document.getElementById("paddle") as HTMLElement;

const gameW = game.offsetWidth;
const gameH = game.offsetHeight;
const ballW = ball.offsetWidth;
const ballH = ball.offsetHeight;
const paddleW = paddle.offsetWidth;

let ballX = 100;
let ballY = 100;
let speedX = 5;
let speedY = 5;
const maxSpeed = 10;
let paddleX = 0;
let score = 0;
let highscore = 0;

document.addEventListener("mousemove", (event) => {
  let mouseX = event.clientX - game.offsetLeft;
  if (mouseX > 0 && mouseX < gameW) {
    paddleX = mouseX - paddleW / 2;
    paddle.style.left = paddleX + "px";
  }
});

document.addEventListener("touchmove", (event) => {
  event.preventDefault();
  let mouseX = event.touches[0].clientX - game.offsetLeft;
  if (mouseX > 0 && mouseX < gameW) {
    paddleX = mouseX - paddleW / 2;
    paddle.style.left = paddleX + "px";
  }
});

function ballMovement() {
  ballX += speedX;
  ballY += speedY;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function wallCollision() {
  if (ballX <= 0 || ballX >= gameW - ballW) {
    speedX = -speedX;
  } else if (ballY <= 0) {
    speedY = -speedY;
  }
}

function paddleCollision() {
  if (ballY + ballH >= gameH) {
    if (ballX < paddleX + paddleW && ballX > paddleX) {
      speedY = -speedY;
      paddleHit();
    } else {
      gameOver();
    }
  }
}

function paddleHit() {
  score++;
  scoreCounter.textContent = `Score: ${score}`;
  speedX = Math.min(maxSpeed, speedX * 1.05);
  speedY = Math.min(maxSpeed, speedY * 1.05);
}

function gameOver() {
  if (score > highscore) {
    highscore = score;
    highscoreCounter.textContent = "Highscore: " + highscore;
    console.log(`New high score! You got: ${highscore}!`);
  } else {
    console.log(`Nice try. You scored: ${score}.`);
  }
  score = 0;
  scoreCounter.textContent = `Score: ${score}`;
  ballX = Math.floor(Math.random() * 600);
  ballY = Math.floor(Math.random() * 150);
  speedX = 5;
  speedY = 5;
}

function run() {
  wallCollision();
  paddleCollision();
  ballMovement();
}

setInterval(run, 1);
