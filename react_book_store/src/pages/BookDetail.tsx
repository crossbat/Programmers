import BookReview from "../components/bookItem/BookReview";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components"
import AddToCart from "../components/bookItem/AddToCart";
import LikeButton from "../components/bookItem/LikeButton";
import EllipsisBox from "../components/common/EllipsisBox";
import Title from "../components/common/Title";
import { useBook } from "../hook/useBook";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from "../utils/format";
import { getImgSrc } from "../utils/images";

const bookInfoList = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: IBookDetail) => (
      <Link to={`/books?category_id=${book.category_id}`}>{book.category_name}</Link>
    )
  },
  {
    label: '포맷',
    key: 'form'
  },
  {
    label: '페이지',
    key: 'pages'
  },
  {
    label: 'ISBN',
    key: 'ISBN'
  },
  {
    label: '출간일',
    key: 'pub_date',
    filter: (book: IBookDetail) => {
      return formatDate(book.pub_date)
    }
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => { return `${formatNumber(book.price)}원` },
  }
]

export default function BookDetail() {
  const { id } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(id);
  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.image)} alt={book.title} />
        </div>
        <div className="info" >
          <Title size="large" color="text">{book.title}</Title>
          {
            bookInfoList.map(({ label, key, filter }) => (
              <dl>
                <dt>{label}</dt>
                <dd>{filter ? filter(book) : book[key as keyof IBookDetail]}</dd>
              </dl>
            ))
          }
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Title size="medium">상세설명</Title>
        <EllipsisBox clamp={2}>{book.detail}</EllipsisBox>

        <Title size='medium'>목차</Title>
        <p className="index">{book.contents}</p>

        <Title size="medium">리뷰</Title>
        <BookReview reviews={reviews} onAdd={addReview} />
      </div>
    </BookDetailStyle>
  )
}

const BookDetailStyle = styled.div`
.header{
  display : flex;
  align-items :start;
  gap : 24px;
  padding : 0 0 24px 0;

  .img{
    flex : 1;
    img{
      width : 100%;
      height: auto;
    }
  }
  .info{
    flex : 1;
    display : flex;
    flex-direction : column;
    gap: 12px;

    dl{
      display : flex;
      margin : 0;
      dt{
        width : 80px;
        color : ${({ theme }) => theme.colors.secondary};
      }
      a{
        color : ${({ theme }) => theme.colors.primary};
      }
    }
  }
}
`;
