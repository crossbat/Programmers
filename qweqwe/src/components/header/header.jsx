import Logo from '../../assets/Logo.png'
import searchIcon from '../../assets/searchIcon.png'
import { useState } from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

function Header() {
  let [login, setLogin] = useState('로그인');
  return (
    <nav>
      <div className={styles.container}>
        <Link to='/dajungdajung' className={styles.logo}>
          <img src={Logo} className={styles.logo} />
        </Link>
        <form className={styles.searchBox} method='post'>
          <input placeholder='검색어를 입력하세요' />
          <img className={styles.searchIcon} src={searchIcon} />
        </form>
        <div className={styles.navItems}>
          <Link to='/' className={styles.chating}>채팅하기</Link>
          <Link to='/items/create' className={styles.selling}>판매하기</Link>
          <Link to='/login' className={styles.login}>{login}</Link>
        </div>
      </div>
    </nav>
  )
}

export default Header;
