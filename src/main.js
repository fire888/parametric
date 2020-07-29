// const { createApp } = require('./PixiSymbols/pixiPatterns') // NOT DELETE
const { createApp } = require('./ThreeShaders/threeShaders')

const app = createApp()
window.saveFile 
    ? app.startWriteFramesAndUpdate() 
    : app.startOnlyUpdate()

