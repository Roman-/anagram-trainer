<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/nav/NavBar.vue";
import "@/assets/global.css"

import {useThemeStore} from "@/stores/ThemeStore";
import {computed} from "vue";

const theme = useThemeStore()
theme.applyCurrentTheme();

const baseUrl = process.env.NODE_ENV === 'production' ? '/anagrams' : '';
const lightness = computed(() => theme.isDark ? "dark" : "light")
const imgUrl = computed(() => new URL(`${baseUrl}/img/chevron-${lightness.value}.jpg`, import.meta.url).href)
</script>

<template>
  <div class="appBg" :style="{backgroundImage: `url(${imgUrl})`}">
    <NavBar/>
    <RouterView/>
  </div>
</template>

<style>
.appBg {
  width: 100%;
  height: 100vh;
  background-repeat: repeat;
  background-size: 250px 250px;
}
</style>
