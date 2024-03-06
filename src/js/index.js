// import * as selectors from "./selectors.js"

// selectors.gg.textContent = "sdfg"


// let col = 1

const button = document.querySelector(".finish__button")
const main = document.querySelector("main")

button.addEventListener("click", () => {
    main.classList.toggle("break-background-color")
})