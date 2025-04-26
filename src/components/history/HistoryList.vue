<script setup>

import HistoryItem from "@/components/history/HistoryItem.vue";
import {useHistoryStore} from "@/stores/HistoryStore";

const history = useHistoryStore()
</script>

<template>
  <HistoryItem
      v-for="(item, index) in history.store.items"
      :key="item.id"
      :item="item"
      :index="index + 1"/>
</template>

<style scoped>

</style>