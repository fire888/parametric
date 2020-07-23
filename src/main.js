
const createPIXIApp = require('./Entities/app')

const createComposition01 = require('./Entities/comp01_fountain')
const createComposition02 = require('./Entities/comp02_infinitie')
const createComposition03 = require('./Entities/comp03_circle')
const createComposition04 = require('./Entities/comp04_flyEarth')
const createComposition05 = require('./Entities/comp05_spiralEyes')  
const createComposition06 = require('./Entities/comp06_spiralLines')
const createComposition07 = require('./Entities/comp07_rectsScale')
const createComposition08 = require('./Entities/comp08_rectsSnake') 
const createComposition09 = require('./Entities/comp09_corridorTri')




function createApp () {
    const arrConstructors = [
        createComposition01,
        createComposition02,  
        createComposition03,  
        createComposition04, 
        createComposition05,
        createComposition06, 
        createComposition07,
        createComposition08,
        createComposition09,  
    ]

    const app = createPIXIApp()
    const views = []
    arrConstructors.forEach(createView => views.push(createView()))
    const checkerIsComplete = initCheckerIsComplete()

    let currentViewNum = 8
    const TIME = 10000

    return {
        views,

        showView: num => {
            clearTimeout(slideTimer)
            app.stage.removeChild(views[currentViewNum].container)
            currentViewNum = num
            app.stage.addChild(views[currentViewNum].container)
        },

        startOnlyUpdate: () => {
            let time = Date.now()
        
            function animate() {
                requestAnimationFrame(animate)
                const currentTime = Date.now()
                const delta = currentTime - time
                const count = Math.floor(delta / 33.3333)
                if (count > 0) {
                    const isLoop = views[currentViewNum].update(count)
                    checkerIsComplete(isLoop)
                    time = currentTime
                }
            }
            animate()
        },

        startWriteFramesAndUpdate: () => {
            function render () {
                window.saveFile(app.renderer)
                    .then(() => {
                        const isLoopDone = views[currentViewNum].update()
                        const isNext = checkerIsComplete(isLoopDone)
                        isNext && render()
                    })
            }
            render()
        }, 

        startChangeView() {
            function changeView () {
                    app.stage.removeChild(views[currentViewNum].container)
                    currentViewNum ++
                    currentViewNum > 8 && (currentViewNum = 0)
                    slideTimer = setTimeout(changeView, TIME)
                    app.stage.addChild(views[currentViewNum].container)
            }
            changeView()
        }
    }
} 




function initCheckerIsComplete () {
    const max_loops = 10
    let currentLoop = 0
    let countFrames = 0

    return function (isLoop) {
        countFrames ++

        if (isLoop) {
            currentLoop ++
            console.log(`loop: ${ currentLoop }, frames: ${ countFrames }`)
        }

        return currentLoop < max_loops
    }
}




function createStartButtons ({ views, showView }) {
    const cont = document.createElement('div')
    cont.classList.add('cont-butt')
    
    const butts = []

    for (let i = 0; i < views.length; ++i) {
        const butt = document.createElement('div')
        butts.push(butt)
        butt.addEventListener('click', () => { 
            showView(i)
            butts.forEach(item => item.classList.remove('current'))
            butt.classList.add('current')
        })
        butt.classList.add('butt')
        butt.innerHTML = '&#9656;'
        cont.appendChild(butt)
    }

    butts[0].classList.add('current')
    document.body.appendChild(cont)
}




function resize() {
    const 
    w = window.innerWidth,
    h = window.innerHeight
    s = Math.min(w, h)
    ss = s - s * 0.08 + 'px'

    can = document.querySelector('canvas')
    buttCont = document.querySelector('.cont-butt')

    can.style.width = can.style.height = buttCont.style.width = ss
}
window.addEventListener('resize', resize) 




const app = createApp()
createStartButtons(app)
app.startChangeView()
window.saveFile 
    ? app.startWriteFramesAndUpdate() 
    : app.startOnlyUpdate()


resize()


