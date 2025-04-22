import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { fetchBooks } from "../api/books.api";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
  }, []);
  return { books };
}
