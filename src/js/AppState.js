
export class AppState {

    constructor (state) {
        this.intervals = state.intervals
        this.round = state.round
        this.pointer = state.pointer
        this.startTime = Date.now()
        this.remainingTime = state.intervals[state.pointer]
        this.isPaused = state.isPaused
    }

    toggleStartAndPause () {
        this.isPaused = !this.isPaused
        if (!this.isPaused) {
            this.startTime = Date.now()
            this.intervals[this.pointer] = this.remainingTime
        } else {
            this.remainingTime = this.getNewRemainigTime()
        }
    }

    setNextRound () {
        this.pointer += 1
        this.round = Math.floor(this.pointer / 2) + 1
        this.startTime = Date.now()
        this.remainingTime = this.intervals[this.pointer]
    }

    getNewRemainigTime () {
        const elapsedTime = Date.now() - this.startTime
        return Math.round((this.remainingTime - elapsedTime) / 1000) * 1000
    }
}