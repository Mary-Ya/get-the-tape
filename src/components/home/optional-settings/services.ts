const divideArray = (e: Array<number | null>, divider = 100) => {
    return e.map(i => i ? i / divider : null)
}

export {
    divideArray

}