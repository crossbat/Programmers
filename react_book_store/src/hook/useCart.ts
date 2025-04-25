import { useEffect, useState } from "react"
import { DeleteCart, FetchCart } from "../api/cart.api";
import { Cart } from "../models/cart.model"

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCartItem = (id: number) => {
    DeleteCart(id).then(() => {
      setCarts(carts.filter((cart) => cart.id !== id));
    })
  }

  useEffect(() => {
    FetchCart().then((carts) => {
      setCarts(carts);
      setIsEmpty(carts.length === 0);
    })
  }, []);

  return { carts, isEmpty, deleteCartItem };
}
