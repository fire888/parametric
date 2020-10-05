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
const createComposition10 = require('./Entities/comp10_down') /// one hand bandit
const createComposition11 = require('./Entities/comp11_tweenCircles') 
const createComposition12 = require('./Entities/comp12_particlesMesh') 

exports.createApp = function () {
    const arrConstructors = [
        
        /*createComposition01,
        createComposition02,  
        createComposition03,  
        createComposition04, 
        createComposition05,
        createComposition06, 
        createComposition07,
        createComposition08,
        createComposition09,
        
        //createComposition10,
        createComposition11,*/
        createComposition12,
    ]

    const app = createPIXIApp()
    const views = []
    arrConstructors.forEach(createView => views.push(createView()))
    const checkerIsComplete = initCheckerIsComplete()

    let currentViewNum = arrConstructors.length
    const TIME = 10000
    let slideTimer

    function showView (num) { 
            clearTimeout(slideTimer)
            views[currentViewNum] && app.stage.removeChild(views[currentViewNum].container)
            currentViewNum = num
            app.stage.addChild(views[currentViewNum].container)
    }


    function startChangeView() {
        function changeView () {
                views[currentViewNum] && app.stage.removeChild(views[currentViewNum].container)
                currentViewNum ++
                currentViewNum >= arrConstructors.length && (currentViewNum = 0)
                slideTimer = setTimeout(changeView, TIME)
                app.stage.addChild(views[currentViewNum].container)
        }
        changeView()
    }

    createStartButtons({ views, showView })
    startChangeView()
    resize()


    return {

        startOnlyUpdate () {
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

        startWriteFramesAndUpdate () {
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

    }
} 


function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    const s = Math.min(w, h)

    const ss = s - s * 0.08 + 'px'

    const can = document.querySelector('canvas')
    const buttCont = document.querySelector('.cont-butt')

    can.style.width = can.style.height = buttCont.style.width = ss

    w < h 
        ? can.style.marginTop = '60px'
        : can.style.marginTop = '0' 
    
}
window.addEventListener('resize', resize) 



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