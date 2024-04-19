import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '../types/index';

export const useProductStore = defineStore('counter', () => {
  const products = ref<Product[]>([]);

  const createProductHandler = (product: Product) => {
    products.value.push(product);
    saveProducts();
  };

  const saveProducts = () => {
    const parsed = JSON.stringify(products.value);
    localStorage.setItem('products', parsed);
  };

  const getAndSetProductsFromLocalStorage = () => {
    const productsOnLocalStorage = localStorage.getItem('products');
    let productsStorage: Product[] = [];

    if (productsOnLocalStorage !== null) {
      productsStorage = JSON.parse(productsOnLocalStorage);
      products.value = productsStorage;
    }
  };

  onMounted(() => {
    getAndSetProductsFromLocalStorage();
  });

  return { products, createProductHandler, saveProducts };
});
