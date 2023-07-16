function dimension(targetObject){
  targetObject.left = targetObject.x;
  targetObject.top = targetObject.y;
  targetObject.right = targetObject.x + targetObject.width;
  targetObject.bottom = targetObject.y + targetObject.height;
}
/*
    dimension
    Calculates the dimension(left,top,right,bottom) of objects

    left, top, right, bottom: Used to evaluate the "positional relationship and
      contact" (whether they are touching each other or not,
      whether enemy is left or right side of hero... and so) of objects
*/


function setDimension(targetObject){
  for (const targetObj of targetObject){
    dimension(targetObj);
  }
}
/*
    setDimension
    Run dimension() for each objects
    Targets are on-map obects other than hero
      (who can have contact with hero and also move on the screen)
*/

export {
  dimension,
  setDimension
}