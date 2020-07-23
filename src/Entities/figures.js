

exports.createStar = (r = 15, l = 7) => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(2, 0xFFFFFF)
    graphics.drawStar(0, 0, l, r)
    return graphics
}

exports.createArc = (r = 10) => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0x777777, 1)
    graphics.arc(0, 0, r, Math.PI, 0)
    return graphics
}

exports.createCircle = (r = 10, t = 1) => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(t, 0xffffff, 1)
    graphics.drawCircle(0, 0, r)
    return graphics
}

exports.createCircleFilled = (r = 10) => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF)
    graphics.drawCircle(0, 0, r)
    graphics.endFill()
    return graphics
}

exports.createRect = (w = 80, h = 20) => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0xffffff, 3)
    graphics.drawRect(-w/2, -h/2, w, h);
    return graphics
}

exports.createRectFilled = (w = 80, h = 20) => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(-w/2, -h/2, w, h);
    graphics.endFill();
    return graphics
}

