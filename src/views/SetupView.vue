<script setup>

import {useGameStore} from "@/stores/GameStore";
import {useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useHistoryStore} from "@/stores/HistoryStore";
import ButtonText from "@/components/ButtonText.vue";

const game = useGameStore()
const session = useSessionStore()
const history = useHistoryStore()
const router = useRouter();

const goHome = () => {
  router.push(`/`)
}

const handleKeyPress = (e) => {
  if (e.code === "Space") {
    return start()
  }
  if (e.key === "h") {
    return goHome()
  }
}

onMounted(() => {
  if (!session.store.preset) {
    return goHome()
  }
  window.addEventListener("keypress", handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener("keypress", handleKeyPress)
})

const start = () => {
  history.clear()
  session.startSession()
  router.push(`/game`)
}

</script>

<template>
  <div class="container text-center">
    <h1>
      {{ session.store.preset?.name }}
    </h1>
    <p>
      {{ session.store.preset?.description }}
    </p>
    <div>
      Steps: {{ JSON.stringify(session.store.preset?.steps) }}
    </div>
    <div>
      <button class="btn btn-primary m-2 bg-gradient form-control" @click="start">
        <ButtonText text="Start" kbd="Space"/>
      </button>
      <button class="btn btn-secondary m-2 form-control" @click="goHome">
        <ButtonText text="Home" kbd="H"/>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>