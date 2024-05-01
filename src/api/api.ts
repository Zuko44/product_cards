export const getAllProducts = async (num?: number) => {
  const response = await fetch(
    'https://fakestoreapi.com/products?limit=' + num,
  );
  const result = await response.json();
  return result;
};
