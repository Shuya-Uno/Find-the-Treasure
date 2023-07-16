const direction = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  a: false,
  d: false,
  w: false,
  s: false
}

function press(e){
  if (!direction[e.key]){
    // Throwing in pressed key value
    direction[e.key] = true;
  }
}
/*
    Reflects the key pressed to internal manageable data
    (which is saved as object properties)
*/


function release(e){
  if (direction[e.key]){
    direction[e.key] = false;
  }
}
// Resets the internal data of the key pressed when each arrow key is released

  
export {
    direction,
    press,
    release
}