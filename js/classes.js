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
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = spriteDimensions.height;
    this.width = spriteDimensions.width;
    this.image = new Image();
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    this.totalFramesElapsed = 0;
    this.holdFramesNumber = 5;
    this.offset = offset;

    this.image.src = imageSrc;
  }

  draw() {
    canvasContext.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.maxFrames),
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.totalFramesElapsed++;

    if (this.totalFramesElapsed % this.holdFramesNumber === 0) {
      if (this.currentFrame < this.maxFrames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.totalFramesElapsed++;

    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    offset = {
      x: 0,
      y: 0,
    },
    sprites,
    attackBox = {
      offset: {},
      width: undefined,
      height: undefined,
    },
  }) {
    super({
      imageSrc,
      scale,
      maxFrames,
      position,
      offset,
    });

    this.velocity = velocity;
    this.height = spriteDimensions.height;
    this.width = spriteDimensions.width;
    this.lastKey;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };
    this.isAttacking = false;
    this.health = 100;

    this.currentFrame = 0;
    this.totalFramesElapsed = 0;
    this.holdFramesNumber = 5;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();

    if (!this.dead) {
      this.animateFrames();
    }

    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;

    // canvasContext.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 49) {
      this.velocity.y = 0;
      this.position.y = 377;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;

    // setTimeout(() => {
    //   this.isAttacking = false;
    // }, 100);
  }

  getHurt() {
    this.health -= 20;

    if (this.health <= 0) {
      this.switchSprite("die");
    } else {
      this.switchSprite("hurt");
    }
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.die.image) {
      if (this.currentFrame === this.sprites.die.maxFrames - 1) {
        this.dead = true;
      }
      return;
    }

    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.maxFrames - 1
    ) {
      return;
    }

    if (
      this.image === this.sprites.hurt.image &&
      this.currentFrame < this.sprites.hurt.maxFrames - 1
    ) {
      return;
    }

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.maxFrames = this.sprites.idle.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.maxFrames = this.sprites.run.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.maxFrames = this.sprites.jump.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.maxFrames = this.sprites.fall.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.maxFrames = this.sprites.attack1.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case "hurt":
        if (this.image !== this.sprites.hurt.image) {
          this.image = this.sprites.hurt.image;
          this.maxFrames = this.sprites.hurt.maxFrames;
          this.currentFrame = 0;
        }
        break;

      case "die":
        if (this.image !== this.sprites.die.image) {
          this.image = this.sprites.die.image;
          this.maxFrames = this.sprites.die.maxFrames;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
