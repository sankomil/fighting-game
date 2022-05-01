const spriteDimensions = { height: 150, width: 50 };

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, attackBoxOffset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = spriteDimensions.height;
    this.width = spriteDimensions.width;
    this.lastKey;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      width: 100,
      height: 50,
      offset: attackBoxOffset,
    };
    this.isAttacking = false;
    this.health = 100;
  }

  draw() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.isAttacking) {
      canvasContext.fillStyle = "green";
      canvasContext.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
