import styled from "styled-components";
import BooksEmpty from "../components/books/BooksEmpty";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Pagination from "../components/books/Pagination";
import Title from "../components/common/Title";
import { useBooks } from "../hook/useBooks";

export default function Books() {
  const { books } = useBooks();
  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <BooksStyle>
        {/* 필터 */}
        <BooksFilter />
        <BooksViewSwitcher /> {/* 목록 */}
        <BooksList />
        {/* 빈페이지 */}
        <BooksEmpty />
        {/* 페이지네이션 */}
        <Pagination />
      </BooksStyle>
    </>
  )
}

const BooksStyle = styled.div``;
