function position(targetObject){
  targetObject.x = targetObject.x + targetObject.dx;
  targetObject.y = targetObject.y + targetObject.dy;
  // Reconfigure the x and y value, referring to current position(x,y) and speed

  targetObject.element.style.left = targetObject.x + "px";
  targetObject.element.style.top = targetObject.y + "px";
  /*
      Actually moving objects on screen by tweaking css,
      referring to the reconfigured x and y's
  */
}
/*
    position
    Used to actually move the objects, depending on dx,dy values
    Moves objects by changing css "left, top" values
*/


function setPosition(targetObject){
  for (const targetObj of targetObject){
    position(targetObj);
  }
}
/*
    setPosition
    Apply position() to every target
*/

export {
  position,
  setPosition
}