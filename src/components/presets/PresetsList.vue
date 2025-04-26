<script setup>
import presets from "@/assets/presets.json";
import Preset from "@/components/presets/Preset.vue";
import {useRouter} from "vue-router";
import {useSessionStore} from "@/stores/SessionStore";

const router = useRouter();
const session = useSessionStore()

const onPresetSelected = (p) => {
  session.setPreset(p)
  router.push(`/setup`)
}
</script>

<template>
  <div class="row">
    <Preset
        v-for="preset in presets"
        :key="preset.id"
        :preset="preset"
        :clickCallback="onPresetSelected"/>
  </div>
</template>

<style scoped>

</style>