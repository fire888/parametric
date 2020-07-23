const PIXI = window.PIXI = require('pixi.js-legacy')

const 
PI = Math.PI, 
PI2 = Math.PI * 2,
hPI = PI / 2,
sin = Math.sin,
cos = Math.cos,
tan = Math.tan,
ran = Math.random


const D = 400


module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const arrStars = []
    for (let i = 0; i < 30; i++) {
        const spr = createPoint(2)
        spr.x = (ran() -.5) * 2. * D
        spr.y = ran() * (-D)
        arrStars.push(spr)   
        container.addChild(spr)
    }
    const updateStars = moveUp(arrStars)


    const spritesGround = []
    for (let i = 0; i < 30; i ++) {
        const spr = createRect()
        container.addChild(spr)
        spritesGround.push(spr)
    }
    const updateGround = move(spritesGround)


    const arrPact = []
    for (let i = 0; i < 160; i ++) {
        const sp = createPoint(4)
        container.addChild(sp)
        arrPact.push(sp)        
    }
    const updatePract = move2(arrPact)


    const arrCircles = []
    for (let i = 0; i < 30; i ++) {
        const sp = createCircle(100)
        container.addChild(sp)
        arrCircles.push(sp)
    }
    const updateCircles = scaleAction(arrCircles)


    const update = () => {
        updateGround()
        updatePract()
        const isLoop = updateStars()
        updateCircles()

        return isLoop
    }


    return {
        container,
        update,
    }
}




// GRAPHICS /////////////////////////////


const createCircle = r => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0x777777, 1);
    graphics.arc(0, 0, r, Math.PI, 0);
    //graphics.drawCircle(0, 0, r);
    return graphics
}

const createRect = () => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(-600, -1, 1200, 2);
    graphics.endFill();
    return graphics
}

const createPoint = size => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(-size/2, -size/2, size, size);
    graphics.endFill();
    return graphics
}




// MOVE UP STARS /////////////////////////////////////

const moveUp = arr => {    
    const data = []

    for (let i = 0; i < arr.length; i++) {
        data.push([
            (ran()-1),          // 0 dist to save 
            -PI2 / 600,             // 1 speed
        ])
    }

    return () => { 
        for (let i = 0; i < arr.length; i ++) {
            data[i][0] += data[i][1]

            const v = data[i][0] 
            const s = arr[i]
            s.y = (v % 1) * D
        }
        return Math.abs(data[0][0] % PI2) < PI2 / 100
    }    
}




// MOVE DOWN /////////////////////////////////////

const move = arr => {    
    const data = []

    for (let i = 0; i < arr.length; i++) {
        data.push([
            1 / arr.length * i,   // 0 dist to save 
            PI2 / 600,                 // 1 speed
        ])
    }

    return () => { 
        for (let i = 0; i < arr.length; i ++) {
            data[i][0] += data[i][1]

            const v = data[i][0] 
            const s = arr[i]
            s.y = tan(v % 0.8) ** 3 * D
        }
    }    
}




// MOVE FROM CENTER /////////////////////////

const move2 = arr => {
    const data = []

    for (let i = 0; i < arr.length; i ++) {
        data.push([
            ran(),              // pos
            PI2 / 600,                // spd
            ran() * PI + hPI,   // vec

        ])
    }

    return () => {
        for (let i = 0; i < arr.length; i++) {
            const s = arr[i]

            data[i][0] += data[i][1]
            let v = data[i][0] 
            v = tan(v % 0.8) ** 3
            s.alpha = (v - .5) * 3
            s.x = sin(data[i][2]) * v * D
            s.y = cos(data[i][2]) * v * D
        }
    }
}




// SCALE ///////////////////////////////////

const scaleAction = arr => {
    const data = []

    for (let i = 0; i < arr.length; i ++) {
        data.push([
            1 / arr.length * i,   // pos
            PI2 / 600,                // spd
        ])
    }

    return () => {
        for (let i = 0; i < arr.length; i ++) {
            const s = arr[i]

            data[i][0] += data[i][1]
            let v = data[i][0]
            s.scale.set(tan(v % 0.8) ** 3 * 6)
        }
    }
}


