const position = {
  configure(targetObject){
    targetObject.x = targetObject.x + targetObject.dx;
    targetObject.y = targetObject.y + targetObject.dy;
    // Reconfigure the x and y value, referring to current position(x,y) and speed
  
    targetObject.element.style.left = targetObject.x + "px";
    targetObject.element.style.top = targetObject.y + "px";
    /*
        Actually moving objects on screen by tweaking css,
        referring to the reconfigured x and y's
    */
  },
  set(targetObject){
    for (const targetObj of targetObject){
      this.configure(targetObj);
    }
  }

  /*
    configure
    Used to actually move the objects, depending on dx,dy values
    Moves objects by changing css "left, top" values
  */

  /*
    set
    Apply configure() to every target
  */
}


export {
  position
}