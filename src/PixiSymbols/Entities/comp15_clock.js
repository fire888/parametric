

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

const counterClock = dist => (spr, i, array) => {
    const d = ((dist * 2) + PI2)
    const pointPhase = (i / (array.length / 2)) * PI 
    let f = (d - pointPhase) % PI
    spr.scale.set( Math.min(((PI - f) / PI), 1))
}


const counterClockAlpha = dist => (spr, i, array) => {
    const d = ((dist * 2) + PI2)
    const pointPhase = (i / (array.length / 2)) * PI 
    let f = (d - pointPhase) % PI
    spr.alpha = Math.min(((PI - f) / PI), 1)

}



const threeClock = dist => (spr, i, array) => {
    const d = ((dist * 2) + PI2)
    const pointPhase = (i / (array.length / 3)) * PI 
    let f = (d + pointPhase) % PI
    spr.scale.set((PI - f) / PI)
}


const threeClockAlpha = dist => (spr, i, array) => {
    const d = ((dist * 2) + PI2)
    const pointPhase = (i / (array.length / 3)) * PI 
    let f = (d + pointPhase) % PI
    spr.alpha = ((PI - f) / PI)
}



const mapSin = speed => dist => (spr, i, array) => {
    const s = sin(i / array.length * PI2 + (dist * speed))
    spr.scale.set(s)
}

const mapItemSign = offset => dist => (spr, i, array) => { 
    const d = dist * 4
    spr.scale.set(sin(d + offset) * 0.5 + 0.5)
}



/** DATA ******************************************************** */

const D = 400

const ROUNDS_CONFIG = [
    { type: 'POINT', N: 150, R: D - 50, S: 5, MAP: counterClock, },
    //{ type: 'LINE', N: 150, R: D - 50, S: 5, MAP: counterClockAlpha, },
    { type: 'POINT', N: 150, R: D - 60, S: 5, MAP: counterClock, },
    { type: 'POINT', N: 140, R: D - 120, S: 5, MAP: threeClock, },
    //{ type: 'LINE', N: 140, R: D - 135, S: 5, MAP: threeClockAlpha, },
    { type: 'POINT', N: 140, R: D - 140, S: 5, MAP: threeClock, },
    { type: 'POINT', N: 3, R: D - 180, S: 5, MAP: mapSin(-1), },
    { type: 'POINT', N: 130, R: D - 205, S: 5, MAP: mapSin(-1), },
    { type: 'POINT', N: 120, R: D - 240, S: 5, MAP: mapSin(1), },
    { type: 'POINT', N: 120, R: D - 250, S: 5, MAP: mapSin(1), },
    { type: 'POINT', N: 120, R: D - 260, S: 5, MAP: mapSin(1), },
    { type: 'POINT', N: 120, R: D - 270, S: 5, MAP: mapSin(1), },
    { type: 'POINT', N: 35, R: D - 285, S: 5, MAP: mapItemSign(2), },
    { type: 'POINT', N: 35, R: D - 300, S: 5, MAP: mapItemSign(1.7), },
    { type: 'POINT', N: 35, R: D - 315, S: 5, MAP: mapItemSign(1.4), },
    { type: 'POINT', N: 35, R: D - 330, S: 5, MAP: mapItemSign(1.1), },
    { type: 'POINT', N: 35, R: D - 345, S: 5, MAP: mapItemSign(0.8), },
    { type: 'POINT', N: 35, R: D - 360, S: 5, MAP: mapItemSign(0.5), },
    { type: 'POINT', N: 35, R: D - 375, S: 5, MAP: mapItemSign(0.2), },
]


const DRAW = {
    'LINE': (data, i) => {
        const { R, N } = data
        const R_MIN = R - 40

        const line = new PIXI.Graphics()
        line.lineStyle(1, 0xffffff)
            .moveTo(sin(PI2 / N * i) * R, cos(PI2 / N * i) * R)
            .lineTo(sin(PI2 / N * i) * R_MIN, cos(PI2 / N * i) * R_MIN)
            .closePath()
        return line
    },
    'POINT': (data, i) => {
        const { S, R, N } = data

        const spr = forms.createCircleFilled(S)
        spr.x = sin(PI2 / N * i) * R
        spr.y = cos(PI2 / N * i) * R
        return spr
    } 
}



/** CREATE **************************************************** */

const createCircleOfPoints = data => {
    const { S, R, N, type } = data

    const container = new PIXI.Container()
    for (let i = 0; i < N; i ++) {
        const spr = DRAW[type](data, i)
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
        dist += PI2 / 200
        dist = dist % PI2
        //console.log(dist)

        rounds.forEach((round, i) => round.forEach(ROUNDS_CONFIG[i].MAP(dist)))
        center.scale.set(sin(dist * 4) * 0.5 + 0.5)
    }

    return {
        container,
        update,
    }
}



