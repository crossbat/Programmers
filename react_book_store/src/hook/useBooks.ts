import { useQuery } from "react-query";
import { useLocation } from "react-router-dom"
import { fetchBooks } from "../api/books.api";
import { LIMIT } from "../constants/pagination";
import { QUERYSTRING } from "../constants/querystring";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery(['books', location.search], () =>
    fetchBooks({
      category_id: params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
      recent: params.get(QUERYSTRING.RECENT) ? true : undefined,
      currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
      limit: LIMIT,
    })
  )

  return { books: booksData?.books, pagination: booksData?.pagination, isEmpty: booksData?.books.length === 0, isBooksLoading };
}
