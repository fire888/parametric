

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

const PI2 = Math.PI * 2
const PI = Math.PI

const sin = Math.sin
const cos = Math.cos

const NUM_P1 = 10
const R = 300

const NUM_P2 = 50
const R2 = R - 35

const NUM_P3 = 3
const R3 = R2 - 35

const NUM_P4 = 40
const R4 = R3 - 35

const NUM_P5 = 40
const R5 = R4 - 35

const NUM_P6 = 40
const R6 = R5 - 10

const NUM_P7 = 40
const R7 = R6 - 10

const NUM_P8 = 40
const R8 = R7 - 10


module.exports = function () {
    const container = new PIXI.Container()
    container.y = D
    container.x = D


    container.addChild(forms.createCircle(R - 15))
    container.addChild(forms.createCircle(R2 - 15))
    container.addChild(forms.createCircle(R3 - 15))
    container.addChild(forms.createCircle(R4 - 15))
    container.addChild(forms.createCircle(R8 - 15))


    const points1 = []
    for (let i = 0; i < NUM_P1; i ++) {
        const spr = forms.createCircleFilled(10)
        container.addChild(spr)
        points1.push(spr)
    }

    const points2 = []
    for (let i = 0; i < NUM_P2; i ++) {
        const spr = forms.createCircleFilled(10)
        spr.x = sin(PI2 / NUM_P2 * i) * R2
        spr.y = cos(PI2 / NUM_P2 * i) * R2
        container.addChild(spr)
        points2.push(spr)
    }

    const points3 = []
    for (let i = 0; i < NUM_P3; i ++) {
        const spr = forms.createCircleFilled(10)
        spr.x = sin(PI2 / NUM_P3 * i) * R3
        spr.y = cos(PI2 / NUM_P3 * i) * R3
        container.addChild(spr)
        points3.push(spr)
    }

    const points4 = []
    for (let i = 0; i < NUM_P4; i ++) {
        const spr = forms.createCircleFilled(10)
        spr.x = sin(PI2 / NUM_P4 * i) * R4
        spr.y = cos(PI2 / NUM_P4 * i) * R4
        container.addChild(spr)
        points4.push(spr)
    }

    const points5 = []
    for (let i = 0; i < NUM_P5; i ++) {
        const spr = forms.createCircleFilled(3)
        spr.x = sin(PI2 / NUM_P5 * i) * R5
        spr.y = cos(PI2 / NUM_P5 * i) * R5
        container.addChild(spr)
        points5.push(spr)
    }

    const points6 = []
    for (let i = 0; i < NUM_P6; i ++) {
        const spr = forms.createCircleFilled(3)
        spr.x = sin(PI2 / NUM_P6 * i) * R6
        spr.y = cos(PI2 / NUM_P6 * i) * R6
        container.addChild(spr)
        points6.push(spr)
    }

    const points7 = []
    for (let i = 0; i < NUM_P7; i ++) {
        const spr = forms.createCircleFilled(3)
        spr.x = sin(PI2 / NUM_P7 * i) * R7
        spr.y = cos(PI2 / NUM_P7 * i) * R7
        container.addChild(spr)
        points7.push(spr)
    }


    const points8 = []
    for (let i = 0; i < NUM_P8; i ++) {
        const spr = forms.createCircleFilled(3)
        spr.x = sin(PI2 / NUM_P8 * i) * R8
        spr.y = cos(PI2 / NUM_P8 * i) * R8
        container.addChild(spr)
        points8.push(spr)
    }




    let dist = 0

    const update = () => {
        dist += 0.04

        const lOffset = dist % (PI2 / NUM_P1)
        points1.forEach((spr, i) => {
            spr.x = sin(PI2 / NUM_P1 * i + lOffset) * R
            spr.y = cos(PI2 / NUM_P1 * i + lOffset) * R
        })

        
        points2.forEach((spr, i) => {
            const d = dist + (i / (NUM_P2 / 2))
            const modul = PI2 / NUM_P1
            spr.alpha = 1 - 2 * (d % modul)
        })

        points4.forEach((spr, i) => {
            //const d = (dist * 2) + (i / (NUM_P4 / 4))
            //const modul = PI2 / NUM_P1
            const s = sin(i / NUM_P4 * PI2 - dist)
            spr.scale.set(s)
        })

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
        /*let offset = cos(phase) * (r * .3) + r
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
        line.alpha = alpha*/
    }

    return {
        line,
        spr,
        update,
    }
}


