<script setup>

import {useGameStore} from "@/stores/GameStore";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import "animate.css"
import {useHistoryStore} from "@/stores/HistoryStore";
import party from "party-js";
import SessionCard from "@/components/session/SessionCard.vue";
import {useSessionStore} from "@/stores/SessionStore";
import {useRouter} from "vue-router";
import SandboxControl from "@/components/game/SandboxControl.vue";

const session = useSessionStore()
const game = useGameStore()
const history = useHistoryStore()
const guess = ref("")
const input = ref(null)
const router = useRouter();
const isSandbox = computed(() => session.store.preset?.type === 'sandbox')

const takeHint = () => {
  game.takeHint()
  input.value.focus()
}

const handleKeyPress = (e) => {
  if (e.code === "Space") {
    return takeHint();
  }
}

onMounted(() => {
  window.addEventListener("keypress", handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener("keypress", handleKeyPress)
})

onMounted(() => {
  if (session.currentWordLength === 0) {
    console.log("currentWordLength === 0, going to home");
    return router.push("/")
  }
  game.newGame(session.currentWordLength) // TODO after pause
  input.value.focus()
})

const startNextGame = () => {
  session.getNextGame()
  if (session.currentWordLength === 0) {
    if (isSandbox.value) {
      session.startSession()
    } else {
      session.finishSession()
      return router.push("/result")
    }
  }
  game.newGame(session.currentWordLength)
}

watch(guess, () => {
  guess.value = guess.value.replaceAll(/\W/g, '').toLowerCase()
  if (guess.value === game.store.word) {
    history.push(game.store)
    guess.value = ""
    if (!session.isLastGame()) {
      party.confetti(input.value)
    }
    startNextGame()
  }
})

const showedAnagram = computed(() => {
  if (!game.store.word) {
    return ""
  }
  if (game.store.hintSize === 0) {
    return game.store.anagram
  }
  if (!game.store.word) {
    return "-"
  }
  const correctPart = game.store.word.substring(0, game.store.hintSize)
  return `${game.store.anagram} → ${correctPart}`
      + (correctPart.length === game.store.word.length ? "!" : "…")
})

</script>

<template>
  <div class="row p-1">
    <div class="col-md-8 col-12">
      <div class="m-2">
        <div class="anagram text-center" v-cloak>
          {{showedAnagram}}
        </div>
        <div>
          <input
              v-model="guess"
              ref="input"
              placeholder="enter the answer here"
              :maxlength="game.store.word?.length"
              autocapitalize="none"
          />
        </div>
        <div class="progress" v-if="!isSandbox">
          <div
              class="progress-bar"
              role="progressbar"
              :style="`width: ${session.currentProgressPercent}%`"
              :aria-valuenow="session.currentProgressPercent"
              aria-valuemin="0"
              aria-valuemax="100"/>
        </div>
        <div class="mt-1">
          <button
              class="btn btn-outline-warning"
              @click="takeHint"
              :disabled="game.store.hintSize >= game.store.word.length - 1">
            <div>Hint</div>
            <small>(space)</small>
          </button>
        </div>
        <SandboxControl v-if="isSandbox"/>
      </div>
    </div>
    <div class="col-md-4 col-12">
      <SessionCard/>
    </div>
  </div>

</template>

<style scoped>
.anagram {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

input {
  font-size: 2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
}
</style>