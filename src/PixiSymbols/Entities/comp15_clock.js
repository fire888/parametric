

const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')



/** HELPERS ***************************************************** */

const ran = (val = 100) =>
(Math.random() - 0.5) * val

const ranRange = (min, max) =>
(Math.random() * (max - min)) + min

const PI2 = Math.PI * 2
const PI = Math.PI
const hPI = Math.PI / 2

const sin = Math.sin
const cos = Math.cos



/** MAPPERS  ****************************************************** */

const threeClock = dist => (spr, i, array) => {
    const d = dist + (i / (array.length / 2))
    const modul = PI2 / 10
    spr.scale.set(Math.max(1 - 2 * (d % modul), 0))
}

const counterClock = dist => (spr, i, array) => {
    const pointPhase = i / (array.length / 2)
    let f = (dist - pointPhase) % 1
    f = Math.min(f * 2, 1)

    spr.scale.set(f - 1)
}

const mapSin = speed => dist => (spr, i, array) => {
    const s = sin(i / array.length * PI2 + (dist * speed))
    spr.scale.set(s)
}

const mapItemSign = offset => dist => (spr, i, array) => spr.scale.set(sin(dist * 4  + offset) * 0.5 + 0.5)



/** DATA ******************************************************** */

const D = 400

const ROUNDS_CONFIG = [
    { N: 150, R: D - 100, S: 5, MAP: counterClock, },
    { N: 140, R: D - 135, S: 5, MAP: threeClock, },
    { N: 3, R: D - 170, S: 5, MAP: mapSin(-1), },
    { N: 130, R: D - 205, S: 5, MAP: mapSin(-1), },
    { N: 120, R: D - 240, S: 5, MAP: mapSin(1), },
    { N: 120, R: D - 250, S: 5, MAP: mapSin(1), },
    { N: 120, R: D - 260, S: 5, MAP: mapSin(1), },
    { N: 120, R: D - 270, S: 5, MAP: mapSin(1), },
    { N: 35, R: D - 285, S: 5, MAP: mapItemSign(2), },
    { N: 35, R: D - 300, S: 5, MAP: mapItemSign(1.7), },
    { N: 35, R: D - 315, S: 5, MAP: mapItemSign(1.4), },
    { N: 35, R: D - 330, S: 5, MAP: mapItemSign(1.1), },
    { N: 35, R: D - 345, S: 5, MAP: mapItemSign(0.8), },
    { N: 35, R: D - 360, S: 5, MAP: mapItemSign(0.5), },
    { N: 35, R: D - 375, S: 5, MAP: mapItemSign(0.2), },
    //{ N: 35, R: D - 375, S: 5, MAP: mapItemSign(0), },
]



/** CREATE **************************************************** */

const createCircleOfPoints = data => {
    const { S, R, N } = data

    const container = new PIXI.Container()
    for (let i = 0; i < N; i ++) {
        const spr = forms.createCircleFilled(S)
        spr.x = sin(PI2 / N * i) * R
        spr.y = cos(PI2 / N * i) * R
        container.addChild(spr)
    }
    return container
}


module.exports = function () {

    /** INIT */
    const container = new PIXI.Container()
    container.y = D
    container.x = D


    const rounds = []
    for (let i = 0; i < ROUNDS_CONFIG.length; i++) {
        const contRounds = createCircleOfPoints(ROUNDS_CONFIG[i])
        container.addChild(contRounds)
        rounds.push(contRounds.children)
    }

    const center = forms.createCircleFilled(15)
    container.addChild(center)


    /** UPDATE */
    let dist = 0

    const update = () => {
        dist += PI2 * 0.005

        rounds.forEach((round, i) => round.forEach(ROUNDS_CONFIG[i].MAP(dist)))
        center.scale.set(sin(dist * 4) * 0.5 + 0.5)
    }

    return {
        container,
        update,
    }
}



