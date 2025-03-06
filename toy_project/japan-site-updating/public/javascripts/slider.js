const cards = [
  { title: "후쿠오카", image: "/images/section2/webp/fukuoka.webp" },
  { title: "교토", image: "/images/section2/webp/kyoto.webp" },
  { title: "나고야", image: "/images/section2/webp/nagoya.webp" },
  { title: "오키나와", image: "/images/section2/webp/okinawa.webp" },
  { title: "오사카", image: "/images/section2/webp/osaka.webp" },
  { title: "나라", image: "/images/section2/webp/nara.webp" },
  { title: "삿포로", image: "/images/section2/webp/satporo.webp" },
  { title: "도쿄", image: "/images/section2/webp/tokyo.webp" },
  { title: "요코하마", image: "/images/section2/webp/yokohama.webp" },
];

const wrapper = document.querySelector(".swiper-wrapper");

cards.forEach((card) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");

  slide.innerHTML = `
    <div class="card">
      <img class = 'cardImage' src="${card.image}">
      <p class = 'cardText'>${card.title}</p>
    </div>
  `;
  wrapper.appendChild(slide);
});

new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  spaceBetween: 16,
  centeredSlides: true
});

