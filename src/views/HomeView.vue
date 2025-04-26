<script setup>

import PresetsList from "@/components/presets/PresetsList.vue";
import {useSessionStore} from "@/stores/SessionStore";
import {onMounted} from "vue";
import QuickStart from "@/components/home/QuickStart.vue";

const session = useSessionStore()
onMounted(() => {
  session.setPreset(null)
})

</script>

<template>
  <div class="p-3">
    <h1>
      Daily practice
    </h1>
    <QuickStart/>
    <h1 class="mt-3">
      Specific practice
    </h1>
    <div>
      <PresetsList/>
    </div>
  </div>
</template>

<style scoped>
</style>