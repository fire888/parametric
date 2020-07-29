const PIXI = window.PIXI = require('pixi.js-legacy')

module.exports = () => {
    const app = new PIXI.Application({
        width: 800, 
        height: 800, 
        backgroundColor: 0x000000, 
        resolution: window.devicePixelRatio || 1,
        //resizeTo: document.querySelector("#canvas-app"), 
        antialias: true,
        preserveDrawingBuffer: true,
    })
    document.body.appendChild(app.view);
    return app
}
