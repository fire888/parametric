// GENERATED VORINOI
// https://codepen.io/strangerintheq/pen/LYpygNB


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

    for (let i = 0; i < NUM; i ++) {
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

let max = 4000, 
    start = 50, 
    add = 5,
    mode = 'draw';

let s = Math.min(innerWidth, innerHeight)*0.9 | 0
let voronoi = d3.voronoi().extent([[0, 0], [s, s]]);
let diagram, pts = [];

d3.select('canvas')
    .attr('width', s)
    .attr('height', s)
    .call(d3.drag()
      .on("start", randomize)
      .on("drag", randomize));

let ctx = canvas.getContext('2d');
ctx.strokeStyle = `white`;
ctx.fillStyle = `y`;
ctx.lineWidth = 2.3;

for (let i=0; i<5; i++)
    addSomePoints(start, s/2 + (i?Math.cos(i*Math.PI/2)*s/4:0), 
                         s/2 + (i?Math.sin(i*Math.PI/2)*s/4:0))

requestAnimationFrame(draw);

function draw(t) {
    ctx.clearRect(-1e5, -1e5, 2e5, 2e5);
    // pts = pts.filter(p => {
    //     let dx = p[0]-s/2
    //     let dy = p[1]-s/2
    //     let d = Math.sqrt(dx*dx + dy*dy)
    //     return d > 20
    // })
    diagram = voronoi(pts)
    let polygonsData = diagram.polygons();
    drawPolygons(polygonsData);
    lloydRelaxation(0.3, polygonsData);
    ctx.strokeRect(1.5, 1.5, s-3, s-3);
    ctx.fillText(pts.length, 4, 12);
    requestAnimationFrame(draw);
}

function randomize() {
    if (pts.length >= max) {
        pts = [];
        addSomePoints(start, s/2, s/2);
    } else {
        let e = d3.event;
        let r = canvas.getBoundingClientRect();
    
        if (mode === 'draw')
            addSomePoints(add, e.x - r.x, e.y - r.y)
        else
            removePoint(e.x - r.x, e.y - r.y)
    }
}

function removePoint(x,y){
    let p = diagram.find(x,y);
    pts.splice(p.index,1)
}

function addSomePoints(n,x,y){
    if (Math.abs(x-s/2)<s/2 && Math.abs(y-s/2)<s/2)
        pts = pts.concat([...Array(n)].map(() => 
            [Math.random() + x, Math.random() + y]));
}

function drawPolygons(polygonsData){
    polygonsData.forEach(polygon => {
        ctx.beginPath();
        ctx.moveTo(...polygon[0]);
        polygon.forEach(s => ctx.lineTo(...s))
        ctx.closePath();
        ctx.stroke();
    });
}

function lloydRelaxation(k, polygons){
    pts.forEach((p, i) => {
        let centroid = getCentroid(polygons[i]);
        p[0] += (centroid[0] - p[0])*k;
        p[1] += (centroid[1] - p[1])*k;
    }); 
}

function getCentroid(poly) {
     return poly.reduce((a, i) => {
         a[0] += i[0];
         a[1] += i[1];
         return a;
     }, [0, 0]).map(n => n/poly.length);
}

function uiClick(newMode){
    mode = newMode;
    let x = 135 + (newMode === 'erase' ? 30:0);
    selected.setAttribute('transform',`translate(${x},20)`);
}

*/

