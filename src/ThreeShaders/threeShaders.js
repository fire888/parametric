const { createStudio } = require('./Entities/studio')
//const { effectSimple } = require('./Effects/effectSimple')
const { effect_02_voronoi } = require('./Effects/effect_02_voronoi')




exports.createApp = function () {
    const studio = createStudio()

    //const effect = effectSimple()
    const effect = effect_02_voronoi()
    
    studio.addToScene(effect.obj)

    //const plane = new THREE.Mesh(
    //    new THREE.PlaneGeometry(1000, 1000),
    //    effect
    //    //new THREE.MeshBasicMaterial({ color: 0xFFff00 })
    //)
    //plane.rotation.x = Math.PI
    //plane.position.z = 600

    return {
        startOnlyUpdate () {
            let time = Date.now()
        
            function animate() {
                requestAnimationFrame(animate)
                const currentTime = Date.now()
                const delta = currentTime - time
                const count = Math.floor(delta / 33.3333)
                if (count > 0) {
                    effect.update()
                    studio.drawFrame()
                    time = currentTime
                }
            }
            animate()
        },

        startWriteFramesAndUpdate () {
            function render () {
                window.saveFile(studio.renderer.domElement)
                    .then(() => {
                        studio.drawFrame()
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
    can && (can.style.width = can.style.height = ss)    
}
window.addEventListener('resize', resize) 



