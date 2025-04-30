import { addBookReview, fetchBookReview } from "../api/review.api";
import { useEffect, useState } from "react"
import { fetchBookItem, LikeBook, UnlikeBook } from "../api/books.api";
import { addCart } from "../api/cart.api";
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model"
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";

export const useBook = (bookId: string | undefined) => {
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState<Boolean>(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([])

  const likeToggle = () => {
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      return;
    }
    if (!book) return;
    if (book.liked) {
      UnlikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1
        })
      })
      //unlike
    } else {
      LikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        })
      })
    }
  }

  const addToCart = (quantity: number) => {
    if (!book) {
      return;
    }
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      return;
    }
    addCart({
      book_id: book.id,
      count: quantity,
    }).then(() => {
      setCartAdded(true)
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    })
  }

  useEffect(() => {
    if (!bookId) return;
    fetchBookItem(bookId).then((book) => {
      setBook(book)
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews)
    })
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      // fetchBookReview(book.id.toString()).then((reviews) => {
      //   setReviews(reviews)
      // })
      showAlert(res?.message)
    })
  }

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview }
}
