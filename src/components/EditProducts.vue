<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import router from '../router';
import { getOneProduct, saveNewProduct, deleteOneProduct } from '../api/api';

interface Props {
  id: number;
}

const props = defineProps<Props>();
const id = props.id;
const category = ref<string>('');
const title = ref<string>('');
const description = ref<string>('');
const price = ref<number>(0);
const image = ref<string>('');
const public_product = ref<boolean>(false);
const rate = ref<number>(0);
const count = ref<number>(0);

const msg = ref<string>('');
const divClass = ref<string>('');

const getProduct = (id: number) => {
  getOneProduct(id).then((result: any) => {
    if (result) {
      console.log(result);

      category.value = result.category;
      title.value = result.title;
      description.value = result.description;
      price.value = result.price;
      image.value = result.image;
      public_product.value = result.public;
      rate.value = result.rating.rate;
      count.value = result.rating.count;
    }
  });
};

const saveProduct = () => {
  saveNewProduct({
    id: id,
    category: category.value,
    title: title.value,
    description: description.value,
    image: image.value,
    price: price.value,
    public: public_product.value,
    rating: {
      rate: rate.value,
      count: count.value,
    },
    date: new Date(),
  }).then((result: any) => {
    console.log(result);
    if (result.id) {
      divClass.value = 'success';
      msg.value = 'Продукт изменён успешно!';
    } else {
      divClass.value = 'error';
      msg.value = 'Проверьте корректность полей и их заполнение!';
      console.log('error');
    }
  });
};

const deleteProductHandler = () => {
  deleteOneProduct(id).then((result) => {
    if (result) {
      console.log(result);
    }

    setTimeout(() => {
      router.push({ name: 'home' });
    }, 3000);
  });
};

const isValid = computed(() => {
  return (
    category.value.length > 0 &&
    title.value.length > 0 &&
    description.value.length > 0 &&
    price.value > 0
  );
});

onMounted(() => {
  getProduct(id);
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
        <legend>Путь к изображению</legend>
        <input v-model="image" name="avatar" type="text" class="fields" />
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
        <input
          type="checkbox"
          class="public_product"
          v-model="public_product"
          :checked="public_product"
        />
        <label for="public_product">Опубликован/Не опубликован</label>
      </div>
      <div class="buttons">
        <button
          v-if="!isValid"
          disabled
          title="Все обязательные поля должны быть заполнены!"
          type="button"
          class="disabledBtn"
        >
          Сохранить
        </button>
        <button
          v-if="isValid"
          type="button"
          class="btn"
          @click.prevent="saveProduct"
        >
          Сохранить
        </button>
        <button
          type="button"
          class="btn2"
          @click.prevent="deleteProductHandler"
        >
          Удалить
        </button>
      </div>
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
  margin: 0px 5px;
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
  cursor: pointer;
}

.btn2 {
  width: 125px;
  height: 48px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: red;
  border: none;
  border-radius: 7px;
  margin-top: 10px;
  cursor: pointer;
}

.disabledBtn {
  width: 125px;
  height: 48px;
  color: white;
  font-weight: 14;
  font-size: 1rem;
  background-color: RGB(128, 128, 128);
  border: none;
  border-radius: 7px;
  margin-top: 10px;
  cursor: pointer;
}

.buttons {
  display: inline-flex;
  flex-direction: column;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
