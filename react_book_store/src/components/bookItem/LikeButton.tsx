import { FaHeart } from "react-icons/fa";
import styled from "styled-components"
import { BookDetail } from "../../models/book.model"
import Button from "../common/Button";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

export default function LikeButton({ book, onClick }: Props) {
  return (
    <LikeButtonStyle size='medium' scheme={book.liked ? 'like' : 'normal'} onClick={onClick}>
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  )
}

const LikeButtonStyle = styled(Button)`
svg{
  color: inherit;
  * {
    color : inherit;
  }
}
`;
