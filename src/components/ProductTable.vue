<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '../types/index';

const products = ref<Product[]>([]);

const getProducts = async (num: number) => {
  const response = await fetch(
    'https://fakestoreapi.com/products?limit=' + num,
  );
  const result = await response.json();
  products.value = result;
  console.log(result);
};

onMounted(() => {
  getProducts(8);
});
</script>

<template>
  <div class="wrapper">
    <div>
      <p>Показать...(сколько?)</p>
      <button @click="getProducts(8)">8 продуктов</button>
      <button @click="getProducts(16)">16 продуктов</button>
      <button @click="getProducts(20)">все продукты</button>
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
