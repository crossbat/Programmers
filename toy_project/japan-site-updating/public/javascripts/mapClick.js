const clickEvent = () => {
  const imagePath = '/images/section3/map/cardImage'
  fetch('/data/cardContents.json').then(response => response.json()).then(data => {
    let pins = document.querySelectorAll('.leaflet-marker-icon');
    [].forEach.call(pins, (pin) => {
      pin.addEventListener('click', (e) => {
        let idName = e.target.id
        document.getElementsByClassName('descriptionImage')[0].src = imagePath + `/${idName}`
        document.getElementsByClassName('descriptionTitle')[0].innerText = data[idName].title
        document.getElementsByClassName('descriptionContent')[0].innerText = data[idName].content
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', function () {
  clickEvent()
})

const filters = document.querySelectorAll('.leaflet-control-layers-selector');
[].forEach.call(filters, (filter) => {
  filter.addEventListener('click', (e) => {
    clickEvent()
  })
})

//document.addEventListener('DOMContentLoaded', function () {
//  fetch('/data/cardContents.json').then(response => response.json()).then(data => {
//    let pins = document.querySelectorAll('.leaflet-marker-icon');
//    [].forEach.call(pins, (pin) => {
//      pin.addEventListener('click', (e) => {
//        let idName = e.target.id
//        document.getElementsByClassName('descriptionTitle')[0].innerText = data[idName].title
//        document.getElementsByClassName('descriptionContent')[0].innerText = data[idName].content
//      })
//    })
//  })
//})
