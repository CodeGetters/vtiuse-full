<script setup lang="ts">
import { toggleDark } from "@/utils/useToggleDark";
</script>

<template>
  <div
    class="home .dark:bg-black .dark:text-#fff text-18px h100vh flex flex-col justify-center items-center"
  >
    <div class="container flex flex-row items-center justify-center">
      <button @click="toggleDark">
        <div i-carbon-sun dark:i-carbon-moon cursor-pointer />
      </button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
