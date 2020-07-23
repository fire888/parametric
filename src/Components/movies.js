const 
PI = Math.PI, 
PI2 = Math.PI * 2,
hPI = PI / 2,
sin = Math.sin,
cos = Math.cos,
tan = Math.tan,
ran = Math.random
floor = Math.floor
abs = Math.abs

const D = 400



// FOUNTAIN MOVIE ////////////////////////////////////

exports.movieFountain = arr => {
    const arrSprites = arr
    const data = []

    for (let i = 0; i < arrSprites.length; i++) {
        data.push([
            PI / arr.length * i,                                        // 0 dist to save 
            PI / 70,                                                    // 1 speed 
            Math.random() + .5,                                         // 2 heightY
            (Math.random() * 1.5 + .4) * (Math.random() < .5 ? 1 : -1), // 3 widthX
        ])
        //data[i][0] += data[i][1] * 300000 
    }

    return function () {
        for (let i = 0; i < arrSprites.length; i ++) {
            data[i][0] += (data[i][1])

            const s = arrSprites[i]

            s.y = -Math.abs(Math.sin((data[i][0]) % PI)) * 450 * data[i][2]
            s.x = Math.abs(Math.sin((data[i][0] *.5) % hPI)) * 200 * data[i][3]
            s.scale.y = Math.cos(data[i][0] * 4) * s.scale.x
            s.alpha = ((arrSprites[i].y / (-700) / 1)) * 10
        }

        return abs(data[0][0] % PI2) < data[0][1]
    }
}




// INFINITIE MOVIE ////////////////////////////////////


exports.infinitieMovie = function (arr) {
    const arrSprites = arr
    
    const data = []
    let dist = 0
    const spd = PI2 / 80

    for (let i = 0; i < arrSprites.length; i++) {
        data.push([
            PI2 / arrSprites.length * i,                           // 0 dist to save 
            //(Math.random() + .5) * 0.02,
            PI2 / 80,                                // 1 speed 
            Math.random() + .5,                                         // 2 heightY
            (Math.random() * 1.5 + .4) * (Math.random() < .5 ? 1 : -1), // 3 widthX
        ])
    }

    return function () {
        dist += spd 

        for (let i = 0; i < arrSprites.length; i ++) {
            data[i][0] += spd

            const f = data[i][0] 

            const s = arrSprites[i]
            s.y = Math.sin(f) * 300 * Math.cos(dist * 0.2)
            s.x = Math.sin(f * 4) * 350 * Math.cos(dist * 0.4)
            s.scale.y = Math.cos(f * 2) * 2 + .2 
            s.scale.x = Math.cos(f * 4) * 2 + .2 
        }

        return abs(dist * 0.4 % PI2) < spd * 0.4
    }    
}




// CIRCLE MOVIE /////////////////////////////////////


exports.circleMovie = function (arr) {
    const arrSprites = arr
    
    const data = [],
    spdVec = PI2 / 100,
    spdOffset = PI / 100

    for (let i = 0; i < arrSprites.length; i++) {
        data.push({
            vector: PI2 / arrSprites.length * i, 
            offset: Math.random() * PI,      
        })
    }

    return function () { 
        for (let i = 0; i < arrSprites.length; i ++) {

            data[i].vector += spdVec
            const vec = data[i].vector
            
            data[i].offset += spdOffset

            const normOffset = Math.sin(data[i].offset % hPI)         
            const r = 350 * normOffset

            const s = arrSprites[i]
            s.y = Math.sin(vec) * r
            s.x = Math.cos(vec) * r
            s.scale.set(normOffset)
        }

        return data[0][2] % hPI < PI / 100
    }   
}




//////////////////////////////////////////////////////


exports.movieSp = arr => {   
    let r = 0
    const speedR = 0.03
    
    
    const data = []
    for (let i = 0; i < arr.length; i++) {
        data.push([
            PI2 * 4 / arr.length * i,      // 0 dist to save 
            PI2 / 300,                     // 1 speed                    
        ])
    }

    return () => {
        r += speedR
        const d = Math.min(abs(sin(r)), .5)*2 * (D - 15)

        for (let i = 0; i < arr.length; i ++) {
            data[i][0] -= data[i][1]

            const v = data[i][0] 
            const s = arr[i]

            const dist = (d - 15) * sin((v * .25) % PI2)
            s.x = sin(v % PI2) * dist
            s.y = cos(v % PI2) * dist
            s.rotation = data[i][0]
            s.scale.set(sin(s.rotation))
        }  
        
        return abs(data[0][0] % PI2) < data[0][1]
    }
}



// SPIRAL MOVIE ////////////////////////////////////

exports.movieSp2 = arr => {    
    const data = []

    for (let i = 0; i < arr.length; i++) {
        data.push([
            -PI2 * 3 / arr.length * i,      // 0 dist to save 
            PI2 / 50,                     // 1 speed                    
        ])
    }

    return () => {

        for (let i = 0; i < arr.length; i ++) {
            data[i][0] -= data[i][1]

            const v = data[i][0] 
            const s = arr[i]

            const normDist = v * .25 % PI2 
            s.x = sin(v % PI2) * normDist * (D / 3)
            s.y = cos(v % PI2) * normDist * (D / 3)
            s.rotation = -data[i][0]
            s.scale.set(normDist * 0.3)
        }  
        
        return abs((data[0][0] * 0.25) % PI2) < data[0][1] * 0.25
    } 
}




// SCALE MATR ///////////////////////////////////////////////

exports.movieScaleMatr = function (arr) {
    const data = []
    for (let i = 0; i < arr.length; i ++) {
        data.push({
            currDist: (PI + hPI) / arr.length * i,
            speed: (PI + hPI) / 100,
        })
    }


    return () => {
        for (let i = 0; i < arr.length; i ++) {
            const sp = arr[i]

            data[i].currDist -= data[i].speed

            sp.scale.set(sin(data[i]['currDist']))
            sp.rotation = data[i]['currDist'] % (PI2)
        }
        
        return Math.abs(data[0].currDist % (PI2)) < data[0].speed
    } 
}



// SCALE SNAKE ///////////////////////////////////////////////

exports.movieScaleSnake = function (arr) {
    const data = []
    for (let i = 0; i < arr.length; i ++) {
        data.push({
            currDist: (PI2) / arr.length * i,
            speed: (PI2) / 200,
        })
    }


    return () => {
        for (let i = 0; i < arr.length; i ++) {
            const sp = arr[i]

            data[i].currDist += data[i].speed

            let v = (1.-(data[i].currDist*(PI/10)) % 1) -.7
            sp.scale.set(v > 0 ? v * 10 : 0)
        }
        
        return Math.abs(data[0].currDist % PI2) < data[0].speed
    } 
}



// SCALE TONNEL ///////////////////////////////////////////////

exports.movieTonnel = function (arr) {
    const data = []
    for (let i = 0; i < arr.length; i ++) {
        data.push({
            currDist: (PI + hPI) / arr.length * i,
            speed: (PI2) / 200,
        })
    }


    return () => {
        for (let i = 0; i < arr.length; i ++) {
            const sp = arr[i]

            data[i].currDist += data[i].speed

            let v = data[i].currDist % PI2

            sp.scale.set(v)
            sp.rotation = v
        }
        
        return Math.abs(data[0].currDist % PI2) < data[0].speed
    } 
}






