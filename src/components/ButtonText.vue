<script setup>
import {useSettingsStore} from "@/stores/SettingsStore";

const props = defineProps(['text', 'kbd']);
const {text, kbd} = props;

const settings = useSettingsStore()

</script>

<template>
  <div>{{text}}</div>
  <kbd v-if="kbd && settings.store.showKbdOnButtons">{{kbd}}</kbd>
</template>

<style scoped>

</style>