import { DOMController } from "./DOMController.js"
import { AppState } from "./AppState.js"

const startButton = document.querySelector(".start__button")
const finishButton = document.querySelector(".finish__button")


const arr = [50,10,50,10,50,10,50,20].map(e => e * 60000)
const logs = []

const state = new AppState({ intervals: arr, round: 1, pointer: 0, isPaused: true })
const domController = new DOMController(state)


startButton.addEventListener("click", () => {
    state.toggleStartAndPause()
    startButton.textContent = state.isPaused ? "START" : "PAUSE"
})

finishButton.addEventListener("click", () => {
    state.setNextRound()
    domController.setNextRound(state)
})

setInterval(() => {
    if (!state.isPaused) {
        const newRemainingTime = state.getNewRemainigTime()
        domController.setNewTime(newRemainingTime)
        if (newRemainingTime < 100) {
            state.setNextRound()
            domController.setNextRound(state)
        }
    }
}, 1000)