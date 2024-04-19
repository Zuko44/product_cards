<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '../types/index';
import { useProductStore } from '../stores/products';

const products = ref<Product[]>([]);
const switchProducts = ref<boolean>(false);
const productsStore = useProductStore();

const getProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=20');
  const result = await response.json();
  products.value = result;
  console.log(result);
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="wrapper">
    <div>
      <label for="switchProducts">Опубликованные/ Не опубликованные</label>
      <input
        type="checkbox"
        name="switchProducts"
        v-model="switchProducts"
        :checked="switchProducts"
      />
    </div>
    <table>
      <tr>
        <th>Редактирование</th>
        <th>id</th>
        <th>Категория</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Рейтинг</th>
        <th>Рейтинг(значение)</th>
        <th>Опубликовано</th>
      </tr>
      <tr v-if="switchProducts" v-for="product in products">
        <template v-if="product.public">
          <td>
            <RouterLink :to="'/edit/' + product.id">Редактировать</RouterLink>
          </td>
          <td>{{ product.id }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td><img :src="product.image" alt="image of product" /></td>
          <td>{{ product.price }}</td>
          <td>{{ product.rating.rate }}</td>
          <td>{{ product.rating.count }}</td>
          <td>{{ product.public }}</td>
        </template>
      </tr>
      <tr v-if="!switchProducts" v-for="product in products">
        <td>
          <RouterLink :to="'/edit/' + product.id">Редактировать</RouterLink>
        </td>
        <td>{{ product.id }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td><img :src="product.image" alt="image of product" /></td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating.rate }}</td>
        <td>{{ product.rating.count }}</td>
        <td>{{ product.public }}</td>
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

label {
  margin-right: 5px;
}
</style>
