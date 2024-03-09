
export class InputsController {

    #form = document.querySelector(".settings form")

    constructor (list) {
        this.list = list
        this.newList = [...list]
        this.#renderInputsList()
    }

    addInputRound () {
        this.#addInputContainer(this.newList.length)
        this.#addInputContainer(this.newList.length)
    }

    deleteLastInputRound () {
        this.newList.splice(-2)
        this.#form.removeChild(this.#form.lastElementChild)
        this.#form.removeChild(this.#form.lastElementChild)
    }

    changeValueInNewInputsList (index, value) {
        this.newList[index] = Number(value) * 60000
    }

    refreshInputsList () {
        this.list = [ ...this.newList ]
        this.#renderInputsList()
    }

    #addInputContainer (i) {
        this.newList.push(0)
        this.#createInputContainer({
            index: i,
            type: i % 2 ? "Break" : "Work",
            round: Math.floor(i / 2) + 1,
            duration: 0
        })
    }
    
    #renderInputsList () {
        this.#form.textContent = ""
        this.#form.replaceChildren()
        for (let i = 0, length = this.list.length; i < length; i++) {
            const info = {
                index: i,
                type: i % 2 ? "Break" : "Work",
                round: Math.floor(i / 2) + 1,
                duration: this.list[i]
            }
            this.#createInputContainer(info)
        }
    }

    #createInputContainer (info) {
        const inputContainer = document.createElement("div")
        const inputLabel = document.createElement("p")
        const input = document.createElement("input")
        inputContainer.classList.add("input__container")
        inputLabel.textContent = `${info.type} round ${info.round}`
        input.placeholder = info.duration / 60000
        input.name = info.index
        inputContainer.append(inputLabel)
        inputContainer.append(input)
        this.#form.append(inputContainer)
    }
}