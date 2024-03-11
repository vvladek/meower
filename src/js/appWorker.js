
let timer, startTime = Date.now(), remainingTime


self.addEventListener("message", (event) => {

    const [action, time] = event.data.split("-")

    switch (action) {
        case "start": {
            clearInterval(timer)
            startTime = Date.now()
            remainingTime = time
            timer = setInterval(() => {
                const elapsedTime = Date.now() - startTime
                const newRemainingTime = Math.round((remainingTime - elapsedTime) / 1000) * 1000
                postMessage(newRemainingTime)
            }, 1000)
            break
        }
        case "stop": {
            clearInterval(timer)
            break
        }
    }
})