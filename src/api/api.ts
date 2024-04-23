export const getOneProduct = async (id: number) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/' + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
