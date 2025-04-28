import { login, resetPassword, resetRequest, signup } from "../api/auth.api";
import { SignupProps } from "../pages/Signup";
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { useState } from "react";
import { ResetProps } from "@/pages/ResetPassword";

export const useAuth = () => {
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const userLogin = (data: SignupProps) => {
    login(data).then((res) => {
      storeLogin(res.token);
      showAlert('로그인이 완료되었습니다.');
      navigate('/');
      window.location.reload();
    }, (error) => {
      showAlert('로그인에 실패하였습니다.')
    })

  }

  const userSignUp = (data: SignupProps) => {
    signup(data).then((res) => {
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login')
    });
  }

  const userResetPassword = (data: ResetProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화 되었습니다.');
      navigate('/login')
    })
  }

  const [resetRequested, setResetRequested] = useState(false);

  const userResetRequest = (data: ResetProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true)
    })
  }

  return { userLogin, userSignUp, userResetPassword, userResetRequest, resetRequested }
}
