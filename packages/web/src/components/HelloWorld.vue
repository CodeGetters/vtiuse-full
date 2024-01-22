<script setup lang="ts">
import { toggleDark } from "@/utils/useToggleDark";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

/**
 * @description 语言切换-language change
 */
const changeLang = () => {
  locale.value === "zh" ? (locale.value = "en") : (locale.value = "zh");
};

console.log(locale.value);
</script>

<template>
  <div
    class="home .dark:bg-black .dark:text-#fff text-18px h100vh flex flex-col justify-center items-center"
  >
    <div class="container flex flex-row items-center justify-center">
      <button @click="toggleDark">theme</button>
      <div class="text-red">{{ t("HelloWorld") }}</div>
      <button @click="changeLang()" cursor-pointer>切换语言</button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
