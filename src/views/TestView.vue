<script setup>
import words from "@/assets/wordsets/eng_nouns.json"
import {createHardAnagram} from "@/js/anagrams";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";

const text = ref("")

onMounted(() => {
  const numLetters = 5

  // sorted letters to array of all N-letter words
  let map = {}

  for (const word of words) {
    const sorted = word.split("").sort().join("")
    if (!map[sorted]) {
      map[sorted] = []
    }
    map[sorted].push(word)
  }

  // array of objects: {id, scrambled_word, word} of all N-letter anagrams that has exactly one solution
  let puzzles = []
  for (const sorted in map) {
    if (map[sorted].length === 1 && map[sorted][0].length === numLetters) {
      puzzles.push({
        id: puzzles.length,
        scrambled_word: createHardAnagram(map[sorted][0]),
        word: map[sorted][0]
      })
    }
  }

  text.value = ""
  for (const p of puzzles) {
    text.value += `${p.id}\t${p.scrambled_word}\t${p.word}\n`
  }
})

</script>

<template>
<textarea class="w-100 h-75" v-model="text"/>
</template>

<style scoped>

</style>