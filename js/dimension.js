const dimension = {
  calculate(targetObject){
    targetObject.left = targetObject.x;
    targetObject.top = targetObject.y;
    targetObject.right = targetObject.x + targetObject.width;
    targetObject.bottom = targetObject.y + targetObject.height;
  },
  set(targetObject){
    for (const targetObj of targetObject){
      this.calculate(targetObj);
    }
  }

  /*
    calculate
    Calculates the dimension(left,top,right,bottom) of objects

    left, top, right, bottom: Used to evaluate the "positional relationship and
      contact" (whether they are touching each other or not,
      whether enemy is left or right side of hero... and so) of objects
  */

  /*
    set
    Run calculate() for each objects
    Targets are on-map obects other than hero
      (who can have contact with hero and also move on the screen)
  */
}


export {
  dimension
}