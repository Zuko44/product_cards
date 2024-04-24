export interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  price: number;
  public: boolean;
  rating: Raiting;
  date: Date;
}

export interface Raiting {
  rate: number;
  count: number;
}
