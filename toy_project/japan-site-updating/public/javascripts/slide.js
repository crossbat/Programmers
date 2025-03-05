let slides = document.querySelector('#imageSlide')
let slide = document.querySelectorAll('.card')
let currentIdx = 0
let slideCount = slide.length
let slideWidth = slide[0].offsetWidth
console.log(slideWidth)

makeClone()
startAutoSlide()

let interval = startAutoSlide()

slides.addEventListener('mouseenter', () => {
  clearInterval(interval)
})

slides.addEventListener('mouseleave', () => {
  interval = startAutoSlide()
})

function startAutoSlide() {
  return setInterval(() => {
    moveSlide(currentIdx + 1)
  }, 3000)
}

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true)
    cloneSlide.classList.add('clone')
    slides.appendChild(cloneSlide)
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true)
    cloneSlide.classList.add('clone')
    slides.prepend(cloneSlide)
  }
  updateWidth()
  setInitialPos()
  setTimeout(() => {
    slides.classList.add('animated')
  }, 100);
}

function updateWidth() {
  let currentSlide = document.querySelectorAll('.card')
  let newSlideCount = currentSlide.length

  let newWidth = (slideWidth + 48) * newSlideCount + 'px'
  slides.style.width = newWidth
}

function setInitialPos() {
}

function moveSlide(num) {
  slides.style.left = -num * (slideWidth + 48) + 'px'
  currentIdx = num

  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(() => {
      slides.classList.remove('animated');
      slides.style.left = '0px'
      currentIdx = 0
    }, 500)
    setTimeout(() => {
      slides.classList.add('animated')
    }, 600)
  }
}

