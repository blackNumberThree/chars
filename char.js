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
        char.style.position = 'absolute'
        char.style.left = char.offsetLeft + 'px'
        char.style.top = char.offsetTop + 'px'

        return {
            char,
            left: parseFloat(char.style.left) || 0,
            top: parseFloat(char.style.top) || 0,
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

    const dx = e.pageX - startMouseX
    const dy = e.pageY - startMouseY

    startPositions.forEach(({ char, left, top }) => {
        char.style.left = left + dx + 'px'
        char.style.top = top + dy + 'px'
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

        span.addEventListener('click', charSelect)
        span.addEventListener('mousedown', charStartMove)
        span.addEventListener('mousemove', charMove)
        span.addEventListener('mouseup', charStop)

        output.append(span)
    })
}
button.addEventListener('click', renderText)
