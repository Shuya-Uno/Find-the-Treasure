const touch = {
  checkerOnMap(subject, object){
    let subjectTouch = false;
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
  
        subjectTouch = true;
        }
  
        else {
        if (Obj.touching){
          Obj.touching = false;
        }
        }
    }
  
    if (subjectTouch){
        if (subject.touching == false){
          subject.touching = true;
        }
    }
  
    else {
        if (subject.touching){
          subject.touching = false;
        }
    }
  },
  // checkerBorder(subject, object){
  //   const touch = {
  //     left: false,
  //     right: false,
  //     top: false,
  //     bottom: false
  //   };
  //   console.log(touch.left);
  //   if (!subject.left < object.left){
  //     touch.left = true;
  //   }
  //   if(
  //     !subject.right > object.right){
  //       touch.right = true;
  //     }
  //   if(!subject.top > object.right){
  //     touch.top = true;
  //   }
  //   if(!subject.bottom < object.bottom){
  //     touch.bottom = true;
  //   }
  //   return touch;
  // },
  changeColor(targetObject, color){
    if (targetObject.element.style.backgroundColor != color){
      targetObject.element.style.backgroundColor = color;
    }
  },
  jump(location){
    // soundEffect.boom.removeEventListener('ended', jump);
    window.location.href = location + ".html";
  },
  addJump(targetSound, location, boomSoundPaused, treasureSoundPaused){
    if ( boomSoundPaused && treasureSoundPaused ){
      targetSound.addEventListener('ended', () => this.jump(location));
      targetSound.play();
    }
  },
  gameOver(targetObject, touchingColor, baseColor, targetSound, location, boomSoundPaused, treasureSoundPaused){
    if (targetObject.touching){
      this.changeColor(targetObject, touchingColor);
      this.addJump(targetSound, location, boomSoundPaused, treasureSoundPaused);
    }
    else {
      this.changeColor(targetObject, baseColor);
    }
  },
  bush(targetObject, touchingColor, baseColor, soundEffect){
    if (targetObject.touching){
      this.changeColor(targetObject, touchingColor);
      soundEffect.play();
    }
    else {
      this.changeColor(targetObject, baseColor);
    }
  },
  crash(targetObject, touchingColor, baseColor){
    if (targetObject.touching){
      this.changeColor(targetObject, touchingColor);
    }
    else {
      this.changeColor(targetObject, baseColor);
    }
  }   
  /*
    checkerOnMap
      Checks if the hero is touching other onMap objects
      and manages the state of contact by changing the boolean between true and false accordingly

      Purely for triggering events which occurs when hero touched the onMap objects

    addJump
      Add event listener and play sound effect
      only when soundEffect.boom or soundEffect.treasure is not playing...
        = If the player reached the goal, or is caught by enemy
        the first time
      → Earlier thing the user touched (goal, enemy)
        decides game clear or not
  */
}
// console.log(touch.checkerBorder())


export {
  touch
}