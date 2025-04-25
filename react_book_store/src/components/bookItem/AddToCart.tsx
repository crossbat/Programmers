import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useBook } from "../../hook/useBook";
import { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { InputText } from "../common/InputText";

interface Props {
  book: BookDetail;
}

export default function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value))
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  }

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  }

  return (
    <AddToCartStyle $cartAdded={cartAdded}>
      <div>
        <InputText inputType="number" value={quantity} onChange={handleChange} />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>+</Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>-</Button>
      </div>
      <Button size="medium" scheme="primary" onClick={() => addToCart(quantity)}>장바구니 담기</Button>
      {
        cartAdded && (
          <div className="added">
            <p>장바구니에 추가되었습니다.</p>
            <Link to='/cart'>장바구니로 이동</Link>
          </div>
        )
      }
    </AddToCartStyle >
  )
}

interface AddToCartStyleProps {
  $cartAdded: Boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
position : relative;
display: flex;
justify-content : space-between;
align-items : center;

.added{
  position : absolute;
  right : 0;
  bottom : -90px;
  background : ${({ theme }) => theme.colors.background};
  border-radius : ${({ theme }) => theme.borderRadius.default.borderRadius};
  padding : 8px 12px;
  opacity : ${({ $cartAdded }) => ($cartAdded ? '1' : '0')};
  transition : all 0.5s ease;

  p{
    padding : 0 0 8px 0;
    margin : 0;
  }
}
`;
