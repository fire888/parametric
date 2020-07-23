const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { infinitieMovie } = require('../Components/movies')

const NUM = 100

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = 400
    container.x = 400 

    const sprites = []

    for (let i = 0; i < NUM; i ++) {
        const spr = forms.createStar(15, 4)
        container.addChild(spr)
        sprites.push(spr)
    }

    const update = infinitieMovie(sprites)

    return {
        container,
        update,
    }
}