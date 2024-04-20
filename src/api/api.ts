export const getOneProduct = async (id: string | string[]) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/' + id);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const saveNewProduct = async (
  value: string,
  value2: string,
  value3: string,
  value4: number,
  value5: File | null,
  value6: boolean,
  value7: number,
  value8: number,
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
      rate: value7,
      count: value8,
      date: new Date(),
    }),
  });
  const result = await response.json();
  return result;
};

export const deleteOneProduct = async (id: string | string[]) => {
  const response = await fetch('https://fakestoreapi.com/products/' + id, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};
