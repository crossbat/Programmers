import UserInfo from "../../components/userInfo/userInfo";
import styles from './userInfos.module.css';
import CardItems from "../../components/cardItem/cardItems";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/BASE_URL";

export default function UserInfos() {
  const { id } = useParams();
  const [userData, setUserData] = useState()
  const [itemData, setItemData] = useState([])
  const url = BASE_URL + `/store/${id}`

  useEffect(() => {
    axios.get(url, { headers: { 'ngrok-skip-browser-warning': '123123' } }).then((response) => {
      setUserData(response.data.userData[0]);
      setItemData(response.data.itemData);
    })
  }, [id])

  return (
    <>
      <UserInfo userData={userData} />
      <div className={styles.salingBox}>
        <p>상품</p>
        <p className={styles.count}>{itemData.length}</p>
        <div className={styles.itemList}>
        </div>
        <div className={styles.salingItems}>
          {
            itemData.map((item) => (
              <CardItems item={item} />
            ))
          }
        </div>
      </div >
    </>
  )
}
