const { createApp } = require('./PixiSymbols/pixiPatterns') // NOT DELETE
// const { createApp } = require('./ThreeShaders/threeShaders') // NOT DELETE

const app = createApp()
window.saveFile 
    ? app.startWriteFramesAndUpdate() 
    : app.startOnlyUpdate()

