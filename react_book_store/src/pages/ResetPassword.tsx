import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { resetPassword, resetRequest, signup } from "../api/auth.api"
import Button from "../components/common/Button"
import { InputText } from "../components/common/InputText"
import Title from "../components/common/Title"
import { useAlert } from "../hook/useAlert"
import { SignupStyle } from "./Signup"

export interface ResetProps {
  email: string;
  new_password: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetProps>();
  const onSubmit = (data: ResetProps) => {
    if (resetRequested) {
      resetPassword(data).then(() => {
        showAlert('비밀번호가 초기화 되었습니다.');
        navigate('/login')
      })
    } else {
      resetRequest(data).then(() => {
        setResetRequested(true)
      })
    }
  }

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText placeholder="이메일" inputType="email" {...register('email', { required: true })} />
            {errors.email && <p className="error-text">이메일을 입력해주세요</p>}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText placeholder="비밀번호" inputType="password" {...register('new_password', { required: true })} />
              {errors.new_password && <p className="error-text">비밀번호를 입력해주세요</p>}
            </fieldset>
          )}
          <fieldset>
            <Button size="medium" scheme="primary" type="submit">
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
          <div className="info">
            <Link to='/reset'>비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  )
}
