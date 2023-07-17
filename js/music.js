const button = {
  element: document.getElementById('music-button'),
  setColor(color){
    this.element.style.color = color;
  },
  lineThrough(condition){
    this.element.style.textDecoration = condition;
  },
  on(){
    bgm.volume = 0.5;
    soundEffect.boom.volume = 1;
    soundEffect.bush.volume = 1;
    soundEffect.treasure.volume = 1;
  
    button.element.style.color = "blue";
    button.element.style.textDecoration = "none";
  
    button.element.removeEventListener('click', button.on);
    button.element.addEventListener('click', button.off);
  
    button.element.removeEventListener('mouseover', () => button.setColor('blue'));
    button.element.removeEventListener('mouseout', () => button.setColor('#fff'));
    button.element.addEventListener('mouseover', () => button.setColor('#fff'));
    button.element.addEventListener('mouseout', () => button.setColor('blue'));
  
    button.element.removeEventListener('mouseover', () => button.lineThrough('none'));
    button.element.removeEventListener('mouseout', () => button.lineThrough('line-through'));
    button.element.addEventListener('mouseover', () => button.lineThrough('line-through'));
    button.element.addEventListener('mouseout', () => button.lineThrough('none'));
  },
  off(){
  bgm.volume = 0;
  soundEffect.boom.volume = 0;
  soundEffect.bush.volume = 0;
  soundEffect.treasure.volume = 0;

  button.element.style.color = "#fff";
  button.element.style.textDecoration = "line-through";

  button.element.removeEventListener('click', button.off);
  button.element.addEventListener('click', button.on);

  button.element.removeEventListener('mouseover', () => button.setColor('#fff'));
  button.element.removeEventListener('mouseout', () => button.setColor('blue'));
  button.element.addEventListener('mouseover', () => button.setColor('blue'));
  button.element.addEventListener('mouseout', () => button.setColor('#fff'));

  button.element.removeEventListener('mouseover', () => button.lineThrough('line-through'));
  button.element.removeEventListener('mouseout', () => button.lineThrough('none'));
  button.element.addEventListener('mouseover', () => button.lineThrough('none'));
  button.element.addEventListener('mouseout', () => button.lineThrough('line-through'));
}

}

const bgm = new Audio('music/retro.mp3');
/*
   Creates HTMLAudioElement by new Audio(),
    that is controllable in many aspects with properties
*/

bgm.volume = 0;
bgm.loop = true;

const soundEffect = {
    boom: new Audio('music/boom.mp3'),
    bush: new Audio('music/bush.mp3'),
    treasure: new Audio('music/treasure.mp3')
}

soundEffect.boom.volume = 0;
soundEffect.bush.volume = 0;
soundEffect.treasure.volume = 0;


export {
  button,
  bgm,
  soundEffect
}