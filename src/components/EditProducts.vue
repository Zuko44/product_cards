<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOneProduct, saveNewProduct } from '../api/api';

const route: string | string[] = useRoute().params.id;

const id = ref<string | string[]>(route);
const category = ref<string>('');
const title = ref<string>('');
const description = ref<string>('');
const price = ref<number>(0);
const file = ref<File | null>();
const public_product = ref<boolean>(false);
const rate = ref<number>();
const count = ref<number>();

const msg = ref<string>('');
const divClass = ref<string>('');

const handleFileChange = (e: any) => {
  if (e.target && e.target.files) {
    file.value = e.target.files[0];
  }
};

const getProduct = (id: string | string[]) => {
  getOneProduct(id).then((result: any) => {
    if (result) {
      console.log(result);

      category.value = result.category;
      title.value = result.title;
      description.value = result.description;
      price.value = result.price;
      file.value = result.file;
      public_product.value = result.public;
      rate.value = result.rating.rate;
      count.value = result.rating.count;
    }
  });
};

const saveProduct = () => {
  if (
    category.value.length > 1 &&
    title.value.length > 1 &&
    description.value.length > 1 &&
    price.value > 0
  ) {
    saveNewProduct(
      category.value,
      title.value,
      description.value,
      price.value,
      file.value,
      public_product.value,
      rate.value,
      count.value,
    ).then((result: any) => {
      console.log(result);
    });
    divClass.value = 'success';
    msg.value = 'Продукт изменён успешно!';
  } else {
    divClass.value = 'error';
    msg.value = 'Проверьте корректность полей и их заполнение!';
    console.log('error');
  }
};

onMounted(() => {
  getProduct(route);
});
</script>

<template>
  <div class="wrapper">
    <div v-if="msg.length > 1" :class="divClass">{{ msg }}</div>
    <form action="" method="POST">
      <fieldset>
        <legend>id</legend>
        <input v-model="id" name="id" type="number" class="fields" disabled />
      </fieldset>
      <fieldset>
        <legend>Категория</legend>
        <input v-model="category" name="category" type="text" class="fields" />
      </fieldset>
      <fieldset>
        <legend>Название</legend>
        <input v-model="title" name="title" type="text" class="fields" />
      </fieldset>
      <fieldset>
        <legend>Описание</legend>
        <textarea
          v-model="description"
          name="description"
          type="text"
        ></textarea>
      </fieldset>
      <fieldset>
        <legend>Цена</legend>
        <input v-model="price" name="price" type="tel" class="fields" />
      </fieldset>
      <fieldset>
        <legend>Изображение</legend>
        <input @change="handleFileChange" name="file" type="file" />
      </fieldset>
      <fieldset>
        <legend>Рейтинг</legend>
        <input v-model="rate" name="rate" type="tel" class="fields" />
      </fieldset>
      <fieldset>
        <legend>Значение рейтинга</legend>
        <input v-model="count" name="count" type="tel" class="fields" />
      </fieldset>
      <div class="public">
        <label for="public_product">Опубликован/Не опубликован</label>
        <input
          type="checkbox"
          v-model="public_product"
          :checked="public_product"
        />
      </div>
      <button type="button" class="btn" @click.prevent="saveProduct">
        Сохранить
      </button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
}

.public {
  margin-top: 10px;
  color: RGB(128, 128, 128);
}

.public input {
  margin-left: 5px;
  display: inline;
}

fieldset {
  border: 1px solid RGB(0, 158, 226);
  border-radius: 8px;
  padding: 2px;
  width: 364px;
  margin: auto;
}

legend {
  padding-left: 5px;
  padding-right: 5px;
  color: RGB(0, 158, 226);
  font-weight: 10;
}

.fields {
  border: none;
  width: 318px;
  height: 40px;
  padding: 10px;
  outline: none;
  background: white;
}

textarea {
  border: none;
  width: 318px;
  height: 100px;
  padding: 10px;
  outline: none;
}

.btn {
  width: 125px;
  height: 48px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: RGB(0, 158, 226);
  border: none;
  border-radius: 7px;
  margin-top: 10px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
