/**
 * https://www.pinterest.ru/pin/720576009118734096/
 */

 
const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { movieTonnel } = require('../Components/movies')
  
const D = 400
const NUM = 30

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const arr = []

    for (let i = 0; i < NUM; i ++) {
        let sp = forms.createStar(200, 3)
        container.addChild(sp)
        arr.push(sp)
    }

    const update = movieTonnel(arr)


    return {
        container,
        update,
    }
}