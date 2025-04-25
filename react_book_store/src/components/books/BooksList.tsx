import { styled } from "styled-components"
import BookItem from "./BookItem";
import { Book } from '../../models/book.model'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QUERYSTRING } from "../../constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";

interface Props {
  books: Book[];
}

export default function BooksList({ books }: Props) {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode)
    }
  }, [location.search])
  return (
    <BooksListStyle view={view}>
      {
        books.map((item) => (
          <Link to={`/books/${item.id}`}>
            <BookItem key={item.id} book={item} view={view} />
          </Link>
        ))
      }
    </BooksListStyle>
  )
}

interface BooksListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
display : grid;
grid-template-columns : ${({ view }) => (view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)')};
gap : 24px;

a {
  text-decoration : none;
}
`;
