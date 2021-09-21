
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

export default Map;
