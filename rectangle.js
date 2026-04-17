const rectangle = document.querySelector('.selection-rectangle')

let isRectangleDrown = false
let startX = 0
let startY = 0

const rectangleStartDrown = (event) => {
    isRectangleDrown = true

    startX = event.clientX
    startY = event.clientY

    rectangle.style.left = startX + 'px'
    rectangle.style.top = startY + 'px'

    rectangle.style.width = '0px'
    rectangle.style.height = '0px'

    rectangle.style.display = 'block'
}

const rectangleDrowning = () => {
    if (!isRectangleDrown) return

    let x = Math.min(event.clientX, startX)
    let y = Math.min(event.clientY, startY)

    let w = Math.abs(event.clientX - startX)
    let h = Math.abs(event.clientY - startY)

    rectangle.style.left = x + 'px'
    rectangle.style.top = y + 'px'
    rectangle.style.width = w + 'px'
    rectangle.style.height = h + 'px'

    const rectLeft = x
    const rectTop = y
    const rectRight = x + w
    const rectBottom = y + h

    const chars = document.querySelectorAll('.char')

    chars.forEach((ch) => {
        const charLeft = ch.offsetLeft + output.offsetLeft
        const charTop = ch.offsetTop + output.offsetTop
        const charRight = charLeft + ch.offsetWidth
        const charBottom = charTop + ch.offsetHeight

        const inside =
            charLeft < rectRight &&
            charRight > rectLeft &&
            charTop < rectBottom &&
            charBottom > rectTop

        if (inside) {
            ch.classList.add('selected')
        }
    })
}
const rectangleStopDrown = () => {
    isRectangleDrown = false
    rectangle.style.display = 'none'
}

output.addEventListener('mousedown', rectangleStartDrown)
output.addEventListener('mousemove', rectangleDrowning)
output.addEventListener('mouseup', rectangleStopDrown)
