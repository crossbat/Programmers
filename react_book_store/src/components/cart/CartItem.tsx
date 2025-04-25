import { useMemo } from "react";
import { styled } from "styled-components"
import { useAlert } from "../../hook/useAlert";
import { Cart } from "../../models/cart.model";
import { formatNumber } from "../../utils/format";
import Button from "../common/Button";
import Title from "../common/Title";
import CheckIconButton from "./CheckIconButton";

interface Props {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CartItems({ cart, checkedItems, onCheck, onDelete }: Props) {
  const { showConfirm } = useAlert()
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.id)
  }, [checkedItems, cart.id])

  const handleCheck = () => {
    onCheck(cart.id)
  }

  const handleDelete = () => {
    showConfirm('삭제하시겠습니까?', () => {
      onDelete(cart.id);
    })
  }

  return (
    <CartItemsStyle>
      <div className="info">
        <div className="check">
          <div><CheckIconButton isChecked={isChecked} onCheck={handleCheck} /></div>
        </div>
        <div>
          <Title size="medium" color="text">{cart.title}</Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)}원</p>
          <p className="quantity">{cart.count}개</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>장바구니 삭제</Button>
    </CartItemsStyle>
  )
};

const CartItemsStyle = styled.div`
  display : flex;
  justify-content : space-between;
  align-items : start;
  border : 1px solid ${({ theme }) => theme.colors.border};
  border-radius : ${({ theme }) => theme.borderRadius.default.borderRadius};
  padding : 12px;
  .info{
    display : flex;
    align-items : start;
    flex : 1;
    
    .check{
      width : 40px;
      flex-shrink : 0;
    }

    p{
      padding : 0 0 8px 0;
      margin : 0;
    }
  }
`;
