const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { movieFountain } = require('../Components/movies')

const NUM = 100

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = 770
    container.x = 400 

    const sprites = []

    for (let i = 0; i < NUM; i ++) {
        const spr = forms.createStar()
        spr.x = (Math.random() -.5) * 750
        spr.scale.set(Math.random() * 2. + 0.4)
        container.addChild(spr)
        sprites.push(spr)
    }

    const update = movieFountain(sprites)

    return {
        container,
        update,
    }
}