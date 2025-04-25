import { styled } from "styled-components"
import logo from '../../assets/images/logo.png'
import { FaSignInAlt, FaRegUser } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { useCategory } from "../../hook/useCategory"
import { useAuthStore } from "../../store/authStore"

export default function Header() {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();

  const Logout = () => {
    storeLogout();
    window.location.reload();
  }

  return (
    <HeaderStyle>
      <h1 className="logo">
        <Link to='/'>
          <img src={logo} alt='book store' />
        </Link>
      </h1>
      <nav className="category">
        <ul>
          {
            category.map((item) => (
              <li key={item.category_id}>
                <Link to={item.category_id === null ? '/books' : `/books?category_id=${item.category_id}`}>{item.category_name}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <nav className="auth">
        {
          isLoggedIn && (
            <ul>
              <li>
                <Link to='/cart'>장바구니</Link>
              </li>
              <li>
                <Link to='/orderlist'>주문내역</Link>
              </li>
              <li>
                <button onClick={Logout}>로그아웃</button>
              </li>

            </ul>
          )
        }
        {
          !isLoggedIn && (
            <ul>
              <li>
                <a href='/login'>
                  <FaSignInAlt />
                  로그인
                </a>
              </li>
              <li>
                <a href='/signup'>
                  <FaRegUser />
                  회원가입
                </a>
              </li>
            </ul>
          )
        }
      </nav>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header`
width : 100%;
margin : 0 auto;
max-width : ${({ theme }) => theme.layout.width.large};

display : flex;
justify-content : space-between;
align-items : center;
padding : 20px 0;
border-bottom : 1px solid ${({ theme }) => theme.colors.background};

.logo{
  img{
    width : 200px;
  }
}

.category {
  ul{
    display : flex;
    gap : 32px;
    li{
      a{
        font-size : 1.5rem;
        font-weight : 600;
        text-decoration : none;
        color : ${({ theme }) => theme.colors.text};
        &:hover {
          color : ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
}

.auth{
  ul{
    display : flex;
    gap : 16px;
    li{
      a, button{
        font-size : 1.5rem;
        font-weight : 600;
        text-decoration : none;
        display : flex;
        align-items : center;
        line-height : 1;
        background : none;
        border : 0;
        cursor : pointer;
        svg{
          margin-right : 6px;
        }
      }
    }
  }
}
`
