
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

// dx, dy: The final "distance"(absolute value) and direction(positive or negative) the object moves based on each axis


class OnMapFixed extends Map {
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
   left, top, right, bottom: Used to evaluate the "contact(whether they are touching each other or not)" of objects
   speedX, speedY: Affects the speed and direction the movables (such as hero,enemy... anything that is not fixed on map) moves 
    based on each axis
*/

class OnMapMovables extends OnMapFixed {
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
      speedX,
      speedY,
      dx,
      dy,
      touching
    );

    this.centerX = x + (width / 2)
    this.centerY = y + (height / 2)
  }
}

/* 
   centerX, centerY: Defines the center coordinate of the movables (used for calculating the positional relationship
    between hero and enemy. Higher accuracy than using left, top, ...)
*/

export {Map, OnMapFixed, OnMapMovables};
