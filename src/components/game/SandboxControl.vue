<script setup>

import {useSessionStore} from "@/stores/SessionStore";
import {useGameStore} from "@/stores/GameStore";
import {useHistoryStore} from "@/stores/HistoryStore";
import {ref, watch} from "vue";

const session = useSessionStore()
const game = useGameStore()
const history = useHistoryStore()
const wordLength = ref(session.currentWordLength)

const nextGame = () => {
  session.getNextGame()
  if (session.currentWordLength === 0) {
    session.startSession()
  }
  game.newGame(session.currentWordLength)
}

const mixLetters = () => {
  game.store.anagram = game.store.anagram.split('').sort(() => Math.random() - 0.5).join('')
}
watch(wordLength, () => {
  game.newGame(wordLength.value)
})
</script>

<template>
  <div class="row align-items-center">
    <div class="col">
      <button class="btn btn-primary" @click="nextGame">Next word</button>
    </div>
    <div class="col">
      <button class="btn btn-primary" @click="mixLetters">Mix letters</button>
    </div>
    <div class="col">
      <div class="d-flex align-items-center">
        <label for="wordLen" class="form-label me-2">Length:</label>
        <select v-model.number="wordLength" class="form-control themed" id="wordLen">
          <option v-for="len in 13" :key="len+2" :value="len+2">{{len+2}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>