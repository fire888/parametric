
 
const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')


/** ***************************************************** */

const ran = (val = 100) => 
    (Math.random() - 0.5) * val  

const ranRange = (min, max) => 
    (Math.random() * (max - min)) + min

/** ****************************************************** */    



/** ***************************************************** */

const D = 400 
const NUM = 350
const PI2 = Math.PI * 2
const PI = Math.PI
const sin = Math.sin
const cos = Math.cos

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const spr = forms.createCircleFilled(5)
    container.addChild(spr)

    const particles = []

    for (let i = 0; i < NUM; i ++) {
        const r = ranRange(50, 300)
        const ray = createPoint(r)
        container.addChild(ray.line)
        container.addChild(ray.spr)
        particles.push(ray)
    }


    const step = (PI2 * 4) / NUM
    let dist = 0
    const update = () => {
        dist += 0.02
        container.rotation = -dist
        for (let i = 0; i < particles.length; i++) {
            const offset = i * step
            const phase = (dist + offset) % PI2
            particles[i].update(phase, dist)
        }
    }
    
    return {
        container,
        update,
    }
}


function createPoint (radius) {
    const r = radius
    const spr = forms.createCircleFilled(5)
    const line = new PIXI.Graphics()

    
    const update = (phase, dist) => {
        let offset = cos(phase) * (r * .3) + r
        const center = { 
            x: cos(dist*3) * 100, 
            y: sin(dist*3) * 100
        }

        const alpha = sin(phase* 5) + 0.7

        spr.x = sin(phase) * offset
        spr.y = cos(phase) * offset
        spr.alpha = alpha


        line.clear()
        line.lineStyle(1, 0xffffff)
            .moveTo(spr.x, spr.y)
            .lineTo(center.x , center.y + 180)
            .closePath()
        line.alpha = alpha
    }

    return {
        line,
        spr,
        update,
    }
}



