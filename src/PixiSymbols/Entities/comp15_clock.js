

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

const NUM_P9 = 16
const R9 = R8 - 30

const NUM_P10 = 16
const R10 = R9 - 18

const NUM_P11 = 16
const R11 = R10 - 18



module.exports = function () {
    const container = new PIXI.Container()
    container.y = D
    container.x = D


    container.addChild(forms.createCircle(R - 15))
    container.addChild(forms.createCircle(R2 - 15))
    container.addChild(forms.createCircle(R3 - 15))
    container.addChild(forms.createCircle(R4 - 15))
    container.addChild(forms.createCircle(R8 - 15))
    container.addChild(forms.createCircle(R11 - 15))
    //container.addChild(forms.createCircle(R11 - 22))
    //container.addChild(forms.createCircle(R11 - 29))
    container.addChild(forms.createCircle(R11 - 36))


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


    const points9 = []
    for (let i = 0; i < NUM_P9; i ++) {
        const spr = forms.createCircleFilled(5)
        spr.x = sin(PI2 / NUM_P9 * i) * R9
        spr.y = cos(PI2 / NUM_P9 * i) * R9
        container.addChild(spr)
        points9.push(spr)
    }


    const points10 = []
    for (let i = 0; i < NUM_P10; i ++) {
        const spr = forms.createCircleFilled(5)
        spr.x = sin(PI2 / NUM_P10 * i) * R10
        spr.y = cos(PI2 / NUM_P10 * i) * R10
        container.addChild(spr)
        points10.push(spr)
    }


    const points11 = []
    for (let i = 0; i < NUM_P11; i ++) {
        const spr = forms.createCircleFilled(5)
        spr.x = sin(PI2 / NUM_P11 * i) * R11
        spr.y = cos(PI2 / NUM_P11 * i) * R11
        container.addChild(spr)
        points11.push(spr)
    }


    const center = forms.createCircleFilled(20)
    container.addChild(center)


    let dist = 0

    const update = () => {
        dist += 0.04
        const phase = dist % PI2


        const lOffset = phase
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
            const s = sin(i / NUM_P4 * PI2 - dist)
            spr.scale.set(s)
        })

        points5.forEach((spr, i) => {
            const s = sin(i / NUM_P5 * PI2 + dist)
            spr.scale.set(s)
        })

        points6.forEach((spr, i) => {
            const s = sin(i / NUM_P6 * PI2 + dist)
            spr.scale.set(s)
        })

        points7.forEach((spr, i) => {
            const s = sin(i / NUM_P7 * PI2 + dist)
            spr.scale.set(s)
        })

        points8.forEach((spr, i) => {
            const s = sin(i / NUM_P8 * PI2 + dist)
            spr.scale.set(s)
        })

        points9.forEach((spr, i) => {
            spr.alpha = (dist * 8 + i) % (NUM_P11 / 2) < 1 ? 0 : 1 
        })

        points10.forEach((spr, i) => {
            spr.alpha = (dist * 8 + i) % (NUM_P11 / 2) < 1 ? 0 : 1 
        })

        points11.forEach((spr, i) => {
            spr.alpha = (dist * 8 + i) % (NUM_P11 / 2) < 1 ? 0 : 1 
        })

        center.alpha = (sin(dist * 5) * 0.5 + 0.5)
    }

    return {
        container,
        update,
    }
}




