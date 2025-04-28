import { useMemo, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import CartItems from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import Empty from "../components/common/Empty";
import Title from "../components/common/Title";
import { useAlert } from "../hook/useAlert";
import { useCart } from "../hook/useCart";
import { OrderSheet } from "../models/order.model";

export default function Cart() {
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const { carts, isEmpty, deleteCartItem } = useCart()
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.count;
      }
      return acc;
    }, 0)
  }, [carts, checkedItems])

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price;
      }
      return acc;
    }, 0)
  }, [carts, checkedItems])

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id))
    } else {
      setCheckedItems([...checkedItems, id])
    }
  }

  const handleDeleteItem = (id: number) => {
    deleteCartItem(id)
  }

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해주세요');
      return;
    }

    const OrderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      totalPrice,
      totalCount: totalQuantity,
      firstBookTitle: carts[0].title
    };
    showConfirm('주문하시겠습니까?', () => {
      navigate('/order', { state: OrderData });
    })
  }

  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {
                carts.map((item) => (
                  <CartItems key={item.id} cart={item} checkedItems={checkedItems} onCheck={handleCheckItem} onDelete={handleDeleteItem} />
                ))
              }
            </div>
            <div className="summary">
              <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
              <Button size="large" scheme="primary" onClick={handleOrder}>주문하기</Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            icon={<FaShoppingCart />}
            title="장바구니가 비었습니다."
            description={<>장바구니를 채워보세요</>}
          />
        )}
      </CartStyle>
    </>
  )
};

export const CartStyle = styled.div`
  display : flex;
  gap: 24px;
  justify-content : center;
  padding : 24px 0 0 0 ;

  .content{
    flex : 1;
    display : flex;
    flex-direction : column;
    gap : 12px;
  }

  .summary {
    display : flex;
    flex-direction : column;
    gap:24px;
  }

  .orderInfo{
    h1{
      padding : 0 0 24px 0;
    }
    border : 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.default.borderRadius};
    padding : 12px;
  }

  .delivery{
    fieldset{
      border : 0;
      margin : 0;
      padding : 0 0 12px 0;
      display : flex;
      justify-content : start;
      gap : 8px;

      label{
        width : 80px;
      }
      .input{
        flex : 1;
        input {
          width : 100%;
        }
      }
    }
    .errorText{
      color : red;
      margin : 0;
      padding : 0 0 12px 0;
      text-align : right;
    }
  }
`;
