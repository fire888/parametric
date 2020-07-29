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
    const data = []
    const spd = PI / 70
    let dist = 0

    for (let i = 0; i < arr.length; i++) {
        data.push({
            h: ran() + .5,
            w: (ran() * 1.5 + .4) * (ran() < .5 ? 1 : -1),
        })
    }

    return function () {
        dist += spd

        for (let i = 0; i < arr.length; i ++) {
            const d = PI / arr.length * i + dist

            const s = arr[i]

            s.y = -abs(sin(d % PI)) * data[i].h * 450
            s.x = abs(sin((d *.5) % hPI)) * data[i].w * 200
            s.scale.y = cos(d * 4) * s.scale.x
            s.alpha = arr[i].y / (-700) * 10
        }

        return abs(data[0].d % PI2) < spd
    }
}




// INFINITIE MOVIE ////////////////////////////////////

exports.infinitieMovie = function (arr) {    
    let dist = 0
    const spd = PI2 / 80


    return function () {
        dist += spd 

        for (let i = 0; i < arr.length; i ++) {
            const val = PI2 / arr.length * i + dist

            const s = arr[i]

            s.y = sin(val) * cos(dist * 0.2) * 300 
            s.x = sin(val * 4) * cos(dist * 0.4) * 350
            s.scale.y = cos(val * 2) * 2 + .2 
            s.scale.x = cos(val * 4) * 2 + .2 
        }

        return abs(dist * 0.4 % PI2) < spd * 0.4
    }    
}




// CIRCLE MOVIE /////////////////////////////////////

exports.circleMovie = function (arr) {    
    const data = [],
    spd = PI2 / 100
    let dist = 0

    for (let i = 0; i < arr.length; i++) {
        data.push(Math.random() * PI)
    }

    return function () { 
        dist += spd

        for (let i = 0; i < arr.length; i ++) {
            const vec = dist + PI2 / arr.length * i
            
            data[i] += spd

            const normOffset = sin(data[i] % hPI)         
            const r = 350 * normOffset

            const s = arr[i]
            s.y = sin(vec) * r
            s.x = cos(vec) * r
            s.scale.set(normOffset)
        }

        return dist % hPI < spd
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

