import { styled } from "styled-components"
import BookItem from "./BookItem";
import { Book } from '../../models/book.model'

export const dummyBook: Book = {
  id: 1,
  title: "타입스크립트 완벽 가이드",
  img: 101, // 이미지 번호 또는 리소스 ID
  category_id: 3,
  form: "종이책",
  isbn: "978-89-12345-67-8",
  summary: "이 책은 타입스크립트를 처음 접하는 개발자부터 고급 사용자까지 모두를 위한 완벽한 가이드를 제공합니다.",
  detail: "기초 문법부터 고급 타입, 실제 프로젝트에 적용하는 방법까지 폭넓게 다루고 있으며, 다양한 예제와 실습을 통해 학습을 도와줍니다.",
  author: "홍길동",
  pages: 432,
  contents: "1장. 타입스크립트 소개\n2장. 기본 타입\n3장. 함수와 클래스\n...\n12장. 프로젝트에 적용하기",
  price: 32000,
  likes: 124,
  pub_date: "2024-10-15",
};

export default function BooksList() {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  )
}

const BooksListStyle = styled.div``;
