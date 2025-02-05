<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const currentLocale = ref('');

const changeLocale = () => {
  localStorage.setItem("lang", currentLocale.value);
  locale.value = currentLocale.value;
};

onMounted(() => {
  currentLocale.value = localStorage.getItem("lang") || locale.value;
  locale.value = currentLocale.value;
});

</script>

<template>
  <div style="position: relative; display: inline-block; width: 100px;">
    <div style="position: relative; width: 100%; font-size: 14px;">
      <select id="locale-select" v-model="currentLocale" @change="changeLocale"
        style="width: 100%; padding: 5px 8px; font-size: 14px; border: 1px solid #ddd; border-radius: 50px; background: #fff url('https://cdn-icons-png.flaticon.com/128/61/61027.png') no-repeat right 10px center; background-size: 12px; color: #333; appearance: none; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); cursor: pointer;">
        <option value="th">ไทย</option>
        <option value="en">English</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
select:focus {
  outline: none;
  border-color: #60BFFF;
  box-shadow: 0 0 2px rgba(0, 123, 255, 0.4);
}

option {
  padding: 8px;
  font-size: 14px;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 20px;
  padding-left: 36px;
}
</style>
