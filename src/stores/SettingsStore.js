import {reactive, ref, watch} from 'vue'
import { defineStore } from 'pinia'
import words from "@/assets/wordsets/eng_nouns.json"
import {createHardAnagram} from "@/js/anagrams";

const localStorageKey = "anagrams_settings_key"

const defaultSettings = {
  "showKbdOnButtons": !(/Mobi|Android/i.test(navigator.userAgent))
}

export const useSettingsStore = defineStore('settings', () => {
  const store = reactive(
      JSON.parse(localStorage.getItem(localStorageKey)) || defaultSettings
  )

  watch(() => store, () => {
    localStorage.setItem(localStorageKey, JSON.stringify(store))
  }, {deep: true})


  return {store}
});
