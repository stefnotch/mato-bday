type Color = [number, number, number, number];

const confettiColors: [Color, Color][] = [
  [
    [21, 160, 235, 1],
    [98, 215, 242, 1],
  ],
  [
    [98, 215, 242, 1],
    [80, 239, 63, 1],
  ],
  [
    [235, 21, 152, 1],
    [244, 124, 172, 1],
  ],
  [
    [235, 182, 21, 1],
    [242, 237, 96, 1],
  ],
];

type PixelGrid = number[][];

/**
 * 0 = empty
 * 1 = color 1
 * 2 = color 2
 */
const confettiTypes: PixelGrid[] = [
  [
    [0, 1, 0],
    [1, 2, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 1, 1],
    [0, 1, 2, 1],
    [1, 2, 1, 0],
    [1, 1, 0, 0],
  ],
  [
    [0, 1, 1, 0],
    [1, 2, 2, 1],
    [0, 1, 1, 0],
  ],
];

const confettis: ImageBitmap[] = [];
for (const confettiType of confettiTypes) {
  for (const confettiColor of confettiColors) {
    confettis.push(await toConfettiBitmap(confettiType, confettiColor));
  }
}

export interface ConfettiSpawnOptions {
  x: number;
  y: number;
  velocity: number;
  angle: number;
  spread: number;
  count: number;
}

export class ConfettiDrawer {
  confettis: Confetti[] = [];
  constructor() {}

  addConfetti(ctx: CanvasRenderingContext2D, options: ConfettiSpawnOptions) {
    for (let i = 0; i < options.count; i++) {
      const confettiImage =
        confettis[Math.floor(Math.random() * confettis.length)];
      const confettiVelocity =
        Math.random() * options.velocity + options.velocity / 2;
      const confettiAngle =
        -options.angle + Math.random() * options.spread - options.spread / 2;
      const velocityX = Math.cos(confettiAngle) * confettiVelocity;
      const velocityY = Math.sin(confettiAngle) * confettiVelocity;
      const rotation = Math.random() * Math.PI * 2;
      const rotationVelocity = Math.random() * 0.1 - 0.05;
      const gravity = Math.random() * 0.1 + 0.1;
      const size = 2 + Math.round(Math.random() * 2);
      const confetti = new Confetti({
        confettiImage,
        x: options.x,
        y: options.y,
        velocityX,
        velocityY,
        rotation,
        rotationVelocity,
        gravity,
        size,
      });
      this.confettis.push(confetti);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.confettis.forEach((confetti) => confetti.render(ctx));
    this.confettis = this.confettis.filter((confetti) => confetti.isAlive);
  }
}

async function toConfettiBitmap(pixels: PixelGrid, colors: [Color, Color]) {
  const width = pixels[0].length;
  const height = pixels.length;
  let image = new ImageData(width, height);
  const data = image.data;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = pixels[y][x];
      if (pixel === 0) continue;
      const color = colors[pixel - 1];
      const index = (y * width + x) * 4;
      data[index + 0] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      data[index + 3] = color[3] * 255;
    }
  }
  return await createImageBitmap(image);
}

interface ConfettiOptions {
  size: number;
  confettiImage: ImageBitmap;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationVelocity: number;
  gravity: number;
}

class Confetti {
  isAlive: boolean = true;
  image: ImageBitmap;
  width: number;
  height: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationVelocity: number;
  gravity: number;
  size: number;
  constructor(options: ConfettiOptions) {
    this.image = options.confettiImage;
    this.width = this.image.width;
    this.height = this.image.height;
    this.x = options.x;
    this.y = options.y;
    this.velocityX = options.velocityX;
    this.velocityY = options.velocityY;
    this.rotation = options.rotation;
    this.rotationVelocity = options.rotationVelocity;
    this.gravity = options.gravity;
    this.size = options.size;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityY += this.gravity;
    this.rotation += this.rotationVelocity;
    // Air resistance
    this.velocityX *= 0.99;
    this.velocityY *= 0.99;
    this.rotationVelocity *= 0.99;

    // https://stackoverflow.com/a/38079796/3492994
    ctx.setTransform(this.size, 0, 0, this.size, this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    // Delete confetti if it's out of bounds
    if (this.y > ctx.canvas.height) {
      this.isAlive = false;
    }
  }
}
