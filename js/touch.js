function touchChecker(subject, object){
    let subjectTouch = 0;

    for (const Obj of object){
        if (
        subject.left < Obj.right &&
        subject.right > Obj.left &&
        subject.bottom > Obj.top &&
        subject.top < Obj.bottom
        ){
        if (Obj.touching == false){
            Obj.touching = true;
        }

        subjectTouch++;
        }

        else {
        if (Obj.touching){
            Obj.touching = false;
        }
        }
    }

    if (subjectTouch > 0){
        if (subject.touching == false){
        subject.touching = true;
        }
    }

    else {
        if (subject.touching){
        subject.touching = false;
        }
    }
}
  
function changeColor(targetObject, color){
    if (targetObject.element.style.backgroundColor != color){
        targetObject.element.style.backgroundColor = color;
    }
}
  
function jump(location){
    // soundEffect.boom.removeEventListener('ended', jump);
    window.location.href = location + ".html";
}
  
function addJump(targetSound, location, boomSoundPaused, treasureSoundPaused){
    if ( boomSoundPaused && treasureSoundPaused ){
      targetSound.addEventListener('ended', () => jump(location));
      targetSound.play();
    }
 }
  /*
     Add event listener and play sound effect
      only when soundEffect.boom or soundEffect.treasure is not playing...
       = If the player reached the goal, or is caught by enemy
        the first time
     → Earlier thing the user touched (goal, enemy)
        decides game clear or not
  */
  
function gameOver(targetObject, touchingColor, baseColor, targetSound, location, boomSoundPaused, treasureSoundPaused){
    if (targetObject.touching){
      changeColor(targetObject, touchingColor);
      addJump(targetSound, location, boomSoundPaused, treasureSoundPaused);
    }
    else {
      changeColor(targetObject, baseColor);
    }
}
  
function bush(targetObject, touchingColor, baseColor, soundEffect){
    if (targetObject.touching){
      changeColor(targetObject, touchingColor);
      soundEffect.play();
    }
    else {
      changeColor(targetObject, baseColor);
    }
}
  
function crash(targetObject, touchingColor, baseColor){
    if (targetObject.touching){
      changeColor(targetObject, touchingColor);
    }
    else {
      changeColor(targetObject, baseColor);
    }
}


export {
    touchChecker,
    changeColor,
    jump,
    addJump,
    gameOver,
    bush,
    crash
}