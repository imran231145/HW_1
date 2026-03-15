

const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerText = 'GOOD'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerText = 'try again'
        gmailResult.style.color = 'red'
    }
}

const parent = document.querySelector('.parent_block')
const child = document.querySelector('.child_block')

let posX = 0
let posY = 0
let direction = 'right'
const speed = 2

const move = () => {
    const maxX = parent.clientWidth - child.clientWidth
    const maxY = parent.clientHeight - child.clientHeight

    if (direction === 'right') {
        posX += speed
        if (posX >= maxX) {
            posX = maxX
            direction = 'down'
        }
    }

    else if (direction === 'down') {
        posY += speed
        if (posY >= maxY) {
            posY = maxY
            direction = 'left'
        }
    }

    else if (direction === 'left') {
        posX -= speed
        if (posX <= 0) {
            posX = 0
            direction = 'up'
        }
    }

    else if (direction === 'up') {
        posY -= speed
        if (posY <= 0) {
            posY = 0
            direction = 'right'
        }
    }

    child.style.transform = `translate(${posX}px, ${posY}px)`

    requestAnimationFrame(move)
}

move()

const secondsBlock = document.getElementById('seconds')
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')

let time = 0
let interval = null

startBtn.onclick = () => {
    if (interval != null) return  

    interval = setInterval(() => {
        time++
        secondsBlock.innerText = time
    }, 1000) 
}

stopBtn.onclick = () => {
    clearInterval(interval)
    interval = null
}

resetBtn.onclick = () => {
    clearInterval(interval)
    interval = null
    time = 0
    secondsBlock.innerText = time 
}

const charactersList = document.querySelector(".characters-list")

const request = new XMLHttpRequest()

request.open("GET", "../data/characters.json")
request.send()

request.onload = () => {

    const characters = JSON.parse(request.response)

    characters.forEach(character => {

        const card = document.createElement("div")
        card.classList.add("character-card")

        card.innerHTML = `
            <div class="character-photo">
                <img src="${character.image}" alt="${character.name}">
            </div>
            <h3>${character.name}</h3>
            <p>Возраст: ${character.age}</p>
        `

        charactersList.appendChild(card)

    })

}   