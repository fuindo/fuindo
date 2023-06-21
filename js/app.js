$("#info").onclick = () => {
    alert("Nothing here yet.")
}
$("#play").onclick = () => {
    alert(`Hello ${$("#username").value}! There is nothing here yet.`)
}

window.addEventListener("wheel", (event) => {
    event.preventDefault()
}, {passive: false})
window.addEventListener("touchmove", (event) => {
    event.preventDefault()
}, {passive: false})

function $(string) {
    return document.querySelector(string)
}