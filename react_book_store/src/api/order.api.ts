import { async } from "q";
import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

// export const order = async (orderData: OrderSheet) => {
//   const res = await httpClient.post('/orders', orderData);
//   return res.data;
// }

export const order = async (orderData: OrderSheet) => {
  return await requestHandler('post', '/orders', orderData)
}

export const fetchOrders = async () => {
  return await requestHandler('get', '/orders');
}

export const fetchOrder = async (id: number) => {
  return await requestHandler('get', `/orders//${id}`);
}
