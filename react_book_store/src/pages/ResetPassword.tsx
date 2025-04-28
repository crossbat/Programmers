import { useAuth } from "../hook/useAuth"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
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
  const { userResetRequest, userResetPassword, resetRequested } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetProps>();
  const onSubmit = (data: ResetProps) => {
    resetRequested
      ? userResetPassword(data)
      : userResetRequest(data)
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
