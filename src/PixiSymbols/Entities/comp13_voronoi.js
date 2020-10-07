// GENERATED VORINOI
// https://codepen.io/strangerintheq/pen/LYpygNB


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

