const canvas = document.querySelector("canvas");

const canvasContext = canvas.getContext("2d");

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

canvas.width = 1024;
canvas.height = 576;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const background = new Background({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/background/forest.png",
});

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  attackBoxOffset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/warrior/idle/Warrior_Idle",
  scale: 2,
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  attackBoxOffset: {
    x: 50,
    y: 0,
  },
  imageSrc: "./assets/death/idle/Bringer-of-Death_Idle",
  scale: 2,
  maxFrames: 8,
});

let timer = 10;

let decTimerId;

function decreaseTimer() {
  if (timer > 0) {
    decTimerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector(".timer").innerHTML = timer;
  } else if (timer === 0) {
    determineWinner({ player1: player, player2: enemy, timerId: decTimerId });
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  //player 1 movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  //player 2 movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  collisionDetection({ player, enemy, targetClass: "#player2-hp" });

  collisionDetection({
    player: enemy,
    enemy: player,
    targetClass: "#player1-hp",
  });

  if (player.health === 0 || enemy.health === 0) {
    determineWinner({ player1: player, player2: enemy, timerId: decTimerId });
  }
}

animate();

decreaseTimer();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Player 1 actions
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;

    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;

    case "w":
      player.velocity.y = -20;
      break;

    case " ":
      player.attack();
      break;

    //Player 2 actions
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;

    case "ArrowUp":
      enemy.velocity.y = -20;
      break;

    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // Player 1 actions
    case "d":
      keys.d.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;

    case "w":
      keys.w.pressed = false;
      break;

    //Player 2 actions
    case "ArrowRight":
      keys.ArrowRight.pressed = false;

      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;

      break;

    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});
