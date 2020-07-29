
const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { movieSp } = require('../Components/movies')
  
const D = 400
const NUM = 200

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const arrStars = []
    for (let i = 0; i < NUM; i ++) {
        let sp
        if (i % (NUM / 20) < 0.001) {
            sp = forms.createCircleFilled(15)
        } else {
            sp = forms.createStar(25, 7)
        }
        container.addChild(sp)
        arrStars.push(sp)
    }

    const update = movieSp(arrStars)

    return {
        container,
        update,
    }
}

