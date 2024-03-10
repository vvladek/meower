
export class LogsController {

    #logsContainer = document.querySelector(".logs__container")

    constructor (list) {
        this.list = list
        this.#renderLogsList()
    }

    setLogsList (newList) {
        this.list = [ ...newList ]
        this.#renderLogsList()
    }

    addLog (action, state) {
        if (action === "start") action = state.isPaused ? "paused" : "started"
        this.list.push({
            text: `${state.getRoundType()} round ${state.round} ${action}`,
            time: Date()
        })
        this.#renderLogsList()
    }
    
    #renderLogsList () {
        this.#logsContainer.textContent = ""
        this.#logsContainer.replaceChildren()
        this.list.forEach((elem) => {
            this.#createLogElement(elem)
        })
    }

    #createLogElement (info) {
        const logElement = document.createElement("div")
        const logText = document.createElement("p")
        const logTime = document.createElement("p")
        logElement.classList.add("log")
        logText.textContent = info.text
        logTime.textContent = this.#getLogTime(info.time)
        if (info.text.startsWith("Break")) {
            logText.style.color = "var(--break-color)"
            logTime.style.color = "var(--break-color)"
        }
        logElement.append(logText)
        logElement.append(logTime)
        this.#logsContainer.append(logElement)
    }

    #getLogTime (dateStamp) {
        const date = new Date(dateStamp)
        const hours = this.#normalizeValue(date.getHours())
        const minutes = this.#normalizeValue(date.getMinutes())
        const seconds = this.#normalizeValue(date.getSeconds())
        return `${hours}:${minutes}:${seconds}`
    }

    #normalizeValue (value) {
        return `${value < 10 ? "0" : ""}${value}`
    }
}