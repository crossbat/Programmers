//Create Marker
const createMarker = (lat, lng, iconURL, id, popupText) => {
  const marker = L.marker([lat, lng], { icon: iconURL }).bindPopup(popupText)
  marker.on('add', () => {
    const markerElements = document.querySelectorAll('.leaflet-marker-icon')
    markerElements.forEach(el => {
      if (!el.id) {
        el.id = id
      }
    })
  })
  return marker
}

//marker image
let animationMarker = L.icon({
  iconUrl: '/images/section3/map/marker/animation-marker.png',
  iconSize: [55, 55], // size of the icon
  iconAnchor: [25, 55], // point of the icon which will correspond to marker's location
  popupAnchor: [3, -60]
})

let foodMarker = L.icon({
  iconUrl: '/images/section3/map/marker/food-marker.png',
  iconSize: [55, 55], // size of the icon
  iconAnchor: [25, 55], // point of the icon which will correspond to marker's location
  popupAnchor: [3, -60]
})

let onsenMarker = L.icon({
  iconUrl: '/images/section3/map/marker/onsen-marker.png',
  iconSize: [55, 55], // size of the icon
  iconAnchor: [25, 55], // point of the icon which will correspond to marker's location
  popupAnchor: [3, -60]
})

let artMarker = L.icon({
  iconUrl: '/images/section3/map/marker/art-marker.png',
  iconSize: [55, 55], // size of the icon
  iconAnchor: [25, 55], // point of the icon which will correspond to marker's location
  popupAnchor: [3, -60]
})

let natureMarker = L.icon({
  iconUrl: '/images/section3/map/marker/nature-marker.png',
  iconSize: [55, 55], // size of the icon
  iconAnchor: [25, 55], // point of the icon which will correspond to marker's location
  popupAnchor: [3, -60]
})

//marker
// 🗡️ 애니메이션 & 레트로 감성 여행
const animations = [
  createMarker(32.88, 131.10, animationMarker, 'mt_aso', '<b>👾 레트로 감성 여행</b><br>여기는 아소산이에요'),
  createMarker(33.94, 130.96, animationMarker, 'mojiko_retro', '<b>👾 레트로 감성 여행</b><br>여기는 모지코 레트로에요'),
  createMarker(34.65, 135.51, animationMarker, 'shinsekai', '<b>👾 레트로 감성 여행</b><br>여기는 신세카이에요')
]
//let mt_aso = L.marker([32.88, 131.10], { icon: animationMarker }).bindPopup('<b>👾 레트로 감성 여행</b><br>여기는 아소산이에요')
//let mojiko_retro = L.marker([33.94, 130.96], { icon: animationMarker }).bindPopup('<b>👾 레트로 감성 여행</b><br>여기는 모지코 레트로에요')
//let shinsekai = L.marker([34.65, 135.51], { icon: animationMarker }).bindPopup('<b>👾 레트로 감성 여행</b><br>여기는 신세카이에요')

let anime_retro_trip = L.layerGroup(animations);

// 🍣 미식 여행
const foods = [
  createMarker(43.06, 141.35, foodMarker, 'sapporo_ramen_alley', '<b>🍣 미식 여행</b><br>여기는 삿포로 라멘골목이에요'),
  createMarker(34.67, 135.50, foodMarker, 'dotonbori', '<b>🍣 미식 여행</b><br>여기는 도톤보리에요'),
  createMarker(33.59, 130.41, foodMarker, 'nakasu_yatai_street', '<b>🍣 미식 여행</b><br>여기는 나카스 야타이 거리에요')
]
//let sapporo_ramen_alley = L.marker([43.06, 141.35], { icon: foodMarker }).bindPopup('<b>🍣 미식 여행</b><br>여기는 삿포로 라멘골목이에요')
//let dotonbori = L.marker([34.67, 135.50], { icon: foodMarker }).bindPopup('<b>🍣 미식 여행</b><br>여기는 도톤보리에요')
//let nakasu_yatai_street = L.marker([33.59, 130.41], { icon: foodMarker }).bindPopup('<b>🍣 미식 여행</b><br>여기는 나카스 야타이 거리에요')

let food_trip = L.layerGroup(foods);

// ♨️ 온천 & 료칸 힐링 여행
const onsens = [
  createMarker(36.62, 138.60, onsenMarker, 'kusatsu_onsen', '<b>♨️ 온천 & 료칸 힐링 여행</b><br>여기는 쿠사츠 온천이에요'),
  createMarker(33.28, 131.50, onsenMarker, 'beppu_hells', '<b>♨️ 온천 & 료칸 힐링 여행</b><br>여기는 벳푸 지옥온천이에요'),
  createMarker(38.60, 140.49, onsenMarker, 'ginzan_onsen', '<b>♨️ 온천 & 료칸 힐링 여행</b><br>여기는 긴잔 온천이에요')
]
//let kusatsu_onsen = L.marker([36.62, 138.60], { icon: onsenMarker }).bindPopup('<b>♨️ 온천 & 료칸 힐링 여행</b><br>여기는 쿠사츠 온천이에요')
//let beppu_hells = L.marker([33.28, 131.50], { icon: onsenMarker }).bindPopup('<b>♨️ 온천 & 료칸 힐링 여행</b><br>여기는 벳푸 지옥온천이에요')
//let ginzan_onsen = L.marker([38.60, 140.49], { icon: onsenMarker }).bindPopup('<b>♨️ 온천 & 료칸 힐링 여행</b><br>여기는 긴잔 온천이에요')

let onsen_trip = L.layerGroup(onsens);

// 🎨 아트 & 건축 여행
const arts = [
  createMarker(34.46, 134.00, artMarker, 'naoshima_art_island', '<b>🎨 아트 & 건축 여행</b><br>여기는 나오시마 아트섬이에요'),
  createMarker(35.62, 139.78, artMarker, 'teamlab_borderless', '<b>🎨 아트 & 건축 여행</b><br>여기는 팀랩 브라더스에요'),
  createMarker(36.56, 136.66, artMarker, 'twenty_first_century_museum', '<b>🎨 아트 & 건축 여행</b><br>여기는 21세기 현대미술관이에요')
]
//let naoshima_art_island = L.marker([34.46, 134.00], { icon: artMarker }).bindPopup('<b>🎨 아트 & 건축 여행</b><br>여기는 나오시마 아트섬이에요')
//let teamlab_borderless = L.marker([35.62, 139.78], { icon: artMarker }).bindPopup('<b>🎨 아트 & 건축 여행</b><br>여기는 팀랩 브라더스에요')
//let twenty_first_century_museum = L.marker([36.56, 136.66], { icon: artMarker }).bindPopup('<b>🎨 아트 & 건축 여행</b><br>여기는 21세기 현대미술관이에요')

let art_trip = L.layerGroup(arts);

// 🏜️ 사막 & 자연 경이 여행
const natures = [
  createMarker(35.54, 134.23, natureMarker, 'tottori_sand_dunes', '<b>🏜️ 사막 & 자연 여행</b><br>여기는 돗토리 사구에요'),
  createMarker(31.59, 130.66, natureMarker, 'sakurajima', '<b>🏜️ 사막 & 자연 여행</b><br>여기는 사쿠라지마에요'),
  createMarker(40.60, 141.04, natureMarker, 'oirase_stream', '<b>🏜️ 사막 & 자연 여행</b><br>여기는 오이라세 계류에요')
]
//let tottori_sand_dunes = L.marker([35.54, 134.23], { icon: natureMarker }).bindPopup('<b>🏜️ 사막 & 자연 여행</b><br>여기는 돗토리 사구에요')
//let sakurajima = L.marker([31.59, 130.66], { icon: natureMarker }).bindPopup('<b>🏜️ 사막 & 자연 여행</b><br>여기는 사쿠라지마에요')
//let oirase_stream = L.marker([40.60, 141.04], { icon: natureMarker }).bindPopup('<b>🏜️ 사막 & 자연 여행</b><br>여기는 오이라세 계류에요')

let nature_trip = L.layerGroup(natures);

let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

let osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
})

let map = L.map('map', {
  center: [36.65, 138.84],
  zoom: 6,
  layers: [osm, anime_retro_trip, food_trip, onsen_trip, art_trip, nature_trip]
})

let baseMaps = {
  "OpenStreetMap": osm,
  "OpenStreetMap.HOT": osmHOT
}

let overlayMaps = {
  "🗡️ 애니메이션 & 레트로 감성 여행": anime_retro_trip,
  "🍣 미식 여행": food_trip,
  "♨️ 온천 & 료칸 힐링 여행": onsen_trip,
  "🎨 아트 & 건축 여행": art_trip,
  "🏜️ 사막 & 자연 경이 여행": nature_trip
}

let laterControl = L.control.layers(baseMaps, overlayMaps).addTo(map)


