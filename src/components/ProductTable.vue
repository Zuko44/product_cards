<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '../types/index';
import { getAllProducts } from '../api/api';

const products = ref<Product[]>([]);
const DEFAULT_SIZE_PRODUCTS = 8;

const getProducts = (num?: number) => {
  getAllProducts(num).then((result: any) => {
    console.log(result);
    products.value = result;
  });
};

onMounted(() => {
  getProducts(DEFAULT_SIZE_PRODUCTS);
});
</script>

<template>
  <div class="wrapper">
    <div>
      <p>Показать...(сколько?)</p>
      <button @click="getProducts(8)">8 продуктов</button>
      <button @click="getProducts(16)">16 продуктов</button>
      <button @click="getProducts(20)">20 продуктов</button>
      <button @click="getProducts()">все продукты</button>
    </div>
    <table>
      <tr>
        <th>Ссылка</th>
        <th>Категория</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Изображение</th>
        <th>Цена</th>
      </tr>
      <tr v-for="product in products">
        <td><RouterLink :to="'/product/' + product.id">product</RouterLink></td>
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td><img :src="product.image" alt="image of product" /></td>
        <td>{{ product.price }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
}

table {
  margin: 15px auto;
}

table,
td,
th {
  border: 1px solid black;
  padding: 5px;
}

img {
  width: 40px;
  height: auto;
}
</style>
