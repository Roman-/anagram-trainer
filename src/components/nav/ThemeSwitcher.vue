<script setup>

import {useThemeStore} from "@/stores/ThemeStore";
import {ref} from "vue";
const themeStore = useThemeStore();
const btn = ref(null)

const onClick = () => {
  themeStore.toggleDayNight()
  btn.value.blur()
}
</script>

<template>
  <button
      ref="btn"
      class="btn btn-link text-info"
      @click="onClick"
      title="Night mode">
    <i class="bi-moon font-bigger" :class="themeStore.icon"/>
  </button>
</template>

<style scoped>
</style>
