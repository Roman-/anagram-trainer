<script setup>
import HistoryList from "@/components/history/HistoryList.vue";
</script>

<template>
  <div>
    <div>
      <strong>Session</strong>
    </div>
    <div>
      <HistoryList/>
    </div>
  </div>
</template>

<style scoped>
.withHint {
  text-decoration: line-through;
}
</style>