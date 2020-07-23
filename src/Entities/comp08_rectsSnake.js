
const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { movieScaleSnake } = require('../Components/movies')
  
const D = 400
const NUM = 10

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const arr = []

    const l = D * 2 / NUM 
    const xL = (NUM * 2) + 1, yL = NUM + 1

    for (let i = 0; i < yL; i ++) {
        for (let j = 0; j < xL; j ++) {
            const offset = (j % 2) * (l / 2)
            let sp = forms.createRectFilled(20, 20)
            sp.x = (xL-j) * (l / 2) - D
            sp.y = i * l - D  + offset 
            container.addChild(sp)
            arr.push(sp)
        }
    }

    const update = movieScaleSnake(arr)


    return {
        container,
        update,
    }
}