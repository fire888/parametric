const fs = require('fs');
const PATH = './dist/'

let indexFrame = 0


function extractRegion(renderer, x, y, width, height){
    var sourceCanvas = renderer.extract.canvas();
    var sourceContext = sourceCanvas.getContext('2d');
    var extractCanvas = document.createElement('canvas');
    var extractContext = extractCanvas.getContext('2d');
    var imageData = sourceContext.getImageData(x, y, width, height);
    
    extractCanvas.width = width;
    extractCanvas.height = height;
    extractContext.putImageData(imageData, 0, 0);
    return extractCanvas.toDataURL();
}


const getNum = ind => {
    if (ind < 10 ) return '000' + ind
    if (ind < 100 ) return '00' + ind
    if (ind < 1000 ) return '0' + ind
    return '' + ind
}



module.exports = function saveFile(renderer) {
    return new Promise(resolve => {
        setTimeout(() => {
            const url = extractRegion(renderer, 0, 0, 800, 800)
            const base64Data = url.replace(/^data:image\/png;base64,/, "");

            fs.writeFileSync(
                `${ PATH }frame_${ getNum(indexFrame) }.png`, 
                base64Data, 
                'base64', 
                function (err) {console.log(err);}
            );
            indexFrame ++
            resolve()
        }, 50)
    })
} 

