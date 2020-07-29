const { createApp } = require('./Containers/pixiPatterns')

const app = createApp()
window.saveFile 
    ? app.startWriteFramesAndUpdate() 
    : app.startOnlyUpdate()

