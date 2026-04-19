const input = document.querySelector('input')
const button = document.querySelector('.submit')
const output = document.querySelector('.output')

const charSelect = (e) => {
    if (e.ctrlKey) {
        e.target.classList.toggle('selected')
    }
}

let isCharMove = false
let movingChars = []
let startMouseX = 0
let startMouseY = 0
let startPositions = []

const charStartMove = (e) => {
    e.stopPropagation()
    e.target.classList.add('selected')

    movingChars = [...document.querySelectorAll('.selected')]
    startPositions = movingChars.map((char) => {
        const rect = char.getBoundingClientRect()
        let charLeft = rect.left - 32
        let charTop = rect.top - 73
        char.style.left = charLeft + 'px'
        char.style.top = charTop + 'px'

        return {
            char,
            charLeft,
            charTop,
        }
    })

    startMouseX = e.pageX
    startMouseY = e.pageY

    isCharMove = true
}
const charMove = (e) => {
    if (!isCharMove) {
        return
    }

    const charShiftX = e.pageX - startMouseX
    const charShiftY = e.pageY - startMouseY

    startPositions.forEach(({ char, charLeft, charTop }) => {
        char.style.left = charLeft + charShiftX + 'px'
        char.style.top = charTop + charShiftY + 'px'
    })
}

const charStop = () => {
    isCharMove = false
    movingChars = []
    startPositions = []
}
const renderText = () => {
    output.innerHTML = ''
    const text = input.value.split('').filter((el) => el !== ' ')

    text.forEach((char, index) => {
        const span = document.createElement('span')
        span.textContent = char
        span.classList.add('char')
        span.style.left = index * 30 + 'px'
        span.addEventListener('click', charSelect)
        span.addEventListener('mousedown', charStartMove)
        document.addEventListener('mousemove', charMove)
        document.addEventListener('mouseup', charStop)

        output.append(span)
    })
}
button.addEventListener('click', renderText)
