const spriteDimensions = { height: 150, width: 50 };

const gravity = 0.7;

class Background {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.height = spriteDimensions.height;
    this.width = spriteDimensions.width;
    this.image = new Image();

    this.image.src = imageSrc;
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
  }

  update() {
    this.draw();
  }
}

class Sprite {
  constructor({ position, imageSrc, scale = 1, maxFrames = 1 }) {
    this.position = position;
    this.height = spriteDimensions.height;
    this.width = spriteDimensions.width;
    this.image = new Image();
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    this.totalFramesElapsed = 0;
    this.holdFramesNumber = 10;
    this.baseImageSrc = imageSrc;

    this.image.src = `${imageSrc}_1.png`;
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.image.width * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.totalFramesElapsed++;
    console.log("test", this.image.src);

    if (this.totalFramesElapsed % this.holdFramesNumber) {
      if (this.currentFrame < this.maxFrames - 1) {
        this.currentFrame++;
        this.image.src = `${this.baseImageSrc}_${this.currentFrame}.png`;
      } else {
        this.currentFrame = 0;
        this.image.src = `${this.baseImageSrc}_1.png`;
      }
    }
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    attackBoxOffset,
    imageSrc,
    scale = 1,
    maxFrames = 1,
  }) {
    super({
      imageSrc,
      scale,
      maxFrames,
      position,
    });

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

    this.currentFrame = 0;
    this.totalFramesElapsed = 0;
    this.holdFramesNumber = 100;
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 49) {
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
