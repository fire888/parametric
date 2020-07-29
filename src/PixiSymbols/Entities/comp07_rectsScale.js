
const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { movieScaleMatr } = require('../Components/movies')
  
const D = 400
const NUM = 10

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const arr = []

    const l = D * 2 / NUM 

    for (let i = 0; i < NUM + 1; i ++) {
        for (let j = 0; j < (NUM * 2)+ 1; j ++) {

            const offset = (j % 2) * (l / 2)
            let sp = forms.createStar(45, 8)
            sp.x = j * (l / 2) - D
            sp.y = i * l - D  + offset
            sp.rotation = Math.PI / 4 
            container.addChild(sp)
            arr.push(sp)
        }
    }

    const update = movieScaleMatr(arr)


    return {
        container,
        update,
    }
}