document.addEventListener('DOMContentLoaded', function () {
  fetch('/data/cardContents.json').then(response => response.json()).then(data => {
    let pins = document.querySelectorAll('.leaflet-marker-icon');
    [].forEach.call(pins, (pin) => {
      pin.addEventListener('click', (e) => {
        let idName = e.target.id
        alert(data.idName.title)
      })
    })
  })
})
