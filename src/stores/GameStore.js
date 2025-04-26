import {reactive, ref, watch} from 'vue'
import { defineStore } from 'pinia'
import words from "@/assets/wordsets/eng_nouns.json"
import {createHardAnagram} from "@/js/anagrams";

const localStorageKey = "anagrams_store_key"

/*
* word : "word"
* anagram: "orwd"
* hintSize: 0 // if no hint is taken
* */

const getWordOfLength = l => {
  while (l >= 1) {
    const filteredWords = words.filter(word => word.length === l)
    if (filteredWords.length > 0) {
      return filteredWords[Math.floor(Math.random() * filteredWords.length)]
    }
    l--
  }
  alert(`failed to find words of length ${l}`)
  return ""
}

export const useGameStore = defineStore('game', () => {
  const store = reactive(
      JSON.parse(localStorage.getItem(localStorageKey)) || {}
  )

  watch(() => store, () => {
    localStorage.setItem(localStorageKey, JSON.stringify(store))
  }, {deep: true})

  const newGame = (wordLength) => {
    // filter words array by wordLength
    store.word = getWordOfLength(wordLength)
    store.anagram = createHardAnagram(store.word)
    store.whenStarted = Date.now()
    store.hintSize = 0
    console.log(store.anagram + "->" + store.word);
  }

  const takeHint = () => {
    if (store.hintSize < store.word.length - 1) {
      store.hintSize++
    }
  }

  return {store, newGame, takeHint}
});
