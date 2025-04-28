export interface Order {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_count: number;
  total_price: number;
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
  book_id: number;
  title: string;
  author: string;
  price: number;
  count: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
