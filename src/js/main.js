import { AppState } from "./AppState.js"
import { initialState, initialLogsList } from "./initialValues.js"
import { DOMController } from "./DOMController.js"
import { LogsController } from "./LogsController.js"
import { InputsController } from "./InputsController.js"


const appWorker = new Worker("./js/appWorker.js")
const state = new AppState(initialState)
const domController = new DOMController(state)
const logsController = new LogsController(initialLogsList)
const inputsController = new InputsController(state.intervals)


function finishRound () {
    logsController.addLog("finished", state)
    state.setNextRound()
    domController.setNextRound(state)
    appWorker.postMessage("stop")
    if (!state.isPaused) {
        appWorker.postMessage(`start-${state.remainingTime}`)
        logsController.addLog("started", state)
    }
}


appWorker.addEventListener('message', (event) => {
    const newRemainingTime = event.data
    state.setRemainigTime(newRemainingTime)
    domController.setNewTime(newRemainingTime)
    if (newRemainingTime < 100) finishRound()
}, false)


document.addEventListener("click", (event) => {
    switch (event.target.textContent) {
        case "START": {
            appWorker.postMessage(`start-${state.remainingTime}`)
            state.setIsPaused(false)
            logsController.addLog("started", state)
            break
        }
        case "PAUSE": {
            appWorker.postMessage("stop")
            state.setIsPaused(true)
            logsController.addLog("paused", state)
            break
        }
        case "FINISH": {
            finishRound()
            break
        }
        case "ADD": {
            inputsController.addInputRound()
            break
        }
        case "DEL": {
            inputsController.deleteLastInputRound()
            break
        }
        case "SET": {
            appWorker.postMessage("stop")
            state.setState({ intervals: inputsController.newList, round: 1, pointer: 0 })
            inputsController.refreshInputsList()
            domController.setNextRound(state)
            logsController.setLogsList([])
            break
        }
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
            remainingTime: state.remainingTime
        },
        storageLogsList: logsController.list
    }))
})