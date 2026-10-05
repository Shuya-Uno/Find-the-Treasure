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

        /*
          If the hero is touching other onMap objects,
           set the touch status of onMap objects to true
          Also set subjectTouch to true... used to change
           the touch status of hero in the next if circuit
        */
  
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
  checkerBoundary(hero, boundary){
    const touch = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };
    // Creating touch object to pass to move.mover method

    if (hero.left <= boundary.left){
      touch.left = true;
    }
    if(hero.right >= boundary.right){
        touch.right = true;
      }
    if(hero.top <= boundary.top){
      touch.top = true;
    }
    if(hero.bottom >= boundary.bottom){
      touch.bottom = true;
    }
    /* If the hero's left, right, top or bottom is touching the boundary,
        change the touch (direction) status to true
    */

    return touch;
    // Returns touch object
  },
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
    if (boomSoundPaused && treasureSoundPaused){
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

      The key method for triggering events which occurs when hero touched the onMap objects

    changeColor
      Changes the color of the target object to the color given as the argument

    jump
      Jumps the user to another page when the game is over
      Location is determined depending on the argument


    addJump
      Add event listener that runs the jump function when the sound effect has ended,
       and play sound effect

      It runs only when soundEffect.boom or soundEffect.treasure is not playing...
        = If the player reached the goal, or is caught by enemy
           the first time
      → The first object the user touches that leads to game over (goal, enemy)
         will decide if the game is cleared or not (failed)

    crash
      Runs changeColor method for hero when hero touched another onMap object
  */
}


export {
  touch
}