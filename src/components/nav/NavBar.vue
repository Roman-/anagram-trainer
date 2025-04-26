<script setup>
import {useThemeStore} from "@/stores/ThemeStore";
import ThemeSwitcher from "@/components/nav/ThemeSwitcher.vue";
import {computed} from "vue";
import {useRouter} from "vue-router";

const themeStore = useThemeStore();
const navBarClass = computed(() => themeStore.isDark ? "navbar-dark bg-dark" : "navbar-light bg-light");
const router = useRouter();
</script>

<template>
  <nav class="navbar sticky-top" :class="navBarClass">
    <div class="row w-100 align-items-center">
      <div class="col-auto me-auto">
        <a class="navbar-brand clickable text-info px-3" @click="router.push('/')">Anagrams</a>
      </div>
      <div class="col-auto">
        <ThemeSwitcher/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>