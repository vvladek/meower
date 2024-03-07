
export class DOMController {

    #timeInHeadTitle = document.querySelector("title")
    #minutesInMainTitle = document.querySelector(".timer__minutes")
    #secondsInMainTitle = document.querySelector(".timer__seconds")
    #roundInMainTitle = document.querySelector(".round__title")
    #main = document.querySelector("main")
    #audio = document.querySelector("audio")

    constructor (state) {
        this.setBackgroundColor(state.pointer)
        this.setTitles(state)
    }

    setTitles (state) {
        this.setNewTime(state.remainingTime)
        this.#roundInMainTitle.textContent = state.round
    }

    setNewTime (ms) {
        const minutes = this.#normalizeValue(Math.floor(ms / 1000 / 60))
        const seconds = this.#normalizeValue(Math.floor(ms / 1000 % 60))
        this.#timeInHeadTitle.textContent = `${minutes}:${seconds}`
        this.#minutesInMainTitle.textContent = minutes
        this.#secondsInMainTitle.textContent = seconds
    }

    setBackgroundColor (pointer) {
        if (pointer % 2) this.#main.classList.add("break-background-color")
        else this.#main.classList.remove("break-background-color")
    }

    setNextRound (state) {
        this.setTitles(state)
        this.setBackgroundColor(state.pointer)
        this.#audio.play()
    }

    #normalizeValue (value) {
        return `${value < 10 ? "0" : ""}${value}`
    }
}