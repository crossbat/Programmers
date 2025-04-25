import { FaRegCheckSquare } from "react-icons/fa";
import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http"

interface FetchBooksParams {
  category_id?: number;
  recent?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const res = await httpClient.get<FetchBooksResponse>('/books', {
      params: params,
    });

    return res.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1
      }
    }

  }
}

export const fetchBookItem = async (bookId: string | undefined) => {
  try {
    const res = await httpClient.get(`/books/${bookId}`);
    return res.data;
  } catch (error) {
    return {
      book: []
    }
  }
}

export const LikeBook = async (bookId: number) => {
  const res = await httpClient.post(`/likes/${bookId}`);
  return res.data;
}

export const UnlikeBook = async (bookId: number) => {
  const res = await httpClient.delete(`/likes/${bookId}`);
  return res.data;
}
