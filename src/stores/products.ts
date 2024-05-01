import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '../types/index';

export const useProductStore = defineStore('counter', () => {
  const products = ref<Product[]>([]);

  return { products };
});
