let sections = document.querySelectorAll('section');
let sc2 = document.querySelector('#sc2');
let sc3 = document.querySelector('#sc3');
let currentIndex = 0;
let isScrolling = false;

function scroll(index){
  if (index >= 0 && index < sections.length){
    isScrolling = true;
    sections[index].scrollIntoView({behavior : 'smooth'});
    currentIndex = index;
    setTimeout(() => {isScrolling = false;}, 700);
  }
}

document.addEventListener('wheel', (event) => {
  if (isScrolling) return ;
  if (event.deltaY > 0){
    scroll(currentIndex + 1);
  }else{
    scroll(currentIndex - 1);
  }
  event.preventDefault();
}, {passive : false});

sc2.addEventListener('click', (event) => {
  currentIndex = 1;
  scroll(currentIndex);
});

sc3.addEventListener('click', (event) => {
  currentIndex = 2;
  scroll(currentIndex);
});
