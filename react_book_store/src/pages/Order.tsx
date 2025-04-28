import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { order } from "../api/order.api";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { InputText } from "../components/common/InputText";
import Title from "../components/common/Title";
import FindAddressButton from "../components/order/FindAddressButton";
import { useAlert } from "../hook/useAlert";
import { Delivery, OrderSheet } from "../models/order.model";
import { CartStyle } from "./Cart";

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

export default function Order() {
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { totalCount, totalPrice, firstBookTitle } = orderDataFromCart;
  console.log(orderDataFromCart);



  const { register, handleSubmit, formState: { errors }, setValue } = useForm<DeliveryForm>()

  const handlePay = (data: DeliveryForm) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`
      }
    }
    showConfirm('주문을 진행하시겠습니까?', () => {
      order(orderData).then(() => {
        showAlert('주문이 처리되었습니다.');
        navigate('/orderlist');
      })
    })
  }

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <CartStyle>
        <div className="content" >
          <div className="orderInfo">
            <Title size="medium" color="text">배송 정보</Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText inputType="text" {...register('address', { required: true })} />
                </div>
                <FindAddressButton onCompleted={(address) => { setValue('address', address) }} />
              </fieldset>
              {errors.address && <p className="errorText">주소를 입력해주세요</p>}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText inputType="text" {...register('addressDetail', { required: true })} />
                </div>
              </fieldset>
              {errors.address && <p className="errorText">상세 주소를 입력해주세요</p>}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText inputType="text" {...register('receiver', { required: true })} />
                </div>
              </fieldset>
              {errors.address && <p className="errorText">수령인을 입력해주세요</p>}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText inputType="text" {...register('contact', { required: true })} />
                </div>
              </fieldset>
              {errors.address && <p className="errorText">전화번호를 입력해주세요</p>}
            </form>
          </div>
          <div className="orderInfo">
            <Title size="medium" color="text">주문 상품</Title>
            <strong>{firstBookTitle} 등 총 {totalCount}권</strong>
          </div>
        </div>
        <div className="summary" >
          <CartSummary totalQuantity={totalCount} totalPrice={totalPrice} />
          <Button size="large" scheme="primary" onClick={handleSubmit(handlePay)}>결제하기</Button>
        </div>

      </CartStyle>
    </>
  )
};
