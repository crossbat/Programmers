import { ResetProps } from "../pages/ResetPassword";
import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  const res = await httpClient.post('/user/join', userData, { withCredentials: true });
  return res.data;
};

export const resetRequest = async (data: ResetProps) => {
  const res = await httpClient.post('/user/reset', data, { withCredentials: true })
  return res.data
};

export const resetPassword = async (data: ResetProps) => {
  const res = await httpClient.put('/user/reset', data, { withCredentials: true })
  return res.data
};

interface LoginResponse {
  token: string;
}

export const login = async (data: SignupProps) => {
  const res = await httpClient.post<LoginResponse>('/user/login', data, { withCredentials: true })
  return res.data
};
