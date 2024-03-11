
export class AppState {

    constructor (state) {
        this.setState(state)
    }

    setState (state) {
        this.intervals = state.intervals
        this.round = state.round
        this.pointer = state.pointer
        this.remainingTime = state.remainingTime ? state.remainingTime : state.intervals[state.pointer]
        this.isPaused = true
    }

    setIsPaused (boolean) {
        this.isPaused = boolean
    }

    setRemainigTime (ms) {
        this.remainingTime = ms
    }

    setNextRound () {
        this.pointer += 1
        this.round = Math.floor(this.pointer / 2) + 1
        this.remainingTime = this.intervals[this.pointer % this.intervals.length]
        this.isPaused = this.pointer % 2 ? false : true
    }

    getRoundType () {
        return this.pointer % 2 ? "Break" : "Work"
    }
}