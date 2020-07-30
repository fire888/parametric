/**
 * Created by Vasilii on 30.07.2020.
 */

const
    PI = Math.PI,
    PI2 = Math.PI * 2,
    hPI = PI / 2,
    sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan,
    ran = Math.random,
    floor = Math.floor,
    abs = Math.abs

const D = 400




// FOUNTAIN MOVIE ////////////////////////////////////

exports.banditMovie = (arr, sH) => {
    let dist = 0
    const SPD = .15

    return function (num) {
        dist += SPD * num

        for (let i = 0; i < arr.length; i ++) {
            for(let j = 0; j < arr[i].length; j ++) {
                const s = arr[i][j]
                s.y = ((j + dist) % arr[i].length) * sH
            }
        }

        return false
    }
}
