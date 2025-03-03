let sections = document.querySelectorAll('section');
let sc2 = document.querySelector('#sc2');
let sc3 = document.querySelector('#sc3');
let currentIndex = 0;
let isScrolling = false;

// 스크롤 함
function scroll(index) {
  if (index >= 0 && index < sections.length) {
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentIndex = index;
    setTimeout(() => { isScrolling = false; }, 700);
  }
}

document.addEventListener('wheel', (event) => {
  if (isScrolling) return;
  if (event.deltaY > 0) {
    scroll(currentIndex + 1);
  } else {
    scroll(currentIndex - 1);
  }
  event.preventDefault();
}, { passive: false });

sc2.addEventListener('click', (event) => {
  currentIndex = 1;
  scroll(currentIndex);
});

sc3.addEventListener('click', (event) => {
  currentIndex = 2;
  scroll(currentIndex);
});

//이미지 및 텍스트 변경 함수
let imgText = {
  train: {
    title: "기차가 이끄는 여행, 떠나볼까요?",
    description: "느긋하게 창밖 풍경을 즐기며 여행하고 싶다면, 일본의 기차여행이 딱 어울릴 거에요. 이제, 당신만의 특별한 기차 여행을 떠나볼까요?",
    url: "https://www.japan.travel/ko/kr/japan-magazine/2101_experience-the-culture-beauty-and-the-flavors-of-northern-japan-on-a-leisurely-rail-journey/"
  },
  past: {
    title: "시간을 거슬러 떠나는 여행",
    description: "바쁜 도시를 벗어나, 조용한 옛 정취 속으로 떠나볼까요? 과거를 여행하는 낭만, 지금 떠나보세요!",
    url: "https://japantravel.navitime.com/ko/area/jp/guide/NTJnews0464-ko/"
  },
  eat: {
    title: "일본에서 만나는 숨은 맛집",
    description: "일본에서 진짜 맛집을 찾고 싶다면, 골목길로 들어가보세요. 골목 어딘가에서 잊지 못할 한 끼가 기다리고 있을지도 몰라요.",
    url: "https://tabelog.com/kr/"
  },
  festival: {
    title: "온몸으로 즐기는 일본의 마츠리",
    description: "일본의 마츠리는 한순간도 지루할 틈이 없어요! 일본에서 가장 신나는 순간을 놓치지 마세요!",
    url: "https://www.tsunagujapan.com/ko/10-popular-japanese-festivals/"
  },
  sake: {
    title: "사케 한 잔에 담긴 일본의 맛",
    description: "사케는 일본이 선물하는 특별한 미각 여행이에요. 정성스레 빚어진 한 자느이 술에서 일본의 자연과 문화를 느껴보세요.",
    url: "https://triple.guide/articles/8c0aae20-b057-49c9-8420-cb8026c4a41a"
  },
  onsen: {
    title: "온천에서 녹아드는 여행의 순간",
    description: "따뜻한 물속에 몸을 담그는 순간, 여행의 피로도 스르르 녹아내려요. 온천이 곧 여행이 되는 곳, 일본에서 잠시 쉬어가세요.",
    url: "https://www.tourtoctoc.com/news/articleView.html?idxno=3126"
  },
  cat: {
    title: "고양이를 사랑한다면, 일본으로",
    description: "고양이를 좋아한다면, 일본은 놓칠 수 없는 여행지에요. 길을 걷다 보면, 어느새 고양이의 매력에 푹 빠져버릴지도 몰라요.",
    url: "https://ikidane-nippon.com/ko/features/a01166"
  },
}

function chosenImage(id) {
  let card_img = document.getElementById('cardImage');

  const data = imgText[id] || { title: "어디로 가볼까요?", content: "왼쪽의 지도의 핀을 클릭해보세요" }

  const titleElement = document.querySelector('.card-title')
  if (titleElement) {
    titleElement.innerHTML = data.title
  }

  const contentElement = document.querySelector('.card-text')
  if (contentElement) {
    contentElement.innerHTML = data.description
  }

  const urlElement = document.querySelector('.cardUrl')
  if (urlElement) {
    urlElement.href = data.url
  }

  img_name = String(id) + '.jpg';
  card_img.src = '/images/section3/card_img/' + img_name;
}
