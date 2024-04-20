export const getAddedProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=20');
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
