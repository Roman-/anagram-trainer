import {reactive, ref, watch} from 'vue'
import { defineStore } from 'pinia'

const localStorageKey = "anagram_history_key"

export const useHistoryStore = defineStore('history', () => {
  const store = reactive(
      JSON.parse(localStorage.getItem(localStorageKey)) || {items: []}
  )

  watch(() => store, () => {
    localStorage.setItem(localStorageKey, JSON.stringify(store))
  }, {deep: true})

  const push = (storeAndGuess) => {
    store.items.push({
      "anagram": storeAndGuess.store.anagram,
      "word": storeAndGuess.guess,
      "timeMs": new Date() - storeAndGuess.store.whenStarted,
      "hintSize" : storeAndGuess.store.hintSize
    })
  }

  const clear = () => store.items = []

  return {store, push, clear}
});
