import { Cart } from "../models/cart.model";
import { httpClient } from "./http"
interface AddCartParams {
  book_id: number;
  count: number;
}

export const addCart = async (params: AddCartParams) => {
  const res = await httpClient.post('/carts', params);
  return res.data
}

export const FetchCart = async () => {
  const res = await httpClient.get<Cart[]>('/carts');
  return res.data;
}

export const DeleteCart = async (cart_id: number) => {
  const res = await httpClient.delete(`/carts/${cart_id}`);
  return res.data;
}
