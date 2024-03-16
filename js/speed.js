import {
    enemy
} from "gameObject"


function speedInitializer(targetObject){
    for (const targetObj of targetObject){
      if (targetObj == enemy){
        targetObj.dx = targetObj.speedX;
        targetObj.dy = targetObj.speedY;
      }
      else {
        targetObj.dx = 0;
        targetObj.dy = 0;
      }
    }
}
/*
    speedInitializer
    Resets dx and dy of objects each time animate() runs.
    Prevents objects from keeping accelarating (due to retained dx,dy everytime)
    Exclusive for enemy, refers to speedX and speedY (speed and direction) of enemy itself
    (enemy always have its own move, chasing hero)
*/
  
  
function chaser(prey, subject){
    if (subject.centerX > prey.centerX){
        subject.speedX = Math.abs(subject.speedX) * (-1);
    }
    else {
        subject.speedX = Math.abs(subject.speedX);
    }

    if (subject.centerY > prey.centerY){
        subject.speedY = Math.abs(subject.speedY) * (-1);
    }
    else {
        subject.speedY = Math.abs(subject.speedY);
    }
    // console.log(prey, subject)
}
/*
    chaser
    (Re)Configure the direction of enemy's movement to chase hero
     Direction decided by the positional relationship with hero
*/

export {
    speedInitializer,
    chaser
}