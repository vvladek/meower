

self.addEventListener("message", (event) => {
    let timer
    switch (event.data) {
        case "start":
            timer = setInterval(() => {
            postMessage(true)
            }, 1000)
            break
        case "stop": 
            clearInterval(timer)
            break
    }
})