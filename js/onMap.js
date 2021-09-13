
class OnMap {
  constructor(
    element,
    x,
    y,
    width,
    height,
    speedX,
    speedY,
    dx,
    dy,
    isColored,
    touching,
  ){
    this.element = element;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.dx = dx;
    this.dy = dy;
    this.isColored = isColored;
    this.touching = touching;
  }
}

/*
   speedX, speedY: the speed and direction the hero and enemy moves based on each axis
   dx, dy: the final distance and direction the object moves based on each axis
*/

export default OnMap;
