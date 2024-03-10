import { AppState } from "./AppState.js"
import { initialState, initialLogsList } from "./initialValues.js"
import { DOMController } from "./DOMController.js"
import { LogsController } from "./LogsController.js"
import { InputsController } from "./InputsController.js"


const state = new AppState(initialState)
const domController = new DOMController(state)
const logsController = new LogsController(initialLogsList)
const inputsController = new InputsController(state.intervals)


appWorker.addEventListener('message', () => {
    if (!state.isPaused) {
        const newRemainingTime = state.getNewRemainigTime()
        domController.setNewTime(newRemainingTime)
        if (newRemainingTime < 100) {
            logsController.addLog("finished", state)
            state.setNextRound()
            domController.setNextRound(state)
            if (!state.isPaused) logsController.addLog("start", state)
        }
    }
}, false)


document.addEventListener("click", (event) => {
    switch (event.target.classList.value) {
        case "start__button":
            state.toggleStartAndPause()
            logsController.addLog("start", state)
            break
        case "finish__button":
            logsController.addLog("finished", state)
            state.setNextRound()
            domController.setNextRound(state)
            if (!state.isPaused) logsController.addLog("start", state)
            break
        case "add__round__button":
            inputsController.addInputRound()
            break
        case "del__round__button":
            inputsController.deleteLastInputRound()
            break
        case "set__new__list__button":
            state.setState({ intervals: inputsController.newList, round: 1, pointer: 0, isPaused: true })
            inputsController.refreshInputsList()
            domController.setNextRound(state)
            logsController.setLogsList([])
            break
    }   
    domController.refreshStartButtonTextContent(state.isPaused)
})


document.addEventListener("input", (event) => {
    inputsController.changeValueInNewInputsList(event.target.name, event.target.value)
})


window.addEventListener("pagehide", () => {
    localStorage.setItem("MEOWER", JSON.stringify({
        storageTime: Date.now(),
        storageState: {
            intervals: state.intervals,
            round: state.round,
            pointer: state.pointer,
            remainingTime: state.gg(),
            isPaused: true
        },
        storageLogsList: logsController.list
    }))
})