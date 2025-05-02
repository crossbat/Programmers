import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar/sidebar'
import style from './myPage.module.css'
import { AUTH_TOKEN, BASE_URL } from '../../api/BASE_URL'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const outletDataRoutes = {
  info: '/users/mypage',
  item: '/items/myitem',
  like: '/users/likes'
}

const outletFrontRoutes = {
  info: '/users/mypage',
  infoUpdate: '/users/mypage/update',
  item: '/users/upload',
  like: '/users/likes',
  unsub: '/users/unsubscribe'
}

const userUrl = BASE_URL + outletDataRoutes.info
const userItemUrl = BASE_URL + outletDataRoutes.item
const userLikesUrl = BASE_URL + outletDataRoutes.like

export default function MyPage() {
  const [contextUserData, setContextUserData] = useState({});
  const [contextUserItemData, setContextUserItemData] = useState([]);
  const [contextUserLikeData, setContextUserLikeData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname
    if (path === outletFrontRoutes.info || window.location.pathname === outletFrontRoutes.infoUpdate) {
      axios.get(userUrl, { headers: { 'ngrok-skip-browser-warning': '123123', 'Authorization': AUTH_TOKEN } }).then((response) => {
        setContextUserData(response.data[0]);
      })
    }
    if (path === outletFrontRoutes.item) {
      axios.get(userItemUrl, { headers: { 'ngrok-skip-browser-warning': '123123', 'Authorization': AUTH_TOKEN } }).then((response) => {
        setContextUserItemData(response.data);
      }).catch(err => {
        setContextUserItemData([]);
      })
    }
    if (path === outletFrontRoutes.like) {
      axios.get(userLikesUrl, { headers: { 'ngrok-skip-browser-warning': '123123', 'Authorization': AUTH_TOKEN } }).then((response) => {
        setContextUserLikeData(response.data)
      }).catch(err => {
        console.log(err)
        setContextUserLikeData([]);
      })
    }
  }, [location.pathname])

  return (
    <div className={style.myPageContainer}>
      <div className={style.myPage}>
        <Sidebar />
        <Outlet context={{ contextUserData, contextUserItemData, contextUserLikeData }} />
      </div>
    </div>
  )
}
