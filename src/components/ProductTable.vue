<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '../types/index';
import { getAllProducts } from '../api/api';

const products = ref<Product[]>([]);
const temporaryProductsStorage = ref<Product[]>([]);
const DEFAULT_SIZE_PRODUCTS = 8;
const simpleFilter = ref<string>('');

const getProducts = (num?: number) => {
  getAllProducts(num).then((result: any) => {
    console.log(result);
    products.value = result;
    temporaryProductsStorage.value = result;
  });
};

const filterProducts = () => {
  if (simpleFilter.value.length > 1) {
    products.value = products.value.filter(
      (product) =>
        product.category.includes(simpleFilter.value) ||
        product.title.includes(simpleFilter.value) ||
        product.description.includes(simpleFilter.value),
    );
  } else {
    products.value = temporaryProductsStorage.value;
  }
};

const sortByAscendingPrice = () => {
  products.value.sort((product1, product2) => product1.price - product2.price);
};

const sortByDescendingPrice = () => {
  products.value.sort((product1, product2) => product2.price - product1.price);
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
    <div>
      <input
        type="text"
        v-model="simpleFilter"
        placeholder="найти продукт"
        class="fields"
        @change="filterProducts"
      />
    </div>
    <table>
      <tr>
        <th>Ссылка</th>
        <th>Категория</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Изображение</th>
        <th>
          <span
            title="сортировать по возрастанию цены (от меньшего к большему)"
            class="sortProducts"
            @click="sortByAscendingPrice"
            >&uarr;</span
          >Цена<span
            title="сортировать по убыванию цены (от большего к меньшему)"
            class="sortProducts"
            @click="sortByDescendingPrice"
            >&darr;</span
          >
        </th>
      </tr>
      <tr v-for="product in products">
        <td>
          <RouterLink :to="'/product/' + product.id">{{
            product.title
          }}</RouterLink>
        </td>
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

.fields {
  width: 318px;
  height: 40px;
  padding: 10px;
  outline: none;
  background: white;
  margin: 10px;
}

.sortProducts {
  cursor: pointer;
  margin: 5px;
}
</style>
