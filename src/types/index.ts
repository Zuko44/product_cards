export interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: Raiting;
}

export interface Raiting {
  rate: number;
  count: number;
}
