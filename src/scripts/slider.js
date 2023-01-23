document.addEventListener('DOMContentLoaded', () =>{
  
  const slider = document.querySelector('.slider__items');
  const leftBtn = document.getElementById('nav-left');
  const rightBtn = document.getElementById('nav-right');
  const dots = document.querySelectorAll('.slider__nav-dot');

  let counter = 0;

  const slideNext = () => {
    if (counter === -2600) return;
    counter = counter-1300;
    slider.style.transform = `translateX(${counter}px)`;
    selectDot();
  }

  const slidePrev = () => {
    if (counter === 0) return;
    counter = counter+1300;
    slider.style.transform = `translateX(${counter}px)`;
    selectDot();
  }

  const selectDot = () => {
    dots.forEach(elem => {elem.style.backgroundColor = '#FFFFFF'})
    dots[counter/-1300].style.backgroundColor = '#303030';
  }

  leftBtn.addEventListener('click', slidePrev);
  rightBtn.addEventListener('click', slideNext);
})