export const getAllProducts = async (num?: number) => {
  const response = await fetch(
    'https://fakestoreapi.com/products?limit=' + num,
  );
  const result = await response.json();
  return result;
};

export const getOneProduct = async (id: number) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/' + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
