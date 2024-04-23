export const getGoods = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=20');
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: number) => {
  const response = await fetch('https://fakestoreapi.com/products/' + id, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};
