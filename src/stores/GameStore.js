import {reactive, ref, watch} from 'vue'
import { defineStore } from 'pinia'
import words from "@/assets/wordsets/eng_nouns.json"
import {createHardAnagram} from "@/js/anagrams";

const localStorageKey = "anagrams_store_key_2"

// create word map: "sorted-letters" -> ["word1", "word2", …]
export const wordMap = (() => {
  const map = {}
  for (const w of words) {
    const key = w.split('').sort().join('')
    if (!map[key]) map[key] = []
    map[key].push(w)
  }
  return map
})()
console.log("wordMap", wordMap)

/*
* word : "word"  // the original word
* sortedLetters : "dorw"
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
    store.sortedLetters = store.word.split('').sort().join('')
    store.anagram = createHardAnagram(store.word)
    store.anagramSorted = store.anagram.split('').sort().join('')
    store.whenStarted = Date.now()
    store.hintSize = 0
    console.log(store.anagram + "->" + store.word, wordMap[store.anagramSorted]);
  }

  const takeHint = () => {
    if (store.hintSize < store.word.length - 1) {
      store.hintSize++
    }
  }

  return {store, newGame, takeHint}
});
