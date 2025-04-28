import styled from "styled-components";
import BooksEmpty from "../components/books/_BooksEmpty";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Pagination from "../components/books/Pagination";
import Title from "../components/common/Title";
import { useBooks } from "../hook/useBooks";
import Loading from "../components/common/Loading";

export default function Books() {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();

  if (isEmpty) {
    return <BooksEmpty />
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />
  }

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        {/* 필터 */}
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        <Pagination pagination={pagination} />
      </BooksStyle>
    </>
  )
}

const BooksStyle = styled.div`
display : flex;
flex-direction : column;
justify-content : space-between;
gap : 24px;

.filter{
  display : flex;
  justify-content : space-between;
  padding : 20px 0;
  align-items : center;
}
`;
