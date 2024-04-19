<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Product } from '../types/index';

const product = ref<Product>();

const getProduct = async (id: number) => {
  const response = await fetch('https://fakestoreapi.com/products/' + id);
  const result = await response.json();
  if (result) {
    product.value = result;
  }
  console.log(result);
};

onMounted(() => {
  getProduct(1);
});
</script>

<template>
  <div class="wrapper">
    <div>
      <h3>Категория</h3>
      {{ product?.category }}
    </div>
    <div>
      <h3>Название продукта</h3>
      {{ product?.title }}
    </div>
    <div>
      <h3>Описание продукта</h3>
      {{ product?.description }}
    </div>
    <div>
      <h3>Цена</h3>
      {{ product?.price }}
    </div>
    <div>
      <h3>Рейтинг</h3>
      {{ product?.rating.rate }}
    </div>
    <div>
      <h3>Значение</h3>
      {{ product?.rating.count }}
    </div>
    <div class="navigation">
      <RouterLink to="/">Главная страница</RouterLink>
    </div>
    <div>
      <img :src="product?.image" alt="image of product" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
}

h3 {
  font-weight: 600;
}

img {
  width: 50%;
}

.navigation {
  margin: 15px 0px;
}
</style>
