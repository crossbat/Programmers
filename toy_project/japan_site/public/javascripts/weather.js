let weather_codes = document.querySelectorAll(".weather_icon");

weather_codes.forEach((weather) => {
  code = weather.attr("alt");
  console.log(code);
});
