import { useEffect, useState } from "react"
import { fetchOrder, fetchOrders } from "../api/order.api";
import { Order, OrderListItem } from "../models/order.model"

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  useEffect(() => {
    fetchOrders().then((orders) => { setOrders(orders) });
  }, []);

  const selectOrderItem = (id: number) => {
    if (orders.filter((item) => item.id === id)[0].detail) {
      setSelectedItemId(id);
      return;
    }
    fetchOrder(id).then((orderDetail) => {
      setSelectedItemId(id);
      setOrders(
        orders.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        })
      )
    })
  }

  return { orders, selectedItemId, selectOrderItem };
}
