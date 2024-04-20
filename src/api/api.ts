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
