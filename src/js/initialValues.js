


let initialState = {
    intervals: [ 3_000_000, 600_000, 3_000_000, 600_000, 3_000_000, 600_000, 3_000_000, 1_200_000 ],
    round: 1,
    pointer: 0,
    isPaused: true
}

let initialLogsList = []



const data = JSON.parse(localStorage.getItem("MEOWER"))

if (data && Date.now() - data.storageTime < 86_400_000) {
    initialState = { ...data.storageState }
    initialLogsList = [ ...data.storageLogsList ]
}



export { initialState, initialLogsList }