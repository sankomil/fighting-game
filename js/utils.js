function collisionDetection({ player, enemy, targetClass }) {
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking &&
    player.currentFrame === 5
  ) {
    player.isAttacking = false;
    console.log("attacked");

    if (enemy.width > 0) {
      enemy.health -= 20;
      document.querySelector(targetClass).style.width = `${enemy.health}%`;
    }
  }

  if (player.isAttacking && player.currentFrame === 5) {
    player.isAttacking = false;
  }
}

function determineWinner({ player1, player2, timerId }) {
  clearTimeout(timerId);

  if (player1.health === player2.health) {
    document.querySelector(".endgame-message").innerHTML = "Tie";
  } else if (player1.health > player2.health) {
    document.querySelector(".endgame-message").innerHTML = "Player 1 wins!";
  } else {
    document.querySelector(".endgame-message").innerHTML = "Player 2 wins!";
  }

  document.querySelector(".endgame-message").style.display = "flex";
}
