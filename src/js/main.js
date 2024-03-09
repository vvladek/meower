import { DOMController } from "./DOMController.js"
import { AppState } from "./AppState.js"
import { LogsController } from "./LogsController.js"
import { InputsController } from "./InputsController.js"


const defaultIntervalsList = [50, 10, 50, 10, 50, 10, 50, 20].map(interval => interval * 60000)


const state = new AppState({ intervals: defaultIntervalsList, round: 1, pointer: 0, isPaused: true })
const domController = new DOMController(state)
const logsController = new LogsController()
const inputsController = new InputsController(state.intervals)


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("start__button")) {
        state.toggleStartAndPause()
        logsController.addLog("start", state)
    }
    else if (event.target.classList.contains("finish__button")) {
        logsController.addLog("finished", state)
        state.setNextRound()
        domController.setNextRound(state)
        if (!state.isPaused) logsController.addLog("start", state)
    }
    else if (event.target.classList.contains("add__round__button")) {
        inputsController.addInputRound()
    }
    else if (event.target.classList.contains("del__round__button")) {
        inputsController.deleteLastInputRound()
    }
    else if (event.target.classList.contains("set__new__list__button")) {
        state.setState({ intervals: inputsController.newList, round: 1, pointer: 0, isPaused: true })
        inputsController.refreshInputsList()
        domController.setNextRound(state)
        logsController.setLogsList([])
    }
    domController.refreshStartButtonTextContent(state.isPaused)
})


document.addEventListener("input", (event) => {
    inputsController.changeValueInNewInputsList(event.target.name, event.target.value)
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