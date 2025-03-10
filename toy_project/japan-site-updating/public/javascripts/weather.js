document.addEventListener('DOMContentLoaded', function () {
  fetch('/data/weather.json').then(response => response.json()).then(data => {
    document.querySelectorAll('.icon').forEach(img => {
      const weather_code = img.alt;
      const icon_src = data[weather_code] || "/images/weather/default.png";
      img.src = `/images/weather/${icon_src}`;
    });
  }).catch(error => console.error("Error loading weather icons:", error));
})
