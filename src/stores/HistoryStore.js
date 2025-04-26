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

  const push = (item) => {
    store.items.push({
      "anagram": item.anagram,
      "word": item.word,
      "timeMs": new Date() - item.whenStarted,
      "hintSize" : item.hintSize
    })
  }

  const clear = () => store.items = []

  return {store, push, clear}
});
