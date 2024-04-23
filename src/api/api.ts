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

export const deleteOneProduct = async (id: number) => {
  const response = await fetch('https://fakestoreapi.com/products/' + id, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};
