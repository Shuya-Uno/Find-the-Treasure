
class Map {
  constructor(
    element,
    width,
    height,
    x,
    y,
    dx,
    dy
  ){
    this.element = element;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    }
}

// dx, dy: the final "distance"(absolute value) and direction(positive or negative) the object moves based on each axis


class OnMap extends Map {
  constructor(
    element,
    width,
    height,
    x,
    y,
    speedX,
    speedY,
    dx,
    dy,
    touching
  ){
    super(
      element,
      width,
      height,
      x,
      y,
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
