export const createNewProduct = async (
  value: string,
  value2: string,
  value3: string,
  value4: number,
  value5: File | null,
  value6: boolean,
) => {
  const response = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    body: JSON.stringify({
      category: value,
      title: value2,
      description: value3,
      price: value4,
      file: value5,
      public: value6,
      date: new Date(),
    }),
  });
  const result = await response.json();
  return result;
};

export const getAllProducts = async (num?: number) => {
  const response = await fetch(
    'https://fakestoreapi.com/products?limit=' + num,
  );
  const result = await response.json();
  return result;
};

import type { Product } from '../types/index';

export const getOneProduct = async (id: number) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/' + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const saveNewProduct = async (product: Product) => {
  const response = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    body: JSON.stringify({
      id: product.id,
      category: product.category,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      public: product.public,

      rate: product.rating.rate,
      count: product.rating.count,
      date: product.date,
    }),
  });
  const result = await response.json();
  return result;
};

export const deleteProduct = async (id: number) => {
  const response = await fetch('https://fakestoreapi.com/products/' + id, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};
