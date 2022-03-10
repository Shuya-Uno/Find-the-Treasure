
class Map {
  constructor(
    element,
    x,
    y,
    width,
    height,
    dx,
    dy
  ){
    this.element = element;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    }
}

// dx, dy: the final distance and direction the object moves based on each axis


class OnMap extends Map {
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
    touching
  ){
    super(
      element,
      x,
      y,
      width,
      height,
      dx,
      dy
    );

    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.touching = touching;
  }
}

/*
   left, top, right, bottom: used to evaluate the "positional relationship and
    contact(whether they are touching each other or not)" of objects
   speedX, speedY: affects the speed and direction the special moving objects (such as hero,enemy) moves based on each axis
 */

export {Map, OnMap};
