<script setup>

import {useGameStore} from "@/stores/GameStore";
import {useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";
import {msToHumanReadable} from "@/js/helpers";
import HistoryList from "@/components/history/HistoryList.vue";
import {useHistoryStore} from "@/stores/HistoryStore";
import "animate.css"
import party from "party-js";
import {onBeforeUnmount, onMounted, ref} from "vue";

const game = useGameStore()
const session = useSessionStore()
const router = useRouter();
const history = useHistoryStore()
const resultTitle = ref(null)

const repeat = () => {
  history.clear()
  session.startSession()
  router.push(`/game`)
}

const handleKeyPress = (e) => {
  if (e.key === "r") {
    return repeat();
  }
  if (e.key === "h") {
    return router.push(`/`)
  }
  console.log("e", e.key);
}

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener("keypress", handleKeyPress)
})

onMounted(() => {
  if (!session.store.whenSessionFinished || session.store?.whenSessionFinished === 0) {
    return router.push(`/`)
  }
  party.confetti(resultTitle.value)
})

</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1 ref="resultTitle">
      Result
    </h1>
    <p>
      {{ session.store.preset?.name }}
    </p>
    <p class="animate__animated animate__backInLeft">
      Time: {{ msToHumanReadable(session.store.whenSessionFinished - session.store.whenSessionStarted) }}
    </p>
    <div class="animate__animated animate__bounceIn animate__delay-1s">
      <HistoryList/>
    </div>
    <div class="my-2 animate__animated animate__lightSpeedInLeft animate__delay-2s">
      <button class="btn btn-primary mx-2" @click="repeat">Repeat (R)</button>
      <button class="btn btn-primary mx-2" @click="router.push('/')">Home (H)</button>
    </div>
  </div>
</template>

<style scoped>
</style>