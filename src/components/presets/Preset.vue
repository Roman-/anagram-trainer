<script setup>
import {computed, onBeforeUnmount, onMounted} from "vue";
import ButtonText from "@/components/ButtonText.vue";

const props = defineProps(['preset', 'clickCallback']);
const {preset, clickCallback} = props;

const shortcutNumber = preset?.shortcut ?? null

const handleKeyPress = (e) => {
  if (shortcutNumber && e.code === `Digit${shortcutNumber}`) {
    e.preventDefault()
    return clickCallback(preset)
  }
}

onMounted(() => window.addEventListener("keypress", handleKeyPress) )
onBeforeUnmount(() => window.removeEventListener("keypress", handleKeyPress))

</script>

<template>
  <div class="col">
    <div class="card">
      <div class="card-body text-center">
        <h5 class="card-title">{{ preset.name }}</h5>
        <hr class="m-1">
        <p class="card-text">{{ preset.description }}</p>
        <button class="btn btn-primary w-75" @click="clickCallback(preset)">
          <ButtonText text="Start" :kbd="shortcutNumber"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>