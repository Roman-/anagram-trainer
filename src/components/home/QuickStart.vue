<script setup>

import {useSessionStore} from "@/stores/SessionStore";
import {onBeforeUnmount, onMounted} from "vue";
import {useRouter} from "vue-router";
import presets from "@/assets/presets.json";
import ButtonText from "@/components/ButtonText.vue";

const router = useRouter();

const session = useSessionStore()
const onQuickStart = () => {
  const quickStartPreset = presets[1] // TODO
  session.setPreset(quickStartPreset)
  router.push(`/setup`)
}

const handleKeyPress = (e) => {
  if (e.code === "Space") {
    return onQuickStart()
  }
}

onMounted(() => window.addEventListener("keypress", handleKeyPress))
onBeforeUnmount(() => window.removeEventListener("keypress", handleKeyPress))

</script>

<template>
  <div class="text-center">
    <button class="btn btn-primary bg-gradient px-5" @click="onQuickStart">
        <ButtonText text="Quick start →" kbd="Space"/>
    </button>
  </div>
</template>

<style scoped>

</style>