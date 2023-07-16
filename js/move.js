const move = {
    left(targetObject, hero){
        for (const targetObj of targetObject){
            targetObj.dx += hero.speedX;
        }    
    },
    right(targetObject, hero){
        for (const targetObj of targetObject){
            targetObj.dx -= hero.speedX;
        }
    },
    up(targetObject, hero){
        for (const targetObj of targetObject){
            targetObj.dy += hero.speedY;
        }    
    },
    down(targetObject, hero){
        for (const targetObj of targetObject){
            targetObj.dy -= hero.speedY;
        }
    },
    mover(targetObject, key, hero){
        if (key.ArrowLeft || key.a){
          move.left(targetObject, hero);
        }
      
        if (key.ArrowRight || key.d){
          move.right(targetObject, hero);
        }
      
        if (key.ArrowUp || key.w){
          move.up(targetObject, hero);
        }
      
        if (key.ArrowDown || key.s){
          move.down(targetObject, hero);
        }
    }
    /*
        Reflects the movement of hero by moving all the objects other than hero to
        the opposite direction from the key pressed
    */

    // methods defined by method notation (ES6)

}


export {
    move
}