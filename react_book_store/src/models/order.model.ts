export interface Order {
  id: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalQuantity: string;
  totalPrice: string;
}

export interface OrderSheet {
  items: number[];
  totalCount: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetailItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  count: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
