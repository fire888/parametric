
 
const PIXI = window.PIXI = require('pixi.js-legacy')
const forms = require('./figures')
const { movieTonnel } = require('../Components/movies')

/** ***************************************************** */

const ran = (val = 100) => 
    (Math.random() - 0.5) * val  

const ranRange = (min, max) => 
    (Math.random() * (max - min)) + min

/** ****************************************************** */    

const D = 400
const NUM = 400
const config = {
    dotMinRad  : 6,
    dotMaxRad  : 20,
    sphereRad  : 350,
    bigDotRad  : 35,
    mouseSize  : 120,
    massFactor : 0.002,
    defColor   : `rgba(250, 10, 30, 0.9)`,
    smooth     : 0.9,
}

/** ***************************************************** */

let dist = 0

module.exports = function () {    
    const container = new PIXI.Container()
    container.y = D
    container.x = D

    const particles = []

    for (i = 0; i < NUM; i ++) {
        const pr = createPoint()
        container.addChild(pr.spr)
        particles.push(pr)
    }

    let lines = []

    function drawLines (arr) {
        for (let i = 0; i < arr.length; i ++) {
            for (let j = i + 1; j < arr.length; j ++) {
                //if (i === j) continue;
                
                const [a, b] = [particles[i], particles[j]]
                const offsets = { x: b.spr.x - a.spr.x, y: b.spr.y - a.spr.y }
                const dist = Math.sqrt((offsets.x * offsets.x) + (offsets.y * offsets.y))    
                
                if (dist > 70 || a.alpha <= 0 || b.alpha <= 0 ) continue;

                const line = new PIXI.Graphics()
                line.lineStyle(1, 0xffffff)
                    .moveTo(a.spr.x, a.spr.y)
                    .lineTo(b.spr.x, b.spr.y)
                    .closePath()
                line.alpha = Math.min(a.spr.alpha, b.spr.alpha)
                container.addChild(line)
                lines.push(line)
                
            }
        }
    }

    const update = () => {
        dist += Math.PI * 4 / 1200 
        
        const phase = dist % (Math.PI * 4)
        //container.rotation = phase

        for (let i in particles) {
            particles[i].update(phase) 
        }

        lines.map(item => item.destroy())
        lines = []
        drawLines(particles)

        return dist < 0.1 
    }
    
    return {
        container,
        update,
    }
}


function createPoint () {
    let live = ranRange(100, 200),
    vel = { 
        x: ran(D), 
        y: ran(D),
    },
    spr = forms.createCircleFilled(5)
    const x = ran(D * 2)
    const y = ran(D * 2)
    const alpha = ran(Math.PI * 2)
    
    const update = phase => {
        spr.x = x + vel.x * Math.cos(phase * Math.PI)
        spr.y = y + vel.y * Math.sin(phase * Math.PI)

        spr.alpha = Math.sin(phase * Math.PI + alpha)
        spr.scale.set(Math.min(spr.alpha, 1))
    }

    return {
        spr,
        update,
    }
}





/*
(function(){

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    particles = [],
    properties = {
        bgColor             : 'rgba(17, 17, 19, 1)',
        particleColor       : 'rgba(255, 40, 40, 1)',
        particleRadius      : 3,
        particleCount       : 60,
        particleMaxVelocity : 0.5,
        lineLength          : 150,
        particleLife        : 6,
    };

    document.querySelector('body').appendChild(canvas);

    window.onresize = function(){
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;        
    }

    class Particle{
        constructor(){
            this.x = Math.random()*w;
            this.y = Math.random()*h;
            this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
            this.life = Math.random()*properties.particleLife*60;
        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife(){
            if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
            }
            this.life--;
        }
    }

    function reDrawBackground(){
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines(){
        var x1, y1, x2, y2, length, opacity;
        for(var i in particles){
            for(var j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLength){
                    opacity = 1-length/properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function reDrawParticles(){
        for(var i in particles){
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop(){
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
        for(var i = 0 ; i < properties.particleCount ; i++){
            particles.push(new Particle);
        }
        loop();
    }

    init();

}())
*/