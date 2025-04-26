import {computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'

export const SessionType = {
  Steps: 0,
  Sandbox: 1,
};

/*
* preset : presetObject // for PB tracking
* currentStep : int // index in steps array
* whenSessionStarted : int (timestamp in milliseconds)
* whenSessionFinished : int (timestamp in milliseconds)
* */

export const useSessionStore = defineStore('session', () => {
  const store = reactive(
      {}
  )

  const setPreset = (preset) => {
    store.preset = preset
    store.currentStep = 0
    store.whenSessionStarted = 0
    store.whenSessionFinished = 0
  }

  const startSession = () => {
    store.currentStep = 0
    store.whenSessionStarted = new Date()
    store.whenSessionFinished = 0
  }

  const finishSession = () => {
    store.whenSessionFinished = new Date()
  }

  const currentWordLength = computed(() => {
    const gameOver = !store.preset || store.currentStep >= store.preset.steps.length
    return gameOver ? 0 : store.preset.steps[store.currentStep]
  })

  const isLastGame = () => {
    return store.currentStep === store.preset.steps.length - 1
  }

  const currentProgressPercent = computed(() => {
    if (!store.preset) {
      return 0
    }
    return Math.round(store.currentStep / store.preset.steps.length  * 100)
  })

  const getNextGame = () => {
    ++store.currentStep
  }

  return {store, currentProgressPercent, currentWordLength,
    setPreset, startSession, getNextGame, finishSession, isLastGame}
});
