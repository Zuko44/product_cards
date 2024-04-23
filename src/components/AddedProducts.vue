<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from '../types/index';
import { getProducts, deleteProduct } from '../api/api';

const products = ref<Product[]>([]);
const switchProducts = ref<boolean>(false);

const getProductsHandler = async () => {
  getProducts().then((result) => {
    products.value = result;
    console.log(result);
  });
};

const deleteProductHandler = (id: number) => {
  const reallyDeleteOrNot = confirm(
    'Вы действительно хотите удалить продукт с id ' + id + '?',
  );
  console.log(id);
  console.log(products.value);
  if (reallyDeleteOrNot) {
    console.log(products.value);
    deleteProduct(id).then((result) => {
      if (result) {
        console.log(result);
        for (let product of products.value) {
          if (product.id === id) {
            products.value = products.value.filter(
              (product) => product.id !== id,
            );
          }
        }
      } else {
        alert('Произошла ошибка при удалении элемента с id ' + id);
      }
    });
  }
};

onMounted(() => {
  getProductsHandler();
});
</script>

<template>
  <div class="wrapper">
    <div>
      <input
        type="checkbox"
        name="switchProducts"
        v-model="switchProducts"
        :checked="switchProducts"
      />
      <label for="switchProducts">Опубликованные/ Не опубликованные</label>
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
        <th>Удалить</th>
      </tr>
      <tr v-if="switchProducts" v-for="product in products">
        <template v-if="product.public">
          <td>
            <RouterLink :to="'/edit/' + product.id"
              >Редактировать, id={{ product.id }}</RouterLink
            >
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
          <td>
            <button class="btn2" @click="deleteProductHandler(product.id)">
              Удалить
            </button>
          </td>
        </template>
      </tr>
      <tr v-if="!switchProducts" v-for="product in products">
        <td>
          <RouterLink :to="'/edit/' + product.id"
            >Редактировать, id={{ product.id }}</RouterLink
          >
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
        <td>
          <button class="btn2" @click="deleteProductHandler(product.id)">
            Удалить
          </button>
        </td>
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
  margin: 0px 5px;
}

.btn2 {
  width: 80px;
  height: 40px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: red;
  border: none;
  border-radius: 7px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
